const H={Host:'localhost'};
async function j(p){return await (await fetch('http://127.0.0.1:9222'+p,{headers:H})).json();}
const ver=await j('/json/version');const ws=new WebSocket(ver.webSocketDebuggerUrl);let i=0;const w={};
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&w[m.id]){w[m.id](m);delete w[m.id]}});
await new Promise(r=>ws.addEventListener('open',r));
const cmd=(m,p,s)=>new Promise(r=>{const k=++i;w[k]=r;ws.send(JSON.stringify({id:k,method:m,params:p||{},sessionId:s}))});
const list=await j('/json/list');
const page=list.find(t=>t.type==='page'&&/github|amazon|wikipedia/.test(t.url||''));
if(!page){console.log('no stable page');process.exit(0)}
console.log('page:',page.url.slice(0,40));
const {result:{sessionId}}=await cmd('Target.attachToTarget',{targetId:page.id||page.targetId,flatten:true});
await cmd('Runtime.enable',{},sessionId);await cmd('Input.enable',{},sessionId).catch(()=>{});
const ev=async x=>{const r=await cmd('Runtime.evaluate',{expression:x,returnByValue:true},sessionId);return r.result&&r.result.result!==undefined?r.result.result:(r.result?r.result.value:'?');};
console.log('terminal content script loaded (pane in DOM, hidden):', await ev('!!document.getElementById("terminalPane")'));
await ev('window.focus()');
// dispatch Ctrl+` to toggle the popup
await cmd('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'`',code:'Backquote',modifiers:2},sessionId);
await cmd('Input.dispatchKeyEvent',{type:'keyUp',key:'`',code:'Backquote',modifiers:2},sessionId);
await new Promise(r=>setTimeout(r,600));
console.log('popup active after Ctrl+`:', await ev('document.getElementById("terminalPane")?.classList.contains("active")'));
console.log('xterm rendered:', await ev('!!document.querySelector("#terminalPane .xterm")'));
console.log('waiting for shell to boot via SW→host PTY…');
await new Promise(r=>setTimeout(r,7000));
console.log('terminal shell text:', await ev('(document.querySelector("#terminalPane .xterm-rows")||{}).textContent?.replace(/\\s+/g," ").trim().slice(0,90) || "(empty)"'));
ws.close();
