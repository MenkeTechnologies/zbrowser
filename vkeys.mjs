const H={Host:'localhost'};
async function j(p){return await (await fetch('http://127.0.0.1:9222'+p,{headers:H})).json();}
const ver=await j('/json/version');const ws=new WebSocket(ver.webSocketDebuggerUrl);let i=0;const w={};
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&w[m.id]){w[m.id](m);delete w[m.id]}});
await new Promise(r=>ws.addEventListener('open',r));
const cmd=(m,p,s)=>new Promise(r=>{const k=++i;w[k]=r;ws.send(JSON.stringify({id:k,method:m,params:p||{},sessionId:s}))});
const ct=await cmd('Target.createTarget',{url:'chrome-extension://omcgnnjfmbmpdlofklbpddkhnfibfhgg/pages/keys.html'});
await new Promise(r=>setTimeout(r,2600));
const list=await j('/json/list');const t=list.find(x=>x.type==='page'&&x.url.includes('keys.html'));
if(!t){console.log('keys page not found');process.exit(1)}
const {result:{sessionId}}=await cmd('Target.attachToTarget',{targetId:t.id||t.targetId,flatten:true});
await cmd('Runtime.enable',{},sessionId);
const ev=async x=>{const r=await cmd('Runtime.evaluate',{expression:x,awaitPromise:true,returnByValue:true},sessionId);return r.result&&r.result.result?r.result.result.value:JSON.stringify(r.result);};
console.log('title:', await ev('document.title'));
console.log('ZWIRE_KEYMAP present:', await ev('!!window.ZWIRE_KEYMAP'));
console.log('editable key chips:', await ev('document.querySelectorAll(".xt-kbd-edit").length'));
console.log('categories rendered:', await ev('document.querySelectorAll(".set-h").length'));
console.log('sample rows:', await ev('JSON.stringify([...document.querySelectorAll(".info-row .ik")].slice(0,4).map(n=>n.textContent))'));
// simulate a remap: write zb_keys.scrollDown='s' and confirm storage + that zvim would pick it up
console.log('write remap scrollDown->s:', await ev(`new Promise(r=>chrome.storage.local.set({zb_keys:{scrollDown:'s'}},()=>r('saved')))`));
console.log('zb_keys now:', await ev(`new Promise(r=>chrome.storage.local.get('zb_keys',o=>r(JSON.stringify(o.zb_keys))))`));
ws.close();
