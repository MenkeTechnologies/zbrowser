#!/usr/bin/env python3
"""zwire HUD native-messaging host.

Two jobs:
  1. scheme bridge — get/set ~/.zwire/hud-scheme so the compiled color mixer
     follows the in-page 8-scheme picker.
  2. system stats — on {cmd:'sysinfo_start'} (a persistent connectNative port),
     stream CPU/mem/swap/disk/net/io/load/uptime/battery/temp/host/ip every 2s
     to the statusbar (zwire is a desktop app, so we read the real machine).
"""
import sys, os, struct, json, time, socket, base64, select, signal


def read_msg():
    raw = sys.stdin.buffer.read(4)
    if len(raw) < 4:
        return None
    n = struct.unpack('<I', raw)[0]
    return json.loads(sys.stdin.buffer.read(n).decode('utf-8'))


def send_msg(obj):
    data = json.dumps(obj).encode('utf-8')
    sys.stdout.buffer.write(struct.pack('<I', len(data)))
    sys.stdout.buffer.write(data)
    sys.stdout.buffer.flush()


def current_scheme(d):
    try:
        with open(os.path.join(d, 'hud-scheme')) as f:
            return f.read().strip() or 'cyberpunk'
    except OSError:
        return 'cyberpunk'


def current_ui(d):
    """The shared visual-effect + light-mode prefs (light, scanlines, vignette,
    glow, anim). These are per-origin localStorage on each page, so the ONLY way
    they reach the other extensions (newtab) is this native file."""
    try:
        with open(os.path.join(d, 'hud-ui.json')) as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def write_ui(d, ui):
    cur = current_ui(d)
    if isinstance(ui, dict):
        cur.update(ui)
    tmp = os.path.join(d, 'hud-ui.json.tmp')
    with open(tmp, 'w') as f:
        json.dump(cur, f)
    os.replace(tmp, os.path.join(d, 'hud-ui.json'))
    return cur


def refresh_pip(prev):
    try:
        import urllib.request
        prev['pip'] = urllib.request.urlopen('https://api.ipify.org', timeout=3).read().decode().strip()
    except Exception:
        pass


def sample(prev):
    import psutil
    d = {}
    now = time.time()
    try: d['cpu'] = round(psutil.cpu_percent(interval=None))
    except Exception: pass
    try:
        vm = psutil.virtual_memory(); d['mem'] = {'u': vm.used, 't': vm.total, 'p': round(vm.percent)}
    except Exception: pass
    try:
        sw = psutil.swap_memory()
        if sw.total: d['swap'] = {'u': sw.used, 't': sw.total, 'p': round(sw.percent)}
    except Exception: pass
    try: d['load'] = [round(x, 2) for x in os.getloadavg()]
    except Exception: pass
    try: d['uptime'] = int(now - psutil.boot_time())
    except Exception: pass
    try:
        du = psutil.disk_usage('/'); d['disk'] = {'u': du.used, 't': du.total, 'p': round(du.percent)}
    except Exception: pass
    try:
        b = psutil.sensors_battery()
        if b is not None: d['batt'] = {'p': round(b.percent), 'c': bool(b.power_plugged)}
    except Exception: pass
    try:
        n = psutil.net_io_counters()
        if prev.get('t'):
            dt = max(0.1, now - prev['t'])
            d['net'] = {'up': int((n.bytes_sent - prev['ns']) / dt), 'down': int((n.bytes_recv - prev['nr']) / dt)}
        prev['ns'], prev['nr'] = n.bytes_sent, n.bytes_recv
    except Exception: pass
    try:
        dio = psutil.disk_io_counters()
        if dio and prev.get('dr') is not None and prev.get('t'):
            dt = max(0.1, now - prev['t'])
            d['io'] = {'r': int((dio.read_bytes - prev['dr']) / dt), 'w': int((dio.write_bytes - prev['dw']) / dt)}
        if dio: prev['dr'], prev['dw'] = dio.read_bytes, dio.write_bytes
    except Exception: pass
    prev['t'] = now
    try:
        temps = psutil.sensors_temperatures()
        vals = [t.current for arr in temps.values() for t in arr if getattr(t, 'current', None)]
        if vals: d['temp'] = round(max(vals))
    except Exception:
        pass
    try: d['host'] = socket.gethostname().split('.')[0]
    except Exception: pass
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8', 80))
        d['lip'] = s.getsockname()[0]; s.close()
    except Exception: pass
    if prev.get('pip'): d['pip'] = prev['pip']
    return d


