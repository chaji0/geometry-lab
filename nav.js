'use strict';
/* ════════════════════════════════════════════════════════════
   기하 탐구실 공통 설정 + 활동 페이지 하단 내비게이션
   - index.html 과 모든 활동 페이지가 이 파일 하나를 공유합니다.
   - 활동 페이지에서는 <script>window.PAGE_ID='...'</script> 를
     먼저 선언한 뒤 이 파일을 불러오면 하단 바가 자동으로 생깁니다.
   ════════════════════════════════════════════════════════════ */
window.GEO_CONFIG = {
  VERSION: "v1.11",                 // ★ 1단원=v1.x, 2단원=v2.x, 3단원=v3.x — 업로드마다 뒷자리 +1 (v1.11, v1.12, …)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx3Ay-gudjjSoRlngyu54umJ9uYRAKhINuwcv229UZUN9_oIQfm9vwAxM32FOPR9wV1/exec",
  ACTIVITIES: [
    { id:'conic',    href:'conic.html',    icon:'⚾', short:'원뿔곡선',
      title:'원뿔곡선 탐구 — 이중원뿔의 단면',
      desc:'평면의 기울기를 바꿔 단면을 자르고(야구 퀴즈!), 단델린 구로 포물선·타원·쌍곡선을 증명해 보세요.' },
    { id:'folding',  href:'folding.html',  icon:'📄', short:'종이접기',
      title:'종이접기로 포물선 만들기',
      desc:'아래 변의 점이 F에 닿도록 접고, 또 접고… 접은 선들이 그리는 곡선의 정체를 확인하고 원리까지 파헤쳐요.' },
    { id:'concept',  href:'concept.html',  icon:'📘', short:'개념정리',
      title:'포물선 개념 정리',
      desc:'초점과 준선으로 정의되는 포물선 — p 값을 움직이며 y²=4px, x²=4py의 그래프·초점·준선을 확인해요.' },
    { id:'apply',    href:'apply.html',    icon:'🔦', short:'포물선활용',
      title:'포물선의 활용',
      desc:'태양열 조리기와 자동차 전조등 — 초점의 위치가 왜 중요한지 광선 시뮬레이션으로 확인해요.' },
    { id:'geogebra', href:'geogebra.html', icon:'📐', short:'지오지브라',
      title:'지오지브라',
      desc:'앱 안에서 바로 열리는 지오지브라 — 클래식·그래핑·기하·3D 계산기. (인터넷 연결 필요)' }
  ]
};

/* 지오지브라 바로가기 (우측 상단 G 버튼) — 모든 페이지 공용 */
window.GEO_addGButton = function(){
  if(document.getElementById('gBtnFloat')) return;
  const b = document.createElement('a');
  b.id = 'gBtnFloat';
  b.href = 'geogebra.html';
  b.title = '지오지브라 바로가기';
  b.textContent = 'G';
  b.style.cssText =
    'position:fixed;top:7px;right:12px;z-index:400;width:38px;height:38px;'+
    'border-radius:50%;background:#fff;border:2.5px solid #8b5cf6;color:#7c3aed;'+
    'font-weight:900;font-size:19px;display:flex;align-items:center;justify-content:center;'+
    'text-decoration:none;box-shadow:0 2px 8px rgba(124,58,237,.28);'+
    'font-family:Georgia,\'Times New Roman\',serif;transition:transform .12s;';
  b.addEventListener('mouseenter',()=>b.style.transform='scale(1.1)');
  b.addEventListener('mouseleave',()=>b.style.transform='scale(1)');
  document.body.appendChild(b);
};

/* ════════════════════════════════════════════════════════════
   홈 화면 전용: 💬 질문 · 📸 나의 과제방 (G 버튼 왼쪽 동그라미들)
   ════════════════════════════════════════════════════════════ */
window.GEO_addExtraButtons = function(){
  if(document.getElementById('qnaBtnFloat')) return;
  // G 버튼이 있으면 그 왼쪽부터, 없으면(지오지브라 페이지) 맨 오른쪽부터
  const base = document.getElementById('gBtnFloat') ? 60 : 12;
  const mk = (id, right, emoji, border, shadow, title, onClick)=>{
    const b = document.createElement('button');
    b.id = id; b.title = title; b.textContent = emoji;
    b.style.cssText =
      'position:fixed;top:7px;right:'+right+'px;z-index:400;width:38px;height:38px;'+
      'border-radius:50%;background:#fff;border:2.5px solid '+border+';'+
      'font-size:17px;display:flex;align-items:center;justify-content:center;'+
      'cursor:pointer;box-shadow:0 2px 8px '+shadow+';padding:0;transition:transform .12s;';
    b.addEventListener('mouseenter',()=>b.style.transform='scale(1.1)');
    b.addEventListener('mouseleave',()=>b.style.transform='scale(1)');
    b.addEventListener('click', onClick);
    document.body.appendChild(b);
  };
  mk('galBtnFloat', base,    '📸', '#0d9488', 'rgba(13,148,136,.28)',  '나의 과제방', ()=>window.GEO_openGallery());
  mk('qnaBtnFloat', base+48, '💬', '#f59e0b', 'rgba(245,158,11,.30)', '질문',        ()=>window.GEO_openQnA());
};

