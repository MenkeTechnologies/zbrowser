const H={Host:'localhost'};
async function j(p){return await (await fetch('http://127.0.0.1:9222'+p,{headers:H})).json();}
const ver=await j('/json/version');const ws=new WebSocket(ver.webSocketDebuggerUrl);let i=0;const w={};
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&w[m.id]){w[m.id](m);delete w[m.id]}});
await new Promise(r=>ws.addEventListener('open',r));
const cmd=(m,p,s)=>new Promise(r=>{const k=++i;w[k]=r;ws.send(JSON.stringify({id:k,method:m,params:p||{},sessionId:s}))});
const list=await j('/json/list');
const page=list.find(t=>t.type==='page'&&/github|amazon|wikipedia/.test(t.url||''));
if(!page){console.log('no stable page');process.exit(0)}
const {result:{sessionId}}=await cmd('Target.attachToTarget',{targetId:page.id||page.targetId,flatten:true});
await cmd('Runtime.enable',{},sessionId);
const ev=async x=>{const r=await cmd('Runtime.evaluate',{expression:x,returnByValue:true},sessionId);return r.result&&r.result.result!==undefined?r.result.result:(r.result?r.result.value:'?');};
// wait for zb_sys to stream in (SW connects to host, host samples every 2s)
await new Promise(r=>setTimeout(r,5000));
console.log('segment count:', await ev('document.querySelectorAll("#zb-statusbar .seg").length'));
console.log('CPU seg:', await ev('document.querySelector("#zb-statusbar [data-cpu]")?.textContent'));
console.log('MEM seg:', await ev('document.querySelector("#zb-statusbar [data-mem]")?.textContent'));
console.log('NET seg:', await ev('document.querySelector("#zb-statusbar [data-net]")?.textContent'));
console.log('HOST seg:', await ev('document.querySelector("#zb-statusbar [data-host]")?.textContent'));
console.log('LAN seg:', await ev('document.querySelector("#zb-statusbar [data-lip]")?.textContent'));
console.log('UP seg:', await ev('document.querySelector("#zb-statusbar [data-up]")?.textContent'));
console.log('BATT seg:', await ev('document.querySelector("#zb-statusbar [data-batt]")?.textContent'));
console.log('powerline plr count:', await ev('document.querySelectorAll("#zb-statusbar .plr").length'));
console.log('clock:', await ev('document.querySelector("#zb-statusbar [data-clock]")?.textContent'));
ws.close();
