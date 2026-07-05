const H={Host:'localhost'};
async function j(p){return await (await fetch('http://127.0.0.1:9222'+p,{headers:H})).json();}
const ver=await j('/json/version');const ws=new WebSocket(ver.webSocketDebuggerUrl);let i=0;const w={};
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&w[m.id]){w[m.id](m);delete w[m.id]}});
await new Promise(r=>ws.addEventListener('open',r));
const cmd=(m,p,s)=>new Promise(r=>{const k=++i;w[k]=r;ws.send(JSON.stringify({id:k,method:m,params:p||{},sessionId:s}))});
// trigger terminal via a page's Ctrl+`
const list=await j('/json/list');
const page=list.find(t=>t.type==='page'&&/github|amazon|wikipedia/.test(t.url||''));
const {result:{sessionId}}=await cmd('Target.attachToTarget',{targetId:page.id||page.targetId,flatten:true});
await cmd('Runtime.enable',{},sessionId);await cmd('Input.enable',{},sessionId).catch(()=>{});
await cmd('Runtime.evaluate',{expression:'window.focus()'},sessionId);
await cmd('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'`',code:'Backquote',modifiers:2},sessionId);
await cmd('Input.dispatchKeyEvent',{type:'keyUp',key:'`',code:'Backquote',modifiers:2},sessionId);
await new Promise(r=>setTimeout(r,2500));
const l2=await j('/json/list');
const term=l2.find(t=>t.type==='page'&&t.url.includes('terminal.html'));
console.log('terminal popup window opened:', !!term, term?('('+term.url.slice(-20)+')'):'');
if(term){
  const {result:{sessionId:ts}}=await cmd('Target.attachToTarget',{targetId:term.id||term.targetId,flatten:true});
  await cmd('Runtime.enable',{},ts);
  const ev=async x=>{const r=await cmd('Runtime.evaluate',{expression:x,returnByValue:true},ts);return r.result&&r.result.result!==undefined?r.result.result:(r.result?r.result.value:'?');};
  await new Promise(r=>setTimeout(r,6000));   // shell boot
  console.log('  xterm rendered:', await ev('!!document.querySelector("#terminalPane .xterm")'));
  console.log('  connectNative direct (page):', await ev('!!(chrome.runtime&&chrome.runtime.connectNative)'));
}
console.log('pty host + shell running:', 'checked separately');
ws.close();
