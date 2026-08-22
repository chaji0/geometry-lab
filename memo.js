/* ============================================================
   memo.js — 포스트잇 메모 (손글씨 + 텍스트)
   기하 탐구실 공용 모듈 · 외부 라이브러리 없음
   ------------------------------------------------------------
   · window.PAGE_ID 가 있는 페이지(= 활동 페이지)에서만 켜진다.
     index.html(홈·목차)에는 PAGE_ID 가 없으므로 아무 일도 하지 않음.
   · 버튼은 아래 내비게이션의 '책갈피(#gnavMark)' 왼쪽에 끼워 넣는다.
     (내비가 없으면 화면 왼쪽 아래에 떠 있는 버튼으로 대체)
   · 저장 형식 : 획(stroke)을 좌표 배열로 + 텍스트 문자열
                 → 한 장 가득 써도 보통 3~10KB (PNG의 1/50 수준)
   · 저장 위치 : 아래 MemoStore 한 곳만 갈아끼우면 서버 저장으로 이전 가능
                 (Cloudflare Pages Functions + KV 예시를 주석으로 넣어둠)
   ============================================================ */
(function(){
'use strict';
if (!window.PAGE_ID) return;                 // 홈·목차에서는 동작 안 함
if (window.__GEO_MEMO__) return;             // 중복 로드 방지
window.__GEO_MEMO__ = true;

var PAGE = window.PAGE_ID;
var MAX_NOTES = 24;

function uid(){
  try { return localStorage.getItem('geoSid') || 'guest'; }
  catch(e){ return 'guest'; }
}

/* ---------- 저장소 어댑터 : 여기만 바꾸면 서버 저장으로 전환 ---------- */
var MemoStore = {
  key: function(){ return 'geo.memo.v1.' + uid() + '.' + PAGE; },
  load: function(){
    try { return JSON.parse(localStorage.getItem(this.key()) || 'null'); }
    catch(e){ return null; }
  },
  save: function(data){
    try { localStorage.setItem(this.key(), JSON.stringify(data)); return true; }
    catch(e){ return false; }                 // 용량 초과 등
  }
  /* --- 서버 전환 시 (Cloudflare Pages Functions + KV) ---------------
  load: function(){
    var k=this.key(), local=null;
    try{ local=JSON.parse(localStorage.getItem(k)||'null'); }catch(e){}
    return fetch('/api/memo?page='+PAGE, {credentials:'same-origin'})
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){ if(d) localStorage.setItem(k, JSON.stringify(d)); return d||local; })
      .catch(function(){ return local; });     // 오프라인이면 캐시로
  },
  save: function(data){
    localStorage.setItem(this.key(), JSON.stringify(data));   // 먼저 로컬에
    fetch('/api/memo?page='+PAGE, {method:'PUT', credentials:'same-origin',
      headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
      .catch(function(){});                    // 실패해도 로컬은 남는다
    return true;
  }
  ------------------------------------------------------------------ */
};

/* ---------- 스타일 ---------- */
var CSS = ''
+ '#memoLayer{position:fixed;inset:0;pointer-events:none;z-index:300;}'
+ '.postit{position:absolute;pointer-events:auto;display:flex;flex-direction:column;'
+ 'border-radius:2px 2px 10px 2px;touch-action:none;overflow:hidden;'
+ '-webkit-tap-highlight-color:transparent;}'
+ '.pit-bar{height:30px;flex:none;display:flex;align-items:center;gap:3px;padding:0 5px;'
+ 'background:rgba(0,0,0,.06);cursor:move;touch-action:none;}'
+ '.pit-bar .grip{flex:1;height:100%;}'
+ '.pit-bar button{width:26px;height:24px;border:none;background:transparent;cursor:pointer;'
+ 'font-size:14px;color:#78350f;border-radius:5px;padding:0;line-height:1;font-family:inherit;}'
+ '.pit-bar button:active{background:rgba(0,0,0,.1);}'
+ '.pit-bar button.op{width:31px;font-size:10px;font-weight:800;letter-spacing:-.3px;}'
+ '.pit-bar button.txt{font-weight:900;font-family:Georgia,serif;font-size:15px;}'
+ '.pit-bar button.txt.on{background:#78350f;color:#fff;}'
+ '.pit-bar .del.arm{background:#dc2626;color:#fff;width:auto;padding:0 7px;font-size:11px;font-weight:700;}'
+ '.pit-body{flex:1;position:relative;overflow:hidden;}'
+ '.pit-body canvas{position:absolute;left:0;top:0;touch-action:none;display:block;}'
+ '.pit-body textarea{position:absolute;left:0;top:0;width:100%;height:100%;border:none;'
+ 'background:transparent;resize:none;outline:none;padding:7px 8px;box-sizing:border-box;'
+ 'font-family:inherit;font-size:14px;line-height:1.55;color:#1f2937;}'
+ '.pit-tools{height:30px;flex:none;display:flex;align-items:center;gap:5px;padding:0 6px;'
+ 'background:rgba(0,0,0,.05);}'
+ '.pit-tools .pen{width:17px;height:17px;border-radius:50%;border:2px solid rgba(255,255,255,.85);'
+ 'cursor:pointer;padding:0;box-shadow:0 1px 2px rgba(0,0,0,.25);}'
+ '.pit-tools .pen.on{outline:2px solid #0f172a;outline-offset:1px;}'
+ '.pit-tools .tbtn{border:none;background:rgba(255,255,255,.6);border-radius:6px;cursor:pointer;'
+ 'font-size:12px;padding:3px 7px;color:#475569;line-height:1.2;font-family:inherit;}'
+ '.pit-tools .tbtn.on{background:#0f172a;color:#fff;}'
+ '.pit-resize{position:absolute;right:0;bottom:0;width:24px;height:24px;cursor:nwse-resize;'
+ 'touch-action:none;background:linear-gradient(135deg,transparent 46%,rgba(0,0,0,.28) 46%);}'
+ '.postit.mini{width:44px !important;height:44px !important;border-radius:3px 3px 10px 3px;'
+ 'align-items:center;justify-content:center;cursor:grab;font-size:20px;}'
+ '.postit.mini:active{cursor:grabbing;}'
+ '.postit.mini .pit-bar,.postit.mini .pit-body,'
+ '.postit.mini .pit-tools,.postit.mini .pit-resize{display:none;}'
+ '.postit.mini::after{content:"\\1F589";}'
+ '#memoNavBtn{background:#fffbeb !important;border-color:#fcd34d !important;}'
+ '#memoNavBtn:hover{border-color:#f59e0b !important;}'
+ '#memoFloatBtn{position:fixed;left:12px;bottom:66px;width:48px;height:48px;z-index:301;'
+ 'border:none;cursor:pointer;padding:0;border-radius:3px 3px 12px 3px;'
+ 'background:linear-gradient(160deg,#fde047,#facc15);box-shadow:0 3px 8px rgba(0,0,0,.22);'
+ 'font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;'
+ 'color:#78350f;-webkit-tap-highlight-color:transparent;}';

var st = document.createElement('style');
st.textContent = CSS;
document.head.appendChild(st);

/* ---------- 상태 ---------- */
var PENS  = ['#1f2937','#dc2626','#2563eb'];
var PAPER = [                                   // 포스트잇 색 (위, 아래)
  ['254,249,195','253,230,138'],                // 노랑
  ['219,234,254','191,219,254'],                // 파랑
  ['220,252,231','187,247,208'],                // 초록
  ['252,231,243','251,207,232']                 // 분홍
];
var OPS   = [1, 0.7, 0.45, 0.2];                // 투명도 단계 (최소 20%)
var OPLAB = ['100','70','45','20'];

var layer = document.createElement('div');
layer.id = 'memoLayer';
var state = { v:1, seq:0, zTop:1, notes:[] };
var views = {};                                 // id -> {el, cv, ctx, ta, ...}
var saveTimer = null;

function markDirty(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function(){ MemoStore.save(state); }, 500);
}
function flush(){ clearTimeout(saveTimer); MemoStore.save(state); }
document.addEventListener('visibilitychange', function(){ if(document.hidden) flush(); });
window.addEventListener('pagehide', flush);

/* ---------- 그리기 ---------- */
function fitCanvas(n,v){
  var w = Math.max(20, n.w-2), h = Math.max(20, n.h-60);
  var dpr = Math.min(window.devicePixelRatio||1, 2);
  v.cv.style.width = w+'px'; v.cv.style.height = h+'px';
  v.cv.width = Math.round(w*dpr); v.cv.height = Math.round(h*dpr);
  v.ctx.setTransform(dpr,0,0,dpr,0,0);
  redraw(n,v);
}
function drawStroke(ctx,s){
  var p = s.p; if(p.length < 2) return;
  ctx.strokeStyle = s.c; ctx.lineWidth = s.w; ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.beginPath(); ctx.moveTo(p[0],p[1]);
  if(p.length === 2) ctx.lineTo(p[0]+0.01, p[1]);
  for(var i=2;i<p.length;i+=2) ctx.lineTo(p[i],p[i+1]);
  ctx.stroke();
}
function redraw(n,v){
  var dpr = Math.min(window.devicePixelRatio||1, 2);
  v.ctx.clearRect(0,0, v.cv.width/dpr, v.cv.height/dpr);
  for(var i=0;i<n.strokes.length;i++) drawStroke(v.ctx, n.strokes[i]);
}

/* ---------- 배치 · 색 · 투명도 ---------- */
function bringFront(n){
  n.z = ++state.zTop;
  views[n.id].el.style.zIndex = n.z;
  markDirty();
}
function applyBox(n,v){
  var el = v.el;
  el.style.left = n.x+'px'; el.style.top = n.y+'px';
  el.style.width = n.w+'px'; el.style.height = n.h+'px';
  el.style.zIndex = n.z;
  el.className = 'postit' + (n.min ? ' mini' : '');
  applyPaper(n,v);
}
/* 종이와 글씨(손글씨·텍스트)가 같이 흐려진다.
   버튼줄은 절반만 따라가서, 흐린 상태에서도 되돌릴 수 있게 남긴다. */
function applyPaper(n,v){
  var a = OPS[n.op||0], g = PAPER[n.color||0], el = v.el;
  el.style.background = 'linear-gradient(170deg,rgba('+g[0]+','+a+'),rgba('+g[1]+','+a+'))';
  el.style.boxShadow  = '0 4px 14px rgba(0,0,0,'+(0.22*a).toFixed(3)+')';
  el.style.color      = 'rgba(120,53,15,'+Math.max(a,0.5)+')';   // 접혔을 때 아이콘
  v.cv.style.opacity  = a;
  v.ta.style.opacity  = a;
  var bar = 0.5 + 0.5*a;
  ['.pit-bar','.pit-tools','.pit-resize'].forEach(function(sel){
    var e = el.querySelector(sel); if(e) e.style.opacity = bar;
  });
  var ob = el.querySelector('.op'); if(ob) ob.textContent = OPLAB[n.op||0];
}

/* ---------- 노트 DOM ---------- */
function makeNote(n){
  var el = document.createElement('div');
  el.innerHTML =
      '<div class="pit-bar">'
    +   '<button class="hide" title="접기">▁</button>'
    +   '<div class="grip"></div>'
    +   '<button class="txt" title="텍스트 입력">T</button>'
    +   '<button class="op" title="투명도">100</button>'
    +   '<button class="col" title="색">◧</button>'
    +   '<button class="del" title="삭제">✕</button>'
    + '</div>'
    + '<div class="pit-body"><textarea placeholder=""></textarea><canvas></canvas></div>'
    + '<div class="pit-tools">'
    +   PENS.map(function(c,i){ return '<button class="pen" data-i="'+i+'" style="background:'+c+'"></button>'; }).join('')
    +   '<button class="tbtn thick" title="굵기">가는펜</button>'
    +   '<button class="tbtn er" title="지우개">지우개</button>'
    +   '<button class="tbtn undo" title="되돌리기">↺</button>'
    + '</div>'
    + '<div class="pit-resize"></div>';
  layer.appendChild(el);

  var cv = el.querySelector('canvas');
  var ta = el.querySelector('textarea');
  var v = { el:el, cv:cv, ctx:cv.getContext('2d'), ta:ta,
            pen:0, thick:false, eraser:false, textMode:false, penSeen:false };
  views[n.id] = v;

  ta.value = n.text || '';
  applyBox(n,v); fitCanvas(n,v); syncTools(n,v);

  ta.addEventListener('input', function(){ n.text = ta.value; markDirty(); });
  ta.addEventListener('pointerdown', function(e){ e.stopPropagation(); bringFront(n); });

  /* 버튼은 pointerdown 으로 (드래그 핸들·포인터 캡처와 충돌 방지) */
  function stop(sel, fn){
    el.querySelector(sel).addEventListener('pointerdown', function(e){
      e.stopPropagation(); e.preventDefault(); fn(e);
    });
  }
  stop('.hide', function(){ n.min = true; setText(n,v,false); applyBox(n,v); markDirty(); });
  stop('.txt',  function(){ setText(n,v,!v.textMode); });
  stop('.op',   function(){ n.op = ((n.op||0)+1)%OPS.length; applyPaper(n,v); markDirty(); });
  stop('.col',  function(){ n.color = ((n.color||0)+1)%PAPER.length; applyPaper(n,v); markDirty(); });

  var del = el.querySelector('.del'), armed = null;
  stop('.del', function(){
    if(armed){ clearTimeout(armed); removeNote(n); return; }
    del.classList.add('arm'); del.textContent = '삭제?';
    armed = setTimeout(function(){ armed=null; del.classList.remove('arm'); del.textContent='✕'; }, 2200);
  });

  Array.prototype.forEach.call(el.querySelectorAll('.pen'), function(b){
    b.addEventListener('pointerdown', function(e){
      e.stopPropagation(); e.preventDefault();
      v.pen = +b.dataset.i; v.eraser = false; setText(n,v,false); syncTools(n,v);
    });
  });
  stop('.thick', function(){ v.thick = !v.thick; syncTools(n,v); });
  stop('.er',    function(){ v.eraser = !v.eraser; if(v.eraser) setText(n,v,false); syncTools(n,v); });
  stop('.undo',  function(){ n.strokes.pop(); redraw(n,v); markDirty(); });

  /* 접힌 상태: 끌면 이동, 그냥 톡 누르면 펼치기 */
  var md = null;
  el.addEventListener('pointerdown', function(e){
    if(!n.min){ bringFront(n); return; }
    e.preventDefault();
    try{ el.setPointerCapture(e.pointerId); }catch(_){}
    md = { id:e.pointerId, sx:e.clientX, sy:e.clientY, ox:n.x, oy:n.y, moved:false };
    bringFront(n);
  });
  el.addEventListener('pointermove', function(e){
    if(!md || e.pointerId !== md.id) return;
    var dx = e.clientX-md.sx, dy = e.clientY-md.sy;
    if(!md.moved && Math.sqrt(dx*dx+dy*dy) < 6) return;     // 살짝 흔들린 건 탭
    md.moved = true;
    var R = layer.getBoundingClientRect();
    n.x = Math.max(0, Math.min(R.width -44, md.ox+dx));
    n.y = Math.max(0, Math.min(R.height-44, md.oy+dy));
    applyBox(n,v); markDirty();
  });
  function mUp(e){
    if(!md || e.pointerId !== md.id) return;
    try{ el.releasePointerCapture(e.pointerId); }catch(_){}
    var moved = md.moved; md = null;
    if(!moved){ n.min = false; applyBox(n,v); fitCanvas(n,v); }
    markDirty();
  }
  el.addEventListener('pointerup', mUp);
  el.addEventListener('pointercancel', mUp);

  dragBy(el.querySelector('.pit-bar'), n, v, 'move');
  dragBy(el.querySelector('.pit-resize'), n, v, 'size');
  writeOn(n, v);
  return v;
}

function setText(n,v,on){
  v.textMode = !!on;
  if(v.textMode){ v.eraser = false; }
  v.cv.style.pointerEvents = v.textMode ? 'none' : 'auto';
  v.ta.style.pointerEvents = v.textMode ? 'auto' : 'none';
  if(v.textMode){ try{ v.ta.focus(); }catch(e){} } else { try{ v.ta.blur(); }catch(e){} }
  syncTools(n,v);
}
function syncTools(n,v){
  Array.prototype.forEach.call(v.el.querySelectorAll('.pen'), function(b){
    b.classList.toggle('on', !v.eraser && !v.textMode && +b.dataset.i === v.pen);
  });
  var t = v.el.querySelector('.thick');
  t.classList.toggle('on', v.thick); t.textContent = v.thick ? '굵은펜' : '가는펜';
  v.el.querySelector('.er').classList.toggle('on', v.eraser);
  v.el.querySelector('.txt').classList.toggle('on', v.textMode);
}
function removeNote(n){
  var v = views[n.id]; if(v) v.el.remove();
  delete views[n.id];
  state.notes = state.notes.filter(function(x){ return x !== n; });
  flush();
}

/* ---------- 이동 / 크기 조절 ---------- */
function dragBy(handle, n, v, mode){
  var sx=0, sy=0, ox=0, oy=0;
  handle.addEventListener('pointerdown', function(e){
    if(n.min) return;
    if(e.target.closest && e.target.closest('button')) return;   // 버튼은 드래그 아님
    e.stopPropagation(); e.preventDefault();
    try{ handle.setPointerCapture(e.pointerId); }catch(_){}
    sx=e.clientX; sy=e.clientY;
    ox = (mode==='move') ? n.x : n.w;
    oy = (mode==='move') ? n.y : n.h;
    bringFront(n);
  });
  handle.addEventListener('pointermove', function(e){
    if(!handle.hasPointerCapture || !handle.hasPointerCapture(e.pointerId)) return;
    var R = layer.getBoundingClientRect();
    var dx = e.clientX-sx, dy = e.clientY-sy;
    if(mode === 'move'){
      n.x = Math.max(0, Math.min(R.width -44, ox+dx));
      n.y = Math.max(0, Math.min(R.height-36, oy+dy));
      applyBox(n,v);
    } else {
      n.w = Math.max(160, Math.min(900, ox+dx));
      n.h = Math.max(140, Math.min(900, oy+dy));
      applyBox(n,v); fitCanvas(n,v);
    }
    markDirty();
  });
  function up(e){
    if(handle.hasPointerCapture && handle.hasPointerCapture(e.pointerId))
      handle.releasePointerCapture(e.pointerId);
  }
  handle.addEventListener('pointerup', up);
  handle.addEventListener('pointercancel', up);
}

/* ---------- 손글씨 ---------- */
function writeOn(n, v){
  var cv = v.cv, cur = null, last = null;
  function pos(e){
    var r = cv.getBoundingClientRect();
    return [Math.round(e.clientX-r.left), Math.round(e.clientY-r.top)];
  }
  cv.addEventListener('pointerdown', function(e){
    if(n.min || v.textMode) return;
    if(e.pointerType === 'pen') v.penSeen = true;             // 애플펜슬 감지
    if(v.penSeen && e.pointerType !== 'pen') return;          // 손바닥·손가락 무시
    e.stopPropagation(); e.preventDefault();
    try{ cv.setPointerCapture(e.pointerId); }catch(_){}
    bringFront(n);
    var p = pos(e);
    if(v.eraser){ cur = 'er'; erase(n,v,p[0],p[1]); return; }
    cur = { c:PENS[v.pen], w:(v.thick?4.5:2.2), p:[p[0],p[1]] };
    n.strokes.push(cur); last = p;
  });
  cv.addEventListener('pointermove', function(e){
    if(!cur) return;
    e.stopPropagation(); e.preventDefault();
    var p = pos(e);
    if(cur === 'er'){ erase(n,v,p[0],p[1]); return; }
    if(last && Math.abs(p[0]-last[0]) < 1.4 && Math.abs(p[1]-last[1]) < 1.4) return;
    cur.p.push(p[0],p[1]);
    v.ctx.strokeStyle = cur.c; v.ctx.lineWidth = cur.w;
    v.ctx.lineCap='round'; v.ctx.lineJoin='round';
    v.ctx.beginPath(); v.ctx.moveTo(last[0],last[1]); v.ctx.lineTo(p[0],p[1]); v.ctx.stroke();
    last = p;
  });
  function end(e){
    if(!cur) return; cur = null; last = null;
    try{ cv.releasePointerCapture(e.pointerId); }catch(_){}
    markDirty();
  }
  cv.addEventListener('pointerup', end);
  cv.addEventListener('pointercancel', end);
}
function erase(n,v,x,y){
  var R = 13, before = n.strokes.length;
  n.strokes = n.strokes.filter(function(s){
    for(var i=0;i<s.p.length;i+=2)
      if(Math.abs(s.p[i]-x) < R && Math.abs(s.p[i+1]-y) < R) return false;
    return true;
  });
  if(n.strokes.length !== before){ redraw(n,v); markDirty(); }
}

/* ---------- 새 메모 ---------- */
function addNote(){
  if(state.notes.length >= MAX_NOTES) return;
  var R = layer.getBoundingClientRect(), k = state.seq++;
  var n = { id:'n'+Date.now().toString(36)+k,
            x: 20 + (k%6)*26, y: 90 + (k%6)*24,
            w:240, h:250, min:false, color:0, op:0, text:'',
            z: ++state.zTop, strokes:[] };
  n.x = Math.min(n.x, Math.max(0, R.width -260));
  n.y = Math.min(n.y, Math.max(0, R.height-290));
  state.notes.push(n); makeNote(n); markDirty();
}

/* ---------- 버튼 붙이기 (책갈피 왼쪽) ---------- */
function makeNavButton(){
  var mark = document.getElementById('gnavMark');
  if(mark && mark.parentNode){
    var b = mark.cloneNode(false);              // 내비 버튼과 같은 모양으로
    b.id = 'memoNavBtn';
    b.removeAttribute('href');
    b.removeAttribute('onclick');
    b.removeAttribute('title');
    b.textContent = '📝 메모';
    b.title = '포스트잇 메모 추가';
    b.style.cursor = 'pointer';
    b.addEventListener('click', function(e){ e.preventDefault(); addNote(); });
    mark.parentNode.insertBefore(b, mark);
    return true;
  }
  return false;
}
function makeFloatButton(){
  if(document.getElementById('memoFloatBtn')) return;
  var b = document.createElement('button');
  b.id = 'memoFloatBtn'; b.title = '포스트잇 메모 추가'; b.textContent = '＋';
  b.addEventListener('click', addNote);
  document.body.appendChild(b);
}

/* ---------- 시작 ---------- */
function boot(){
  document.body.appendChild(layer);

  var d = MemoStore.load();
  if(d && d.notes && d.notes.length){
    state = { v:1, seq:d.seq||d.notes.length, zTop:d.zTop||d.notes.length+1, notes:d.notes };
    state.notes.forEach(function(n){
      n.strokes = n.strokes || []; n.text = n.text || '';
      makeNote(n);
    });
  }

  /* nav.js 가 내비를 그린 뒤에 버튼을 끼워 넣는다 (최대 4초 대기) */
  var tries = 0;
  (function waitNav(){
    if(makeNavButton()) return;
    if(++tries > 40){ makeFloatButton(); return; }
    setTimeout(waitNav, 100);
  })();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

window.GEO_memo = { add:addNote, state:function(){ return state; },
                    bytes:function(){ return JSON.stringify(state).length; } };
})();
