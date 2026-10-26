import WebSocket from 'ws';
import http from 'http';
import { spawn } from 'child_process';
const DBG = 9333;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
 ['--headless','--remote-debugging-port='+DBG,'--user-data-dir=/tmp/kcprobe-p5','--window-size=1500,950','about:blank'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,2500));
const list = await new Promise((res,rej)=>http.get(`http://localhost:${DBG}/json`,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)))}).on('error',rej));
const page = list.find(t=>t.type==='page');
const ws = new WebSocket(page.webSocketDebuggerUrl,{maxPayload:256*1024*1024});
let id=0; const pend=new Map();
const send=(m,p={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p}))});
ws.on('message',d=>{const m=JSON.parse(d);if(m.id&&pend.has(m.id)){pend.get(m.id).res(m.result);pend.delete(m.id)}});
await new Promise(r=>ws.on('open',r));
await send('Page.enable'); await send('Runtime.enable');
const evaljs = async (e) => (await send('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true})).result?.value;
const nav = async (url,wait=4000) => { await send('Page.navigate',{url}); await new Promise(r=>setTimeout(r,wait)); };
await nav('http://localhost:8080/admin/master/console/');
if((await evaljs('location.href')).includes('protocol/openid-connect')){
  await evaljs(`(()=>{const s=(el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}))};
    s(document.querySelector('#username'),'admin');s(document.querySelector('#password'),'admin');document.querySelector('#kc-login').click();})()`);
  await new Promise(r=>setTimeout(r,6000));
}
await nav('http://localhost:8080/admin/master/console/#/master/realm-settings/login',8000);
const dom = await evaljs(`(()=>{
  const el=[...document.querySelectorAll('h1,h2,h3,div')].find(e=>e.textContent.trim()==='Email settings' && e.children.length<3);
  if(!el) return 'not found: '+document.body.innerText.slice(0,300);
  const out=[];let cur=el;
  for(let i=0;i<7&&cur;i++){const cs=getComputedStyle(cur),r=cur.getBoundingClientRect();
    out.push({tag:cur.tagName,cls:(cur.className||'').toString().slice(0,60),h:Math.round(r.height),w:Math.round(r.width),bg:cs.backgroundColor,bd:cs.borderStyle!=='none'?cs.borderTop+'/'+cs.borderBottom:'',br:cs.borderRadius});cur=cur.parentElement;}
  return JSON.stringify(out);
})()`);
console.log(dom);
chrome.kill(); process.exit(0);
