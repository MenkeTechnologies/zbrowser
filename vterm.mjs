const H={Host:'localhost'};
async function j(p){return await (await fetch('http://127.0.0.1:9222'+p,{headers:H})).json();}
const ver=await j('/json/version');const ws=new WebSocket(ver.webSocketDebuggerUrl);let i=0;const w={};
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&w[m.id]){w[m.id](m);delete w[m.id]}});
await new Promise(r=>ws.addEventListener('open',r));
const cmd=(m,p,s)=>new Promise(r=>{const k=++i;w[k]=r;ws.send(JSON.stringify({id:k,method:m,params:p||{},sessionId:s}))});
await cmd('Target.createTarget',{url:'chrome-extension://omcgnnjfmbmpdlofklbpddkhnfibfhgg/pages/terminal.html'});
await new Promise(r=>setTimeout(r,1500));
const list=await j('/json/list');const t=list.find(x=>x.type==='page'&&x.url.includes('terminal.html'));
if(!t){console.log('terminal page not found');process.exit(1)}
const {result:{sessionId}}=await cmd('Target.attachToTarget',{targetId:t.id||t.targetId,flatten:true});
await cmd('Runtime.enable',{},sessionId);
const ev=async x=>{const r=await cmd('Runtime.evaluate',{expression:x,returnByValue:true},sessionId);return r.result&&r.result.result!==undefined?r.result.result:(r.result?r.result.value:'?');};
console.log('xterm loaded (Terminal global):', await ev('typeof Terminal'));
console.log('terminal pane present:', await ev('!!document.getElementById("terminalPane")'));
console.log('xterm rendered:', await ev('!!document.querySelector("#terminalPane .xterm")'));
console.log('waiting for PTY/shell to boot…');
await new Promise(r=>setTimeout(r,5000));   // heavy zsh login
console.log('terminal has rows of text:', await ev('document.querySelectorAll("#terminalPane .xterm-rows > div").length'));
console.log('any visible shell text?:', await ev('(document.querySelector("#terminalPane .xterm-rows")||{}).textContent?.replace(/\\s+/g," ").trim().slice(0,80) || "(empty)"'));
// type a command
await ev(`(function(){var t=window; if(t.__zbTermInstance){} })()`);
ws.close();
