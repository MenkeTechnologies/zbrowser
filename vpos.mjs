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
console.log('segment order (left→right):', await ev(`JSON.stringify([...document.querySelectorAll("#zb-statusbar .seg, #zb-statusbar .sig")].map(function(s){return s.className.replace("seg ","").trim()||"sig"}).slice(0,6))`));
console.log('C-b left of scheme?:', await ev(`(function(){var segs=[...document.querySelectorAll("#zb-statusbar .seg")];var p=segs.findIndex(s=>s.querySelector("[data-prefix]"));var sc=segs.findIndex(s=>s.querySelector("[data-scheme]"));return "pfx@"+p+" scheme@"+sc+" -> "+(p<sc?"LEFT ✓":"not left")})()`));
ws.close();
