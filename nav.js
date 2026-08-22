'use strict';
/* ════════════════════════════════════════════════════════════
   기하 탐구실 공통 설정 + 활동 페이지 하단 내비게이션
   - index.html 과 모든 활동 페이지가 이 파일 하나를 공유합니다.
   - 활동 페이지에서는 <script>window.PAGE_ID='...'</script> 를
     먼저 선언한 뒤 이 파일을 불러오면 하단 바가 자동으로 생깁니다.
   ════════════════════════════════════════════════════════════ */
window.GEO_CONFIG = {
  VERSION: "v9",                    // ★ 업로드할 때마다 하나씩 올려 주세요 (v9, v10, …)
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
      'color:#fff;font-size:13.5px;padding:10px 18px;border-radius:999px;z-index:600;'+
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
    #gxBg { position:fixed; inset:0; background:rgba(15,23,42,.5); z-index:500;
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
    #gxLightBg { position:fixed; inset:0; background:rgba(2,6,23,.88); z-index:550;
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