def stream_sysinfo():
    prev = {}
    refresh_pip(prev)
    ticks = 0
    while True:
        try:
            send_msg({'sys': sample(prev)})
        except Exception:
            return   # port closed — exit
        ticks += 1
        if ticks % 60 == 0:
            refresh_pip(prev)
        time.sleep(2)


def set_winsize(fd, rows, cols):
    try:
        import fcntl, termios
        fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack('HHHH', rows, cols, 0, 0))
    except Exception:
        pass


def pty_relay(first):
    """Spawn a login shell in a PTY and relay bytes <-> the native port."""
    import pty
    rows = int(first.get('rows', 24) or 24)
    cols = int(first.get('cols', 80) or 80)
    pid, master = pty.fork()
    if pid == 0:  # child -> exec the shell on the pty slave
        os.environ['TERM'] = 'xterm-256color'
        shell = os.environ.get('SHELL', '/bin/zsh')
        try:
            os.execvp(shell, [shell, '-l'])
        except Exception:
            os.execvp('/bin/sh', ['/bin/sh'])
        return
    set_winsize(master, rows, cols)
    stdin_fd = sys.stdin.buffer.fileno()
    while True:
        try:
            r, _, _ = select.select([stdin_fd, master], [], [])
        except (OSError, InterruptedError):
            break
        if stdin_fd in r:
            msg = read_msg()
            if msg is None:
                break
            c = msg.get('cmd')
            if c == 'pty_write':
                try: os.write(master, str(msg.get('data', '')).encode('utf-8'))
                except OSError: break
            elif c == 'pty_resize':
                set_winsize(master, int(msg.get('rows', 24) or 24), int(msg.get('cols', 80) or 80))
            elif c == 'pty_kill':
                break
        if master in r:
            try:
                data = os.read(master, 65536)
            except OSError:
                data = b''
            if not data:
                break
            try:
                send_msg({'ev': 'output', 'b64': base64.b64encode(data).decode('ascii')})
            except Exception:
                break
    try: os.kill(pid, signal.SIGKILL)
    except Exception: pass
    try: os.waitpid(pid, 0)
    except Exception: pass
    try: send_msg({'ev': 'exit'})
    except Exception: pass


def main():
    d = os.path.expanduser('~/.zwire')
    os.makedirs(d, exist_ok=True)
    allowed = {'cyberpunk', 'midnight', 'matrix', 'ember', 'arctic', 'crimson', 'toxic', 'vapor'}
    while True:
        msg = read_msg()
        if msg is None:
            break
        cmd = msg.get('cmd')
        if cmd == 'pty_spawn':
            pty_relay(msg)
            break
        if cmd == 'sysinfo_start':
            stream_sysinfo()
            break
        if cmd == 'get':
            send_msg({'ok': True, 'scheme': current_scheme(d), 'ui': current_ui(d)})
            continue
        if msg.get('ui') is not None:
            send_msg({'ok': True, 'ui': write_ui(d, msg.get('ui'))})
            continue
        scheme = str(msg.get('scheme', 'cyberpunk'))
        if scheme in allowed:
            tmp = os.path.join(d, 'hud-scheme.tmp')
            with open(tmp, 'w') as f:
                f.write(scheme + '\n')
            os.replace(tmp, os.path.join(d, 'hud-scheme'))
            send_msg({'ok': True, 'scheme': scheme})
        else:
            send_msg({'ok': False})


if __name__ == '__main__':
    main()
