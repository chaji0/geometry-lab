'use strict';
/* ════════════════════════════════════════════════════════════
   기하 탐구실 공통 설정 + 활동 페이지 하단 내비게이션
   - index.html 과 모든 활동 페이지가 이 파일 하나를 공유합니다.
   - 활동 페이지에서는 <script>window.PAGE_ID='...'</script> 를
     먼저 선언한 뒤 이 파일을 불러오면 하단 바가 자동으로 생깁니다.
   ════════════════════════════════════════════════════════════ */
window.GEO_CONFIG = {
  VERSION: "v7",                    // ★ 업로드할 때마다 하나씩 올려 주세요 (v6, v7, …)
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

(function(){
  if(!window.PAGE_ID) return;                       // index.html 에서는 설정만 사용
  if(window.PAGE_ID !== 'geogebra') window.GEO_addGButton();   // G 바로가기 (지오지브라 페이지 제외)
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