/* ── 공용 모달/토스트 (과제방·질문에서 함께 사용) ── */
function gxEsc(s){
  return String(s).replace(/[&<>"']/g, m =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function gxToast(msg){
  let t = document.getElementById('gxToast');
  if(!t){
    t = document.createElement('div'); t.id = 'gxToast';
    t.style.cssText =
      'position:fixed;left:50%;bottom:74px;transform:translateX(-50%);background:#111827;'+
      'color:#fff;font-size:13.5px;padding:10px 18px;border-radius:999px;z-index:2100;'+
      'opacity:0;pointer-events:none;transition:opacity .3s;max-width:88vw;text-align:center;';
    document.body.appendChild(t);
  }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._tm); t._tm = setTimeout(()=>t.style.opacity='0', 3000);
}
function gxModal(){
  let bg = document.getElementById('gxBg');
  if(!bg){
    const css = document.createElement('style');
    css.textContent = `
    #gxBg { position:fixed; inset:0; background:rgba(15,23,42,.5); z-index:2000;
      display:none; align-items:flex-start; justify-content:center; padding:20px; overflow:auto; }
    #gxBg.show { display:flex; }
    #gxPanel { background:#f1f7fb; border-radius:18px; width:100%; max-width:560px;
      margin:auto 0; box-shadow:0 18px 50px rgba(15,23,42,.35); overflow:hidden;
      font-family:'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif; }
    #gxHead { display:flex; align-items:center; gap:8px; padding:15px 18px 12px;
      background:#fff; border-bottom:1px solid #e2e8f0; position:sticky; top:0; z-index:2; }
    #gxHead h2 { font-size:18px; color:#0f172a; flex:1; margin:0; }
    #gxHead .sub { font-size:12px; color:#94a3b8; font-weight:400; }
    #gxClose { border:none; background:#f1f5f9; color:#64748b; width:32px; height:32px;
      border-radius:50%; font-size:15px; font-weight:900; cursor:pointer; flex:none; }
    #gxClose:hover { background:#e2e8f0; color:#334155; }
    #gxBody { padding:16px 18px 20px; max-height:min(72vh,640px); overflow:auto; }
    .gxLoad { text-align:center; color:#64748b; font-size:14px; padding:34px 0; }
    .gxDate { font-size:14px; font-weight:800; color:#0369a1; margin:16px 0 8px; }
    .gxDate:first-child { margin-top:2px; }
    .gxGrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(96px,1fr)); gap:8px; }
    .gxGrid img { width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:11px;
      border:1.5px solid #cbd5e1; background:#e2e8f0; cursor:pointer; display:block; }
    .gxQform { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:13px; }
    .gxQform textarea { width:100%; box-sizing:border-box; height:76px; padding:10px 12px;
      font-size:15px; font-family:inherit; border:1.5px solid #cbd5e1; border-radius:11px;
      outline:none; resize:vertical; background:#fbfdff; }
    .gxQform textarea:focus { border-color:#0284c7; }
    #gxAskBtn { margin-top:9px; width:100%; padding:11px 0; font-size:15px; font-weight:800;
      color:#fff; background:linear-gradient(135deg,#0ea5e9,#6366f1); border:none;
      border-radius:11px; cursor:pointer; font-family:inherit; }
    #gxAskBtn:disabled { opacity:.55; cursor:wait; }
    .gxQcard { background:#fff; border:1px solid #e2e8f0; border-radius:14px;
      padding:13px 15px; margin-top:10px; }
    .gxQtop { display:flex; align-items:flex-start; gap:10px; cursor:pointer; }
    .gxQmain { flex:1; min-width:0; }
    .gxQdate { font-size:11.5px; color:#94a3b8; }
    .gxQtext { font-size:14.5px; font-weight:800; color:#0f172a; margin-top:3px;
      line-height:1.55; word-break:break-all; white-space:pre-wrap; }
    .gxQtgl { flex:none; width:30px; height:30px; border-radius:50%; border:none;
      background:#e0f2fe; color:#0284c7; font-size:17px; font-weight:900; cursor:pointer;
      line-height:1; }
    .gxQcard.open .gxQtgl { background:#0284c7; color:#fff; }
    .gxAns { display:none; border-top:1px solid #e2e8f0; margin-top:11px; padding-top:11px;
      font-size:13.5px; color:#334155; line-height:1.7; word-break:break-all; white-space:pre-wrap; }
    .gxQcard.open .gxAns { display:block; }
    .gxAns.wait { color:#92400e; }
    #gxLightBg { position:fixed; inset:0; background:rgba(2,6,23,.88); z-index:2050;
      display:none; align-items:center; justify-content:center; padding:16px; flex-direction:column; gap:12px; }
    #gxLightBg.show { display:flex; }
    #gxLightBg img { max-width:96vw; max-height:82vh; border-radius:12px; background:#1e293b; }
    #gxLightBg a { color:#7dd3fc; font-size:13px; }
    `;
    document.head.appendChild(css);
    bg = document.createElement('div');
    bg.id = 'gxBg';
    bg.innerHTML = `<div id="gxPanel">
        <div id="gxHead"><h2 id="gxTitle"></h2><button id="gxClose" aria-label="닫기">✕</button></div>
        <div id="gxBody"></div>
      </div>`;
    document.body.appendChild(bg);
    bg.addEventListener('click', e=>{ if(e.target===bg) bg.classList.remove('show'); });
    bg.querySelector('#gxClose').addEventListener('click', ()=>bg.classList.remove('show'));
  }
  return bg;
}

/* ── 📸 나의 과제방: 내가 올린 사진을 날짜별로 ── */
window.GEO_openGallery = async function(){
  const sid  = localStorage.getItem('geoSid')  || '';
  const name = localStorage.getItem('geoName') || '';
  const bg = gxModal();
  bg.querySelector('#gxTitle').innerHTML =
    '📸 나의 과제방 <span class="sub">'+gxEsc(name)+'</span>';
  const body = bg.querySelector('#gxBody');
  body.innerHTML = '<div class="gxLoad">사진을 불러오는 중이에요…</div>';
  bg.classList.add('show');
  try{
    const url = window.GEO_CONFIG.APPS_SCRIPT_URL
      + '?action=myphotos&sid=' + encodeURIComponent(sid)
      + '&name=' + encodeURIComponent(name);
    const r = await (await fetch(url)).json();
    if(!r.ok) throw new Error('server');
    if(!r.items.length){
      body.innerHTML = '<div class="gxLoad">아직 제출한 사진이 없어요.<br>'+
        '활동을 마치고 책갈피(🔖)에서 연습장 사진을 올려 보세요! 📷</div>';
      return;
    }
    // 날짜(MMdd)별로 묶기 — 서버에서 최근 날짜부터 내려옴
    const groups = [];
    r.items.forEach(it=>{
      const g = groups[groups.length-1];
      if(g && g.date === it.date) g.items.push(it);
      else groups.push({ date: it.date, items: [it] });
    });
    body.innerHTML = groups.map(g=>{
      const label = parseInt(g.date.slice(0,2),10) + '월 ' + parseInt(g.date.slice(2),10) + '일';
      return '<div class="gxDate">'+label+'</div><div class="gxGrid">'+
        g.items.map(it=>
          '<img loading="lazy" src="https://drive.google.com/thumbnail?id='+encodeURIComponent(it.id)+
          '&sz=w400" data-id="'+gxEsc(it.id)+'" alt="과제 사진">').join('')+
        '</div>';
    }).join('');
    // 크게 보기
    body.querySelectorAll('.gxGrid img').forEach(img=>{
      img.addEventListener('click', ()=>{
        let lb = document.getElementById('gxLightBg');
        if(!lb){
          lb = document.createElement('div'); lb.id = 'gxLightBg';
          document.body.appendChild(lb);
          lb.addEventListener('click', e=>{ if(e.target.tagName!=='A') lb.classList.remove('show'); });
        }
        const id = img.dataset.id;
        lb.innerHTML = '<img src="https://drive.google.com/thumbnail?id='+encodeURIComponent(id)+
          '&sz=w1600" alt="과제 사진 크게 보기">'+
          '<a href="https://drive.google.com/file/d/'+encodeURIComponent(id)+
          '/view" target="_blank" rel="noopener">드라이브에서 열기 ↗</a>';
        lb.classList.add('show');
      });
    });
  }catch(e){
    body.innerHTML = '<div class="gxLoad">사진을 불러오지 못했어요 😢<br>'+
      '인터넷 연결을 확인하고 다시 열어 주세요.</div>';
  }
};

/* ── 💬 질문: 보내기 + 나의 질문/답변 ── */
window.GEO_openQnA = async function(){
  const sid  = localStorage.getItem('geoSid')  || '';
  const name = localStorage.getItem('geoName') || '';
  const bg = gxModal();
  bg.querySelector('#gxTitle').innerHTML =
    '💬 질문 <span class="sub">궁금한 점을 언제든지 물어보세요</span>';
  const body = bg.querySelector('#gxBody');
  body.innerHTML = `
    <div class="gxQform">
      <textarea id="gxAskText" placeholder="예: 포물선 준선은 왜 필요한가요?"></textarea>
      <button id="gxAskBtn">질문 보내기</button>
    </div>
    <div id="gxQList"><div class="gxLoad">나의 질문을 불러오는 중이에요…</div></div>`;
  bg.classList.add('show');

  async function loadList(){
    const list = body.querySelector('#gxQList');
    try{
      const url = window.GEO_CONFIG.APPS_SCRIPT_URL
        + '?action=myquestions&sid=' + encodeURIComponent(sid)
        + '&name=' + encodeURIComponent(name);
      const r = await (await fetch(url)).json();
      if(!r.ok) throw new Error('server');
      if(!r.items.length){
        list.innerHTML = '<div class="gxLoad">아직 질문한 내용이 없어요.<br>'+
          '위 칸에 첫 질문을 남겨 보세요! ✏️</div>';
        return;
      }
      list.innerHTML = r.items.map((it,i)=>{
        const ans = it.a
          ? '<div class="gxAns">'+gxEsc(it.a)+'</div>'
          : '<div class="gxAns wait">⏳ 선생님이 확인하고 있어요. 답변이 달리면 여기에 보여요!</div>';
        return `<div class="gxQcard" data-i="${i}">
          <div class="gxQtop">
            <div class="gxQmain">
              <div class="gxQdate">${gxEsc(it.t)}${it.a?'':' · 답변 대기'}</div>
              <div class="gxQtext">${gxEsc(it.q)}</div>
            </div>
            <button class="gxQtgl" aria-label="답변 열기">+</button>
          </div>${ans}</div>`;
      }).join('');
      list.querySelectorAll('.gxQcard').forEach(card=>{
        card.querySelector('.gxQtop').addEventListener('click', ()=>{
          card.classList.toggle('open');
          card.querySelector('.gxQtgl').textContent = card.classList.contains('open') ? '−' : '+';
        });
      });
    }catch(e){
      list.innerHTML = '<div class="gxLoad">질문 목록을 불러오지 못했어요 😢<br>'+
        '인터넷 연결을 확인하고 다시 열어 주세요.</div>';
    }
  }
  loadList();

  body.querySelector('#gxAskBtn').addEventListener('click', async ()=>{
    const ta = body.querySelector('#gxAskText');
    const q = ta.value.trim();
    if(!q){ gxToast('질문을 한 줄 적어 주세요 🙂'); return; }
    const btn = body.querySelector('#gxAskBtn');
    btn.disabled = true; btn.textContent = '보내는 중…';
    try{
      const res = await fetch(window.GEO_CONFIG.APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action:'ask', sid, name, text:q.slice(0,500) })
      });
      const r = await res.json();
      if(!r.ok) throw new Error('server');
      ta.value = '';
      gxToast('질문을 보냈어요! 선생님이 답변하면 여기서 볼 수 있어요 ✅');
      body.querySelector('#gxQList').innerHTML = '<div class="gxLoad">새로고침 중…</div>';
      loadList();
    }catch(e){
      gxToast('전송에 실패했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    }
    btn.disabled = false; btn.textContent = '질문 보내기';
  });
};

(function(){
  if(!window.PAGE_ID) return;                       // index.html 에서는 설정만 사용
  if(window.PAGE_ID !== 'geogebra') window.GEO_addGButton();   // G 바로가기 (지오지브라 페이지 제외)
  window.GEO_addExtraButtons();                     // 💬 질문 · 📸 나의 과제방 (모든 페이지)
  const acts = window.GEO_CONFIG.ACTIVITIES;
  const idx = acts.findIndex(a => a.id === window.PAGE_ID);
  if(idx < 0) return;
  const me = acts[idx];
  const prevHref = idx > 0 ? acts[idx-1].href : 'index.html#home';
  const nextHref = idx < acts.length-1 ? acts[idx+1].href : 'index.html#home';

  /* ── 스타일 ── */
  const css = document.createElement('style');
  css.textContent = `
  #gnav {
    flex:none; background:#fff; border-top:1px solid #e2e8f0;
    padding:8px 12px; position:relative; z-index:50;
    display:flex; align-items:center; justify-content:space-between; gap:8px;
  }
  #gnav button, #gnav a {
    padding:10px 16px; font-size:14px; font-weight:800; border-radius:11px; cursor:pointer;
    border:1.5px solid #cbd5e1; background:#fff; color:#475569;
    text-decoration:none; display:inline-flex; align-items:center; gap:5px;
    font-family:inherit; transition:all .12s;
  }
  #gnav a:hover, #gnav button:hover { border-color:#0284c7; color:#0369a1; }
  #gnavHome {
    position:absolute; left:50%; transform:translateX(-50%);
  }
  #gnavRight { display:flex; gap:8px; }
  #gnavMark { background:#fff7ed !important; border-color:#fdba74 !important; padding:10px 14px !important; }
  #gnavMark:hover { border-color:#ea580c !important; }
  #gnav a#gnavNext {
    background:linear-gradient(135deg,#0ea5e9,#6366f1) !important;
    border-color:transparent !important; color:#fff !important;
  }

  #gmodalBg {
    position:fixed; inset:0; background:rgba(15,23,42,.45); z-index:200;
    display:none; align-items:center; justify-content:center; padding:20px;
  }
  #gmodalBg.show { display:flex; }
  #gmodal {
    background:#fff; border-radius:18px; padding:22px; width:100%; max-width:430px;
    box-shadow:0 18px 50px rgba(15,23,42,.3);
    font-family:inherit;
  }
  #gmodal h2 { font-size:19px; color:#0f172a; margin-bottom:8px; }
  #gmodal p { font-size:13.5px; color:#475569; line-height:1.65; margin-bottom:12px; }
  #gmodal textarea {
    width:100%; height:96px; padding:11px 12px; font-size:15px; font-family:inherit;
    border:1.5px solid #cbd5e1; border-radius:11px; outline:none; resize:vertical; background:#fbfdff;
  }
  #gmodal textarea:focus { border-color:#0284c7; }
  .gmBtns { display:flex; gap:9px; margin-top:14px; }
  .gmBtns button {
    flex:1; padding:12px 0; font-size:15px; font-weight:800; border-radius:11px; cursor:pointer;
    border:1.5px solid #cbd5e1; background:#f8fafc; color:#475569; font-family:inherit;
  }
  .gmBtns #gmSend { background:#1d4ed8; border:none; color:#fff; }
  .gmBtns button:disabled { opacity:.55; cursor:wait; }

  .gmPhotoRow { display:flex; align-items:center; gap:10px; margin-top:10px; }
  #gmPhotoBtn {
    display:inline-flex; align-items:center; gap:6px; cursor:pointer;
    padding:9px 13px; font-size:13.5px; font-weight:700; border-radius:10px;
    border:1.5px dashed #94a3b8; color:#475569; background:#f8fafc;
  }
  #gmPhotoBtn:hover { border-color:#0284c7; color:#0369a1; }
  #gmThumbWrap { display:none; gap:10px; flex-wrap:wrap; }
  .gmThumbOne { position:relative; display:inline-block; }
  .gmThumbOne img { height:56px; border-radius:9px; border:1.5px solid #cbd5e1; display:block; }
  .gmDel {
    position:absolute; top:-8px; right:-8px; width:22px; height:22px; border-radius:50%;
    border:none; background:#ef4444; color:#fff; font-size:12px; font-weight:900; cursor:pointer;
    line-height:1;
  }
  #gtoast {
    position:fixed; left:50%; bottom:74px; transform:translateX(-50%);
    background:#111827; color:#fff; font-size:13.5px; padding:10px 18px;
    border-radius:999px; z-index:300; opacity:0; pointer-events:none;
    transition:opacity .3s; max-width:88vw; text-align:center;
  }
  #gtoast.show { opacity:1; }
  `;
  document.head.appendChild(css);

  /* ── 하단 바 ── */
  const bar = document.createElement('div');
  bar.id = 'gnav';
  bar.innerHTML = `
    <a href="${prevHref}" id="gnavPrev">‹ 이전</a>
    <a href="index.html#home" id="gnavHome">홈</a>
    <div id="gnavRight">
      <button id="gnavMark" title="오늘 여기까지 (책갈피)" aria-label="책갈피">
        <svg width="15" height="19" viewBox="0 0 16 20" style="display:block">
          <path d="M2 1 h12 v18 l-6 -5.2 -6 5.2 z" fill="#dc2626"/>
        </svg>
      </button>
      <a href="${nextHref}" id="gnavNext">다음 ›</a>
    </div>`;
  document.body.appendChild(bar);

  /* ── 책갈피 모달 ── */
  const sid  = localStorage.getItem('geoSid')  || '';
  const name = localStorage.getItem('geoName') || '';
  const bg = document.createElement('div');
  bg.id = 'gmodalBg';
  bg.innerHTML = `
    <div id="gmodal">
      <h2>📌 오늘 여기까지!</h2>
      <p>오늘 배운 내용, 한 줄 소감을 선생님께 보낼까요?<br>
         <span style="color:#94a3b8">(${name || '학생'} · ${me.short})</span></p>
      <textarea id="gmText" placeholder="예: 포물선의 활용 용도가 궁금해요!"></textarea>
      <div class="gmPhotoRow">
        <label id="gmPhotoBtn">📷 사진 추가
          <input type="file" id="gmPhotoIn" accept="image/*" capture="environment" hidden>
        </label>
        <div id="gmThumbWrap"></div>
      </div>
      <div class="gmBtns">
        <button id="gmSkip">건너뛰기</button>
        <button id="gmSend">보내기</button>
      </div>
    </div>`;
  document.body.appendChild(bg);

  const toast = document.createElement('div');
  toast.id = 'gtoast';
  document.body.appendChild(toast);
  let toastTimer = null;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 3000);
  }

  function setBookmark(){
    localStorage.setItem('geoBookmark', me.id);
  }
  function markDone(){
    let done = [];
    try{ done = JSON.parse(localStorage.getItem('geoDone')||'[]'); }catch(e){}
    if(!done.includes(me.id)) done.push(me.id);
    localStorage.setItem('geoDone', JSON.stringify(done));
  }

  document.getElementById('gnavMark').addEventListener('click', ()=>{
    bg.classList.add('show');
    document.getElementById('gmText').focus();
  });
  bg.addEventListener('click', e=>{ if(e.target===bg) bg.classList.remove('show'); });

  document.getElementById('gmSkip').addEventListener('click', ()=>{
    setBookmark();
    bg.classList.remove('show');
    showToast(`'오늘 여기까지' 책갈피를 꽂았습니다. 다음에 [${me.short}]부터 열립니다.`);
  });

  /* 사진 선택 → 자동 압축 (긴 변 1600px — 연습장 손글씨가 잘 보이게, 최대 3장) */
  const photos = [];
  const MAXPHOTOS = 3;
  const photoIn = document.getElementById('gmPhotoIn');
  const thumbWrap = document.getElementById('gmThumbWrap');
  const photoBtn = document.getElementById('gmPhotoBtn');
  function renderThumbs(){
    thumbWrap.style.display = photos.length ? 'flex' : 'none';
    thumbWrap.innerHTML = photos.map((d,i)=>
      `<span class="gmThumbOne"><img src="${d}" alt="사진${i+1}">`+
      `<button data-i="${i}" class="gmDel" title="사진 빼기">✕</button></span>`).join('');
    photoBtn.style.display = photos.length >= MAXPHOTOS ? 'none' : 'inline-flex';
    photoBtn.childNodes[0].textContent = photos.length ? `📷 사진 더 추가 (${photos.length}/${MAXPHOTOS})` : '📷 사진 추가 ';
    thumbWrap.querySelectorAll('.gmDel').forEach(b=>
      b.addEventListener('click', ()=>{ photos.splice(+b.dataset.i,1); renderThumbs(); }));
  }
  photoIn.addEventListener('change', ()=>{
    const f = photoIn.files && photoIn.files[0];
    photoIn.value = '';
    if(!f || photos.length >= MAXPHOTOS) return;
    const img = new Image();
    img.onload = ()=>{
      const MAX = 1600;
      const k = Math.min(1, MAX/Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width*k); c.height = Math.round(img.height*k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      photos.push(c.toDataURL('image/jpeg', 0.75));
      renderThumbs();
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(f);
  });

  document.getElementById('gmSend').addEventListener('click', async ()=>{
    const text = document.getElementById('gmText').value.trim();
    if(!text && !photos.length){ showToast('소감 한 줄이나 사진을 담아 주세요 🙂'); return; }
    const btn = document.getElementById('gmSend');
    btn.disabled = true; btn.textContent = photos.length ? '사진 보내는 중…' : '보내는 중…';
    try{
      let r;
      if(photos.length){
        // 사진은 POST (본문에 담아 전송)
        const res = await fetch(window.GEO_CONFIG.APPS_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({ action:'feedback', sid, name, page:me.short,
                                 text:text.slice(0,500), photos })
        });
        r = await res.json();
      } else {
        const url = window.GEO_CONFIG.APPS_SCRIPT_URL
          + '?action=feedback&sid=' + encodeURIComponent(sid)
          + '&name=' + encodeURIComponent(name)
          + '&page=' + encodeURIComponent(me.short)
          + '&text=' + encodeURIComponent(text.slice(0,500));
        const res = await fetch(url);
        r = await res.json();
      }
      if(!r.ok) throw new Error('server');
      setBookmark(); markDone();
      bg.classList.remove('show');
      document.getElementById('gmText').value = '';
      photos.length = 0; renderThumbs();
      showToast('소감을 보냈어요! 책갈피도 꽂았습니다. 홈에서 완료 도장을 확인하세요 ✅');
    }catch(e){
      showToast('전송에 실패했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    }
    btn.disabled = false; btn.textContent = '보내기';
  });
})();


/* ════════════════════════════════════════════════════════════
   메모(굿노트 방식) — 활동 페이지 전용 (index 홈·목차에서는 안 뜸)
   ════════════════════════════════════════════════════════════ */
window.GN_POSTIT_IMG = "data:image/png;base64,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";
/* ════════════════════════════════════════════════════════════
   굿노트(GoodNotes) 방식 메모 v2 — 화면 전체에 바로 필기
   · 포스트잇 버튼(하단 바, 책갈피 왼쪽) → 필기 모드 ON/OFF
   · 도구: 펜 / 형광펜 / 지우개 / 올가미(영역 선택→이동)
     굵기 3단 · 색상(도구별 기억) · 되돌리기/다시하기 · 전체 지우기
   · [저장] → 연습장 페이지로 저장(홈 옆 포스트잇 숫자 배지) + 필기바 닫힘
     배지를 누르면 그 페이지가 열리고 이어서 필기 가능
     저장하지 않은 필기는 페이지를 떠나면 사라짐 (localStorage에는 저장분만)
   · [✕] → 필기바만 닫힘 (필기는 화면에 남지만 저장은 아님)
   · 애플펜슬 팜 리젝션: 펜슬이 한 번 감지되면 손가락 필기 무시
   ════════════════════════════════════════════════════════════ */
(function(){
'use strict';
if(!window.PAGE_ID) return;
var PAGE = window.PAGE_ID;
var SID  = localStorage.getItem('geoSid') || 'guest';
var KEY  = 'geo.gnmemo.v2.' + SID + '.' + PAGE;
var PEN_SEEN_KEY = 'geo.gnmemo.penSeen';
var MAXPAGES = 9;

/* ── 상태 ── */
var pages = [];              // 저장된 연습장 페이지 [{vw, strokes}]
var curPage = -1;            // 지금 열려 있는 페이지 (-1 = 저장 안 된 새 필기)
var strokes = [];            // 현재 화면의 획 (메모리에만; [저장]을 눌러야 보관됨)
var undoStack = [], redoStack = [];
var mode = false;
var tool = 'pen';
var conf = {
  pen: { c:'#1f2937', w:3.5, colors:['#1f2937','#dc2626','#2563eb','#059669'], widths:[2,3.5,6] },
  hl:  { c:'#facc15', w:18,  colors:['#facc15','#4ade80','#f472b6','#60a5fa'], widths:[12,18,26] }
};
var penSeen = localStorage.getItem(PEN_SEEN_KEY) === '1';

/* 올가미 */
var lassoPath = null;        // 그리는 중인 올가미 경로 [x,y,...]
var sel = null;              // {idx:[...], box:{x0,y0,x1,y1}}
var moving = false, moveLast = null;

/* ── 저장된 페이지 불러오기 (배지 표시용) ── */
try{
  var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
  if(saved && saved.v === 2 && Array.isArray(saved.pages)) pages = saved.pages;
}catch(e){}
function persist(){
  try{
    localStorage.setItem(KEY, JSON.stringify({ v:2, pages:pages }));
  }catch(e){}
}
function packStrokes(){
  return { vw: window.innerWidth,
    strokes: strokes.map(function(s){
      return { tool:s.tool, c:s.c, w:Math.round(s.w*10)/10,
               p:s.p.map(function(v){ return Math.round(v*10)/10; }) };
    }) };
}
function unpack(pg){
  var k = window.innerWidth / (pg.vw || window.innerWidth);
  return pg.strokes.map(function(s){
    return { tool:s.tool, c:s.c, w:s.w*k, p:s.p.map(function(v){ return v*k; }) };
  });
}

/* ── 캔버스 ── */
var cv = document.createElement('canvas');
cv.id = 'gnCanvas';
cv.style.cssText = 'position:fixed;inset:0;z-index:900;pointer-events:none;touch-action:none;';
document.body.appendChild(cv);
var ctx = cv.getContext('2d');
var off = document.createElement('canvas');
var offCtx = off.getContext('2d');
var DPR = 1;

var navH = 0, headH = 0;
function resize(){
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  var nav = document.getElementById('gnav');
  var head = document.querySelector('header');
  navH  = nav  ? nav.offsetHeight  : 0;            // 하단 바는 필기 영역에서 제외
  headH = head ? head.offsetHeight : 0;            // 위쪽 제목줄도 필기 영역에서 제외
  var H = Math.max(120, window.innerHeight - navH - headH);
  cv.width  = off.width  = Math.round(window.innerWidth * DPR);
  cv.height = off.height = Math.round(H * DPR);
  cv.style.top = headH + 'px';
  cv.style.width = '100%'; cv.style.height = H + 'px';
  cv.style.bottom = 'auto';
  if(typeof hint !== 'undefined' && hint) hint.style.bottom = (navH + 12) + 'px';
  rebuildOff(); paint();
}
function strokePath(c, s){
  var p = s.p;
  if(p.length < 4){
    c.beginPath();
    c.arc(p[0]*DPR, p[1]*DPR, Math.max(s.w*DPR/2, 1), 0, 6.2832);
    c.fillStyle = s.c;
    c.globalAlpha = s.tool === 'hl' ? 0.38 : 1;
    c.fill(); c.globalAlpha = 1;
    return;
  }
  c.beginPath();
  c.moveTo(p[0]*DPR, p[1]*DPR);
  for(var i = 2; i < p.length - 2; i += 2){
    var mx = (p[i] + p[i+2]) / 2 * DPR, my = (p[i+1] + p[i+3]) / 2 * DPR;
    c.quadraticCurveTo(p[i]*DPR, p[i+1]*DPR, mx, my);
  }
  c.lineTo(p[p.length-2]*DPR, p[p.length-1]*DPR);
  c.strokeStyle = s.c;
  c.lineWidth = s.w * DPR;
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.globalAlpha = s.tool === 'hl' ? 0.38 : 1;
  c.stroke(); c.globalAlpha = 1;
}
function rebuildOff(){
  offCtx.setTransform(1, 0, 0, 1, 0, 0);
  offCtx.clearRect(0, 0, off.width, off.height);
  offCtx.translate(0, -headH * DPR);               // 좌표는 화면(client) 기준, 캔버스는 제목줄 아래부터
  strokes.forEach(function(s){ strokePath(offCtx, s); });
}
var cur = null;
function paint(){
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.drawImage(off, 0, 0);
  ctx.translate(0, -headH * DPR);
  if(cur) strokePath(ctx, cur);
  if(lassoPath && lassoPath.length >= 4){
    ctx.save();
    ctx.setLineDash([6*DPR, 5*DPR]);
    ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1.6*DPR;
    ctx.beginPath();
    ctx.moveTo(lassoPath[0]*DPR, lassoPath[1]*DPR);
    for(var i = 2; i < lassoPath.length; i += 2) ctx.lineTo(lassoPath[i]*DPR, lassoPath[i+1]*DPR);
    ctx.stroke();
    ctx.restore();
  }
  if(sel){
    var b = sel.box, pad = 8;
    ctx.save();
    ctx.setLineDash([7*DPR, 5*DPR]);
    ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1.8*DPR;
    ctx.fillStyle = 'rgba(2,132,199,.06)';
    var x = (b.x0-pad)*DPR, y = (b.y0-pad)*DPR, w = (b.x1-b.x0+2*pad)*DPR, h = (b.y1-b.y0+2*pad)*DPR;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  }
}
window.addEventListener('resize', function(){ resize(); });
resize();

/* ── 스타일 ── */
var css = document.createElement('style');
css.textContent =
  /* 필기바: 상단 중앙 플로팅 팝업 (⋮⋮ 손잡이로 끌어서 이동 가능) */
  '#gnBar{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:1000;display:none;width:max-content;'+
  'align-items:center;gap:3px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;'+
  'padding:5px 8px;box-shadow:0 6px 24px rgba(15,23,42,.22);max-width:96vw;flex-wrap:wrap;justify-content:center;'+
  "font-family:'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif;}"+
  '#gnBar.show{display:flex;}'+
  '#gnGrip{cursor:grab;touch-action:none;color:#cbd5e1;display:flex;align-items:center;'+
  'padding:2px 4px 2px 2px;border-radius:8px;align-self:stretch;}'+
  '#gnGrip:hover{color:#94a3b8;background:#f8fafc;}'+
  '#gnGrip:active{cursor:grabbing;}'+
  '#gnBar .sep{width:1px;height:24px;background:#e2e8f0;margin:0 4px;}'+
  '#gnBar button{border:none;background:none;cursor:pointer;border-radius:9px;padding:0;'+
  'width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:#475569;}'+
  '#gnBar button:hover{background:#f1f5f9;}'+
  '#gnBar button.on{background:#e0f2fe;}'+
  '#gnBar button.on svg .tint{stroke:#0284c7;}'+
  '#gnBar .dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;}'+
  '#gnBar .dot i{border-radius:50%;background:#64748b;display:block;}'+
  '#gnBar .dot.on{box-shadow:0 0 0 2px #0284c7 inset;}'+
  '#gnBar .sw{width:24px;height:24px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1.5px #e2e8f0;}'+
  '#gnBar .sw.on{box-shadow:0 0 0 2.5px #0284c7;}'+
  '#gnBar #gnSave{background:#0284c7 !important;color:#fff !important;border-radius:10px;width:auto !important;'+
  'padding:0 13px !important;font-weight:800;font-size:13.5px;font-family:inherit;}'+
  '#gnBar #gnSave:hover{background:#0369a1 !important;}'+
  '#gnBar #gnClose{background:#f1f5f9 !important;color:#64748b;font-weight:900;font-size:15px;border-radius:10px;}'+
  '#gnBar #gnClose:hover{background:#e2e8f0 !important;}'+
  '#gnHint{position:fixed;bottom:114px;left:14px;z-index:1000;display:none;'+
  'background:rgba(17,24,39,.85);color:#fff;font-size:12px;padding:6px 14px;border-radius:999px;pointer-events:none;}'+
  '#gnBtn{padding:4px 8px !important;}'+
  '#gnBtn img{height:26px;display:block;}'+
  /* 연습장 페이지 배지 (포스트잇 버튼 왼쪽) */
  '#gnPages{display:flex;gap:5px;align-items:center;margin-right:2px;}'+
  /* 휴지통 드롭 영역 (끌기 중에만 표시) */
  '#gnTrashZone{position:fixed;left:50%;transform:translateX(-50%);z-index:1100;display:none;'+
  'flex-direction:column;align-items:center;justify-content:center;width:160px;height:66px;'+
  'border:2.5px dashed #f87171;background:rgba(254,242,242,.96);border-radius:18px;'+
  'color:#dc2626;font-size:12px;font-weight:800;gap:3px;pointer-events:none;transition:transform .1s;'+
  "font-family:'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif;}"+
  '#gnTrashZone.show{display:flex;}'+
  '#gnTrashZone.hot{background:#fecaca;border-style:solid;transform:translateX(-50%) scale(1.13);}'+
  '#gnGhost{position:fixed;z-index:1200;pointer-events:none;opacity:.85;transform:translate(-50%,-50%) scale(1.15);}'+
  '#gnav .gnPage, .gnPage{position:relative;width:27px;height:27px;border:none !important;cursor:pointer;'+
  'padding:0 !important;min-width:27px;'+
  'background:linear-gradient(160deg,#fde047,#facc15 60%,#eab308) !important;'+
  'border-radius:2px 2px 8px 2px !important;'+
  'box-shadow:0 2px 5px rgba(120,90,0,.35);font-weight:900;font-size:13px;color:#854d0e !important;'+
  'font-family:inherit;display:flex;align-items:center;justify-content:center;transition:transform .12s;}'+
  '#gnav .gnPage:hover, .gnPage:hover{transform:scale(1.12);}'+
  '.gnPage.on{outline:2.5px solid #0284c7;outline-offset:1.5px;}'+
  '.gnPage::after{content:"";position:absolute;right:0;bottom:0;width:8px;height:8px;'+
  'background:linear-gradient(315deg,#fff 45%,#ca8a04 50%);border-radius:8px 0 8px 0;}';
document.head.appendChild(css);

var ICON = {
  pen: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path class="tint" d="M4 20l1.2-4.2L16.4 4.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8 4 20z" stroke="#475569" stroke-width="1.9" stroke-linejoin="round"/></svg>',
  hl:  '<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path class="tint" d="M9 15l-3 3H4v-2l3-3m2 2l8.5-8.5a1.8 1.8 0 0 0-2.5-2.5L7 12.5M9 15l-2-2" stroke="#475569" stroke-width="1.9" stroke-linejoin="round"/><path d="M4.5 21h15" stroke="#facc15" stroke-width="2.6" stroke-linecap="round"/></svg>',
  er:  '<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path class="tint" d="M8.5 18.5H5.9L3.6 16a1.8 1.8 0 0 1 0-2.5L12.8 4a1.8 1.8 0 0 1 2.5 0l4.4 4.4a1.8 1.8 0 0 1 0 2.5l-7.5 7.6h-3.7z" stroke="#475569" stroke-width="1.9" stroke-linejoin="round"/><path d="M8 9l6.7 6.8" stroke="#475569" stroke-width="1.9"/><path d="M11 21h9" stroke="#475569" stroke-width="1.9" stroke-linecap="round"/></svg>',
  lasso:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path class="tint" d="M12 4.5c4.7 0 8 2.2 8 5.2 0 2.6-2.5 4.6-6.2 5.1M12 4.5C7.3 4.5 4 6.7 4 9.7c0 2.2 1.8 4 4.6 4.8" stroke="#475569" stroke-width="1.9" stroke-linecap="round" stroke-dasharray="3.2 2.6"/><path class="tint" d="M8.6 14.5c1 .3 1.6 1 1.6 2 0 1.6-1.5 2.1-2.7 3.1-.8.7-1 1.6-.8 2.4" stroke="#475569" stroke-width="1.9" stroke-linecap="round"/><circle cx="8.9" cy="16.4" r="1.7" stroke="#475569" stroke-width="1.6"/></svg>',
  undo:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 5L3.5 9.5 8 14" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 9.5h10a6 6 0 0 1 0 12h-3" stroke="#475569" stroke-width="2" stroke-linecap="round"/></svg>',
  redo:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 5l4.5 4.5L16 14" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 9.5H10a6 6 0 0 0 0 12h3" stroke="#475569" stroke-width="2" stroke-linecap="round"/></svg>',
  trash:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9.5 7V4.8A1 1 0 0 1 10.5 4h3a1 1 0 0 1 1 1V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5" stroke="#475569" stroke-width="1.9" stroke-linecap="round"/></svg>'
};

var bar = document.createElement('div');
bar.id = 'gnBar';
bar.innerHTML =
  '<span id="gnGrip" title="끌어서 이동">'+
    '<svg width="10" height="20" viewBox="0 0 10 20" fill="currentColor">'+
    '<circle cx="3" cy="4" r="1.6"/><circle cx="7" cy="4" r="1.6"/>'+
    '<circle cx="3" cy="10" r="1.6"/><circle cx="7" cy="10" r="1.6"/>'+
    '<circle cx="3" cy="16" r="1.6"/><circle cx="7" cy="16" r="1.6"/></svg>'+
  '</span>'+
  '<button id="gnT_pen" title="펜">'+ICON.pen+'</button>'+
  '<button id="gnT_hl" title="형광펜">'+ICON.hl+'</button>'+
  '<button id="gnT_er" title="지우개 (획 단위)">'+ICON.er+'</button>'+
  '<button id="gnT_lasso" title="올가미 (영역 선택·이동)">'+ICON.lasso+'</button>'+
  '<span class="sep"></span><span id="gnDots" style="display:flex;gap:2px;align-items:center"></span>'+
  '<span class="sep"></span><span id="gnSws" style="display:flex;gap:6px;align-items:center"></span>'+
  '<span class="sep"></span>'+
  '<button id="gnUndo" title="되돌리기">'+ICON.undo+'</button>'+
  '<button id="gnRedo" title="다시하기">'+ICON.redo+'</button>'+
  '<button id="gnTrash" title="전체 지우기">'+ICON.trash+'</button>'+
  '<span class="sep"></span>'+
  '<button id="gnSave" title="연습장 페이지로 저장">저장</button>'+
  '<button id="gnClose" title="닫기 (저장하지 않고 접기)">✕</button>';
document.body.appendChild(bar);
/* 필기바 드래그 이동 (위치는 기기에 기억) */
var barPos = null;
try{ barPos = JSON.parse(localStorage.getItem('geo.gnmemo.barPos') || 'null'); }catch(e){}
function applyBarPos(){
  if(!barPos){
    bar.style.transform = 'translateX(-50%)';
    bar.style.left = '50%'; bar.style.top = '8px';
    return;
  }
  var w = bar.offsetWidth || 540, h = bar.offsetHeight || 46;
  var x = Math.min(Math.max(barPos.x, 4), window.innerWidth  - w - 4);
  var y = Math.min(Math.max(barPos.y, 4), window.innerHeight - h - 4);
  bar.style.transform = 'none';
  bar.style.left = x + 'px'; bar.style.top = y + 'px';
}
(function(){
  var grip = bar.querySelector('#gnGrip');
  var gid = null, offX = 0, offY = 0;
  grip.addEventListener('pointerdown', function(e){
    e.preventDefault();
    gid = e.pointerId;
    var r = bar.getBoundingClientRect();
    offX = e.clientX - r.left; offY = e.clientY - r.top;
    try{ grip.setPointerCapture(gid); }catch(err){}
  });
  grip.addEventListener('pointermove', function(e){
    if(e.pointerId !== gid) return;
    barPos = { x: e.clientX - offX, y: e.clientY - offY };
    applyBarPos();
  });
  function done(e){
    if(e.pointerId !== gid) return;
    gid = null;
    try{ localStorage.setItem('geo.gnmemo.barPos', JSON.stringify(barPos)); }catch(err){}
  }
  grip.addEventListener('pointerup', done);
  grip.addEventListener('pointercancel', done);
})();
window.addEventListener('resize', function(){ if(mode) applyBarPos(); });

var hint = document.createElement('div');
hint.id = 'gnHint';
document.body.appendChild(hint);
var hintTm = null;
function showHint(t){
  hint.textContent = t; hint.style.display = 'block';
  clearTimeout(hintTm); hintTm = setTimeout(function(){ hint.style.display = 'none'; }, 2400);
}

/* ── 휴지통 드롭 영역 (배지·올가미 선택을 끌 때 나타남) ── */
var trashZone = document.createElement('div');
trashZone.id = 'gnTrashZone';
trashZone.innerHTML = ICON.trash + '<span>여기로 끌면 삭제</span>';
document.body.appendChild(trashZone);
function showTrash(on){
  trashZone.classList.toggle('show', !!on);
  trashZone.classList.remove('hot');
  if(on) trashZone.style.bottom = (navH + 14) + 'px';
}
function inTrash(x, y){
  if(!trashZone.classList.contains('show')) return false;
  var r = trashZone.getBoundingClientRect();
  return x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 12 && y <= r.bottom + 12;
}
function hotTrash(x, y){ trashZone.classList.toggle('hot', inTrash(x, y)); }

function clearSel(){ sel = null; lassoPath = null; moving = false; }
function renderBar(){
  ['pen','hl','er','lasso'].forEach(function(t){
    document.getElementById('gnT_' + t).classList.toggle('on', tool === t);
  });
  var dots = document.getElementById('gnDots'), sws = document.getElementById('gnSws');
  if(tool === 'er' || tool === 'lasso'){ dots.innerHTML = ''; sws.innerHTML = ''; return; }
  var cf = conf[tool];
  dots.innerHTML = cf.widths.map(function(w, i){
    var d = tool === 'hl' ? 6 + i*4 : 4 + i*3.5;
    return '<button class="dot'+(w === cf.w ? ' on' : '')+'" data-w="'+w+'" title="굵기">'+
           '<i style="width:'+d+'px;height:'+d+'px"></i></button>';
  }).join('');
  sws.innerHTML = cf.colors.map(function(c){
    return '<button class="sw'+(c === cf.c ? ' on' : '')+'" data-c="'+c+'" style="background:'+c+'" title="색"></button>';
  }).join('');
  dots.querySelectorAll('.dot').forEach(function(b){
    b.addEventListener('click', function(){ cf.w = +b.dataset.w; renderBar(); });
  });
  sws.querySelectorAll('.sw').forEach(function(b){
    b.addEventListener('click', function(){ cf.c = b.dataset.c; renderBar(); });
  });
}
['pen','hl','er','lasso'].forEach(function(t){
  document.getElementById('gnT_' + t).addEventListener('click', function(){
    tool = t; clearSel(); renderBar(); paint();
    if(t === 'lasso') showHint('옮길 부분을 펜슬로 빙 둘러 보세요');
  });
});

function snapshot(){
  undoStack.push(strokes.map(function(s){ return { tool:s.tool, c:s.c, w:s.w, p:s.p.slice() }; }));
  if(undoStack.length > 60) undoStack.shift();
  redoStack.length = 0;
}
document.getElementById('gnUndo').addEventListener('click', function(){
  if(!undoStack.length) return;
  redoStack.push(strokes);
  strokes = undoStack.pop();
  clearSel(); rebuildOff(); paint();
});
document.getElementById('gnRedo').addEventListener('click', function(){
  if(!redoStack.length) return;
  undoStack.push(strokes);
  strokes = redoStack.pop();
  clearSel(); rebuildOff(); paint();
});
var trashArm = false, trashTm = null;
document.getElementById('gnTrash').addEventListener('click', function(){
  if(!trashArm){
    trashArm = true; showHint('한 번 더 누르면 화면의 필기를 모두 지웁니다');
    clearTimeout(trashTm); trashTm = setTimeout(function(){ trashArm = false; }, 2500);
    return;
  }
  trashArm = false; snapshot(); strokes = []; clearSel(); rebuildOff(); paint();
});
document.getElementById('gnClose').addEventListener('click', function(){ setMode(false); });

/* ── 저장 로직 ──
   saveCurrent(): 지금 필기를 연습장에 보관 (열려 있던 쪽이면 갱신, 아니면 새 쪽)
   closeWriting(save): (저장하고) 화면을 비우고 필기바를 닫음 */
function saveCurrent(){
  if(!strokes.length) return -1;                  // 저장할 게 없음
  if(curPage < 0){
    if(pages.length >= MAXPAGES) return -2;       // 연습장 가득 참
    pages.push(packStrokes());
    curPage = pages.length - 1;
  } else {
    pages[curPage] = packStrokes();
  }
  persist();
  return curPage;
}
function closeWriting(save){
  var r = save ? saveCurrent() : -1;
  strokes = []; cur = null; curPage = -1;
  undoStack.length = 0; redoStack.length = 0;
  clearSel(); rebuildOff(); paint();
  setMode(false);
  renderBadges();
  return r;
}
document.getElementById('gnSave').addEventListener('click', function(){
  if(!strokes.length){ showHint('저장할 필기가 없어요 ✏️'); return; }
  var r = closeWriting(true);
  if(r === -2) showHint('연습장이 가득 찼어요 (최대 ' + MAXPAGES + '장)');
  else showHint('연습장 ' + (r+1) + '쪽에 저장했어요! 홈 옆 포스트잇 ' + (r+1) + '을 누르면 다시 열려요 📒');
});

/* ── 연습장 배지 (포스트잇 버튼 왼쪽, 숫자 포스트잇) ── */
function deletePage(i){
  pages.splice(i, 1); persist();
  if(curPage === i){
    strokes = []; cur = null; curPage = -1;
    undoStack.length = 0; redoStack.length = 0;
    clearSel(); rebuildOff(); paint();
    if(mode) setMode(false);
  } else if(curPage > i){
    curPage--;
  }
  renderBadges();
  showHint('연습장 한 쪽을 삭제했어요 🗑');
}
function renderBadges(){
  var nav = document.getElementById('gnav');
  if(!nav) return;
  var box = document.getElementById('gnPages');
  if(!box){
    box = document.createElement('div');
    box.id = 'gnPages';
    var btn = document.getElementById('gnBtn');
    if(btn && btn.parentNode === document.getElementById('gnavRight') || (btn && btn.parentNode))
      btn.parentNode.insertBefore(box, btn);        // 포스트잇 버튼 바로 왼쪽
    else nav.appendChild(box);
  }
  box.innerHTML = pages.map(function(_, i){
    return '<button class="gnPage'+(i === curPage ? ' on' : '')+'" data-i="'+i+'" title="연습장 '+(i+1)+'쪽">'+(i+1)+'</button>';
  }).join('');
  box.querySelectorAll('.gnPage').forEach(function(b){
    var i = +b.dataset.i;
    // 탭: 열기 / (열려 있으면) 자동 저장 후 닫기 — 끌기: 휴지통으로 삭제
    var startX = 0, startY = 0, dragging = false, ghost = null, pid = null;
    b.addEventListener('pointerdown', function(e){
      pid = e.pointerId; startX = e.clientX; startY = e.clientY; dragging = false;
      try{ b.setPointerCapture(pid); }catch(err){}
    });
    b.addEventListener('pointermove', function(e){
      if(e.pointerId !== pid) return;
      if(!dragging){
        var dx = e.clientX - startX, dy = e.clientY - startY;
        if(dx*dx + dy*dy < 100) return;             // 10px 이상 끌면 드래그로 판단
        dragging = true;
        ghost = b.cloneNode(true);
        ghost.id = 'gnGhost'; ghost.classList.add('gnPage');
        document.body.appendChild(ghost);
        showTrash(true);
      }
      ghost.style.left = e.clientX + 'px';
      ghost.style.top  = e.clientY + 'px';
      hotTrash(e.clientX, e.clientY);
    });
    function finish(e){
      if(e.pointerId !== pid) return;
      pid = null;
      if(dragging){
        var drop = inTrash(e.clientX, e.clientY);
        if(ghost){ ghost.remove(); ghost = null; }
        showTrash(false);
        if(drop){ deletePage(i); return; }
        dragging = false;
        return;
      }
      // 그냥 탭
      if(mode && curPage === i){                    // 열려 있는 쪽 다시 탭 = 저장하고 닫기
        var r = closeWriting(true);
        if(r >= 0) showHint('연습장 ' + (r+1) + '쪽에 저장했어요 📒');
      } else {
        openPage(i);
      }
    }
    b.addEventListener('pointerup', finish);
    b.addEventListener('pointercancel', function(e){
      if(e.pointerId !== pid) return;
      pid = null;
      if(ghost){ ghost.remove(); ghost = null; }
      showTrash(false); dragging = false;
    });
  });
}
function openPage(i){
  if(!pages[i]) return;
  if(mode && strokes.length) saveCurrent();        // 쓰던 필기는 자동 저장하고 넘어감
  strokes = unpack(pages[i]);
  curPage = i;
  undoStack.length = 0; redoStack.length = 0;
  clearSel(); rebuildOff(); paint();
  setMode(true);
  renderBadges();
}

/* ── 포스트잇 버튼 (하단 바, 책갈피 왼쪽) ── */
function addBtn(){
  var mark = document.getElementById('gnavMark');
  var btn = document.createElement('button');
  btn.id = 'gnBtn';
  btn.title = '메모 (화면에 바로 필기)';
  btn.innerHTML = '<img src="' + (window.GN_POSTIT_IMG || '') + '" alt="메모">';
  if(mark && mark.parentNode){
    mark.parentNode.insertBefore(btn, mark);
  } else {
    btn.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:400;background:#fff;'+
      'border:1.5px solid #cbd5e1;border-radius:11px;padding:6px 9px;cursor:pointer;';
    document.body.appendChild(btn);
  }
  // 필기 중에 이전·홈·다음·책갈피를 누르면 자동 저장
  ['gnavPrev','gnavNext','gnavHome','gnavMark'].forEach(function(id){
    var el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('click', function(){
      if(!mode) return;
      if(id === 'gnavMark') closeWriting(true);   // 책갈피 모달 열기 전에 저장하고 닫기
      else saveCurrent();                         // 페이지 이동 직전에 저장 (localStorage는 즉시 기록됨)
    }, true);
  });
  btn.addEventListener('click', function(){
    if(mode){                                     // 필기 중 포스트잇 = 자동 저장하고 닫기
      var r = closeWriting(true);
      if(r >= 0) showHint('연습장 ' + (r+1) + '쪽에 저장했어요 📒');
    } else {
      setMode(true);
    }
  });
  renderBadges();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addBtn);
else addBtn();

function setMode(on){
  mode = on;
  bar.classList.toggle('show', on);
  document.body.classList.toggle('gnWriting', on);
  cv.style.pointerEvents = on ? 'auto' : 'none';
  resize();
  if(on){
    applyBarPos();
    renderBar();
    if(!strokes.length && curPage < 0)
      showHint('화면 아무 곳에나 바로 써 보세요 ✏️ (저장을 눌러야 연습장에 남아요)');
  } else {
    hint.style.display = 'none';
    clearSel(); paint();
  }
  renderBadges();
}

/* ── 올가미 계산 ── */
function pointInPoly(px, py, poly){
  var inside = false;
  for(var i = 0, j = poly.length - 2; i < poly.length; j = i, i += 2){
    var xi = poly[i], yi = poly[i+1], xj = poly[j], yj = poly[j+1];
    if((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function lassoSelect(poly){
  var idx = [], x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  strokes.forEach(function(s, i){
    var inCnt = 0, tot = 0;
    for(var j = 0; j < s.p.length; j += 4){       // 두 점 걸러 샘플
      tot++;
      if(pointInPoly(s.p[j], s.p[j+1], poly)) inCnt++;
    }
    if(tot && inCnt / tot >= 0.5){
      idx.push(i);
      for(var j2 = 0; j2 < s.p.length; j2 += 2){
        if(s.p[j2] < x0) x0 = s.p[j2];
        if(s.p[j2] > x1) x1 = s.p[j2];
        if(s.p[j2+1] < y0) y0 = s.p[j2+1];
        if(s.p[j2+1] > y1) y1 = s.p[j2+1];
      }
    }
  });
  return idx.length ? { idx:idx, box:{x0:x0, y0:y0, x1:x1, y1:y1} } : null;
}
function inSelBox(x, y){
  if(!sel) return false;
  var b = sel.box, pad = 14;
  return x >= b.x0 - pad && x <= b.x1 + pad && y >= b.y0 - pad && y <= b.y1 + pad;
}
function moveSel(dx, dy){
  sel.idx.forEach(function(i){
    var p = strokes[i].p;
    for(var j = 0; j < p.length; j += 2){ p[j] += dx; p[j+1] += dy; }
  });
  sel.box.x0 += dx; sel.box.x1 += dx; sel.box.y0 += dy; sel.box.y1 += dy;
}

/* ── 필기 입력 (Pointer Events + 팜 리젝션) ── */
var drawId = null;
function pt(e){ return [e.clientX, e.clientY]; }
function allowed(e){
  if(e.pointerType === 'pen'){
    if(!penSeen){ penSeen = true; try{ localStorage.setItem(PEN_SEEN_KEY, '1'); }catch(err){} }
    return true;
  }
  if(e.pointerType === 'touch') return !penSeen;
  return true;
}
function eraseAt(x, y){
  var R = 14, hit = false;
  for(var i = strokes.length - 1; i >= 0; i--){
    var p = strokes[i].p, r = R + strokes[i].w / 2;
    for(var j = 0; j < p.length; j += 2){
      var dx = p[j] - x, dy = p[j+1] - y;
      if(dx*dx + dy*dy < r*r){
        if(!hit){ snapshot(); hit = true; }
        strokes.splice(i, 1);
        break;
      }
    }
  }
  if(hit){ rebuildOff(); paint(); }
}
cv.addEventListener('pointerdown', function(e){
  if(!mode || drawId !== null || !allowed(e)) return;
  e.preventDefault();
  drawId = e.pointerId;
  try{ cv.setPointerCapture(e.pointerId); }catch(err){}
  var q = pt(e);
  if(tool === 'lasso'){
    if(sel && inSelBox(q[0], q[1])){        // 선택 영역 잡고 이동 시작
      moving = true; moveLast = q; snapshot();
      showTrash(true);                      // 끌기 시작 → 휴지통 등장
    } else {
      clearSel();
      lassoPath = [q[0], q[1]];
    }
    paint();
    return;
  }
  if(tool === 'er'){ eraseAt(q[0], q[1]); return; }
  snapshot();
  var cf = conf[tool];
  cur = { tool:tool, c:cf.c, w:cf.w, p:[q[0], q[1]] };
  paint();
});
cv.addEventListener('pointermove', function(e){
  if(!mode || e.pointerId !== drawId) return;
  e.preventDefault();
  var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  if(tool === 'lasso'){
    var q = pt(e);
    if(moving && sel){
      moveSel(q[0] - moveLast[0], q[1] - moveLast[1]);
      moveLast = q;
      hotTrash(q[0], q[1]);
      rebuildOff(); paint();
    } else if(lassoPath){
      evs.forEach(function(ev){ var r = pt(ev); lassoPath.push(r[0], r[1]); });
      paint();
    }
    return;
  }
  if(tool === 'er'){
    evs.forEach(function(ev){ var q2 = pt(ev); eraseAt(q2[0], q2[1]); });
    return;
  }
  if(!cur) return;
  var movedAny = false;
  evs.forEach(function(ev){
    var q3 = pt(ev);
    var n = cur.p.length;
    var dx = q3[0] - cur.p[n-2], dy = q3[1] - cur.p[n-1];
    if(dx*dx + dy*dy >= 1.69){ cur.p.push(q3[0], q3[1]); movedAny = true; }
  });
  if(movedAny) paint();
});
function up(e){
  if(e.pointerId !== drawId) return;
  drawId = null;
  if(tool === 'lasso'){
    if(moving){
      moving = false; moveLast = null;
      var drop = inTrash(e.clientX, e.clientY);
      showTrash(false);
      if(drop && sel){                       // 휴지통에 놓으면 선택한 필기 삭제
        var selIdx = sel.idx;
        strokes = strokes.filter(function(_, i){ return selIdx.indexOf(i) < 0; });
        clearSel(); rebuildOff();
        showHint('선택한 필기를 삭제했어요 🗑');
      }
    }
    else if(lassoPath){
      if(lassoPath.length >= 8){
        sel = lassoSelect(lassoPath);
        if(!sel) showHint('둘러싼 안에 필기가 없어요');
        else showHint('파란 상자를 끌면 통째로 이동해요');
      } else {
        clearSel();                          // 짧은 탭 = 선택 해제
      }
      lassoPath = null;
    }
    paint();
    return;
  }
  if(cur){
    strokes.push(cur);
    strokePath(offCtx, cur);
    cur = null;
    paint();
  }
}
cv.addEventListener('pointerup', up);
cv.addEventListener('pointercancel', up);

/* 질문(💬)·과제방(📸)을 열면 메모는 자동 저장하고 꺼짐 */
document.addEventListener('click', function(e){
  if(!mode || !e.target || !e.target.closest) return;
  if(e.target.closest('#qnaBtnFloat') || e.target.closest('#galBtnFloat')){
    var r = closeWriting(true);
    if(r >= 0) showHint('연습장 ' + (r+1) + '쪽에 저장했어요 📒');
  }
}, true);

/* 테스트/디버그용 */
window.__gn = function(){
  return { n: strokes.length, pages: pages.length, curPage: curPage,
           sel: sel ? sel.idx.slice() : null,
           first: strokes[0] ? strokes[0].p.slice(0, 2) : null };
};
})();
