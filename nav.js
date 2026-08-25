'use strict';
/* ════════════════════════════════════════════════════════════
   기하 탐구실 공통 설정 + 활동 페이지 하단 내비게이션
   - index.html 과 모든 활동 페이지가 이 파일 하나를 공유합니다.
   - 활동 페이지에서는 <script>window.PAGE_ID='...'</script> 를
     먼저 선언한 뒤 이 파일을 불러오면 하단 바가 자동으로 생깁니다.
   ════════════════════════════════════════════════════════════ */
window.GEO_CONFIG = {
  VERSION: "v1.17",                 // ★ 1단원=v1.x, 2단원=v2.x, 3단원=v3.x — 업로드마다 뒷자리 +1 (v1.11, v1.12, …)
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
    { id:'ellipse',  href:'ellipse.html',  icon:'🧵', short:'타원그리기',
      title:'타원 그리기 — 실과 자취',
      desc:'못 2개에 건 실로 직접 타원을 그리고, 공학 도구 자취 활동으로 왜 타원이 되는지 확인해요.' },
    { id:'econcept', href:'ellipse-concept.html', icon:'📙', short:'타원개념',
      title:'타원 개념 정리',
      desc:'a, b 값을 움직이며 타원의 방정식과 초점·꼭짓점·장축·단축이 어떻게 변하는지 확인해요.' },
    { id:'eapply',   href:'ellipse-apply.html', icon:'🪐', short:'타원활용',
      title:'타원의 활용 — 케플러 궤도',
      desc:'소행성 1566 이카루스의 타원 궤도 — 우주에서 케플러 법칙을 눈으로 확인해요. (인터넷 연결 필요)' },
    { id:'hdraw',    href:'hyperbola.html', icon:'📄', short:'쌍곡선그리기',
      title:'쌍곡선 그리기 — 종이접기',
      desc:'원 위의 점이 F′에 닿도록 접고 또 접으면 — F′이 원 안이면 타원, 원 밖이면 쌍곡선이 나타나요!' },
    { id:'hconcept', href:'hyperbola-concept.html', icon:'📕', short:'쌍곡선개념',
      title:'쌍곡선 개념 정리',
      desc:'a, b 값을 움직이며 쌍곡선의 방정식과 초점·꼭짓점·주축·점근선이 어떻게 변하는지 확인해요.' },
    { id:'happly',   href:'hyperbola-apply.html', icon:'🚢', short:'쌍곡선활용',
      title:'쌍곡선의 활용 — 전파로 배를 찾아라',
      desc:'두 기지국 전파의 시간차로 배의 위치를 찾는 교과서 문제를 3D 바다와 냉각탑까지 — 위치 찾기 Step 1~4!' },
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

/* ════════════════════════════════════════════════════════════
   완료 도장 트래커 — 책갈피와 별개! 페이지별 탐구 과제를 모두 수행하면
   홈 화면에 완료 도장이 찍힌다. 각 페이지가 GEO_task('키')를 호출.
   ════════════════════════════════════════════════════════════ */
window.GEO_TASKS = {
  conic:    ['tilt','cut','proof'],                    // 기울기 조절·단면 확인·증명으로 이어가기
  folding:  ['autoBtn','curveBtn','whyBtn','clearBtn'],// 활동 버튼 4개 모두 눌러보기
  concept:  ['slider','answer'],                       // p 슬라이더 + 질문 답 채우기
  apply:    ['solar','head'],                          // 태양열 끓이기 성공 + 평행광 만들기 성공
  ellipse:  ['make','trace'],                          // 두 탭에서 각각 '타원 확인' 눌러보기
  econcept: ['slider'],                                // a·b 슬라이더 움직이기
  eapply:   ['play'],                                  // 케플러 궤도 재생 버튼
  hdraw:    ['ell','hyp'],                             // 두 탭에서 각각 '곡선 확인' 눌러보기
  hconcept: ['slider'],                                // a·b 슬라이더 움직이기
  happly:   ['steps'],                                 // 위치 찾기 Step 4까지 완주
  geogebra: ['open']                                   // 지오지브라 실행
};
window.GEO_task = function(key){
  const page = window.PAGE_ID;
  if(!page) return;
  const req = window.GEO_TASKS[page];
  if(!req || req.indexOf(key) < 0) return;
  const sid = localStorage.getItem('geoSid') || 'guest';
  const K = 'geo.prog.v1.' + sid + '.' + page;
  let d = {};
  try{ d = JSON.parse(localStorage.getItem(K) || '{}'); }catch(e){}
  if(d[key]) return;
  d[key] = 1;
  try{ localStorage.setItem(K, JSON.stringify(d)); }catch(e){}
  if(req.every(k => d[k])){
    let done = [];
    try{ done = JSON.parse(localStorage.getItem('geoDone') || '[]'); }catch(e){}
    if(done.indexOf(page) < 0){
      done.push(page);
      try{ localStorage.setItem('geoDone', JSON.stringify(done)); }catch(e){}
      gxToast('🎉 이 활동을 모두 탐구했어요! 홈 화면에 완료 도장이 찍혔습니다');
    }
  }
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
  #gmPhotoBtn, #gmAlbumBtn {
    display:inline-flex; align-items:center; gap:6px; cursor:pointer;
    padding:9px 13px; font-size:13.5px; font-weight:700; border-radius:10px;
    border:1.5px dashed #94a3b8; color:#475569; background:#f8fafc;
  }
  #gmPhotoBtn:hover, #gmAlbumBtn:hover { border-color:#0284c7; color:#0369a1; }
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
        <label id="gmPhotoBtn">📷 사진 찍기
          <input type="file" id="gmPhotoIn" accept="image/*" capture="environment" hidden>
        </label>
        <label id="gmAlbumBtn">🖼️ 앨범에서
          <input type="file" id="gmAlbumIn" accept="image/*" multiple hidden>
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
  const albumIn = document.getElementById('gmAlbumIn');
  const thumbWrap = document.getElementById('gmThumbWrap');
  const photoBtn = document.getElementById('gmPhotoBtn');
  const albumBtn = document.getElementById('gmAlbumBtn');
  function renderThumbs(){
    thumbWrap.style.display = photos.length ? 'flex' : 'none';
    thumbWrap.innerHTML = photos.map((d,i)=>
      `<span class="gmThumbOne"><img src="${d}" alt="사진${i+1}">`+
      `<button data-i="${i}" class="gmDel" title="사진 빼기">✕</button></span>`).join('');
    const full = photos.length >= MAXPHOTOS;
    photoBtn.style.display = full ? 'none' : 'inline-flex';
    albumBtn.style.display = full ? 'none' : 'inline-flex';
    photoBtn.childNodes[0].textContent = photos.length ? `📷 더 찍기 (${photos.length}/${MAXPHOTOS})` : '📷 사진 찍기 ';
    thumbWrap.querySelectorAll('.gmDel').forEach(b=>
      b.addEventListener('click', ()=>{ photos.splice(+b.dataset.i,1); renderThumbs(); }));
  }
  function addPhotoFile(f){
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
  }
  photoIn.addEventListener('change', ()=>{
    addPhotoFile(photoIn.files && photoIn.files[0]);
    photoIn.value = '';
  });
  albumIn.addEventListener('change', ()=>{          // 앨범에서는 여러 장 한 번에
    const fs = Array.from(albumIn.files || []).slice(0, MAXPHOTOS - photos.length);
    fs.forEach(addPhotoFile);
    albumIn.value = '';
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
      setBookmark();
      bg.classList.remove('show');
      document.getElementById('gmText').value = '';
      photos.length = 0; renderThumbs();
      showToast('소감을 보냈어요! 책갈피도 꽂았습니다 ✅');
    }catch(e){
      showToast('전송에 실패했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    }
    btn.disabled = false; btn.textContent = '보내기';
  });
})();


/* ════════════════════════════════════════════════════════════
   연습장(굿노트식 화면 필기) + 포스트잇 — 활동 페이지 전용 (홈·목차 제외)
   ════════════════════════════════════════════════════════════ */
window.GN_POSTIT_IMG = "data:image/png;base64,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";
window.GN_NOTEBOOK_IMG = "data:image/png;base64,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";
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
  '#gnBtn img{height:28px;display:block;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.4));}'+
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
  '#gnav .gnPage, .gnPage{position:relative;width:31px;height:31px;border:none !important;cursor:pointer;'+
  'padding:0 !important;min-width:31px;background:transparent !important;box-shadow:none;'+
  'font-weight:900;font-size:12.5px;color:#44403c !important;'+
  'font-family:inherit;display:flex;align-items:center;justify-content:center;transition:transform .12s;}'+
  '.gnPage>img{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;filter:drop-shadow(0 1px 1.2px rgba(0,0,0,.38));}'+
  '.gnPage>span{position:relative;z-index:1;margin-left:-3px;margin-top:1px;}'+
  '#gnav .gnPage:hover, .gnPage:hover{transform:scale(1.12);}'+
  '.gnPage.on{outline:2.5px solid #0284c7;outline-offset:1.5px;border-radius:8px;}';
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
  else showHint('연습장 ' + (r+1) + '쪽에 저장했어요! 아래 연습장 ' + (r+1) + '을 누르면 다시 열려요 📒');
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
    return '<button class="gnPage'+(i === curPage ? ' on' : '')+'" data-i="'+i+'" title="연습장 '+(i+1)+'쪽">'+
      '<img src="'+(window.GN_NOTEBOOK_IMG||'')+'" alt=""><span>'+(i+1)+'</span></button>';
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
  btn.title = '연습장 (화면에 바로 필기)';
  btn.innerHTML = '<img src="' + (window.GN_NOTEBOOK_IMG || '') + '" alt="연습장">';
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

/* 포스트잇 모듈이 현재 펜 설정을 읽어감 */
window.GEO_penState = function(){
  return { open: mode, tool: tool, pen: conf.pen, hl: conf.hl };
};
/* 포스트잇 모듈이 휴지통 존·필기바 토글을 함께 씀 */
window.GEO_trash = {
  show: function(){ showTrash(true); },
  hide: function(){ showTrash(false); },
  hot: hotTrash,
  hit: inTrash
};
window.GEO_toggleBar = function(){ setMode(!mode); return mode; };

/* 테스트/디버그용 */
window.__gn = function(){
  return { n: strokes.length, pages: pages.length, curPage: curPage,
           sel: sel ? sel.idx.slice() : null,
           first: strokes[0] ? strokes[0].p.slice(0, 2) : null };
};
})();

/* ════════════════════════════════════════════════════════════
   포스트잇 — 화면 위에 붙이는 진짜 포스트잇 (연습장과 별개)
   · 하단 바의 🟨 포스트잇 버튼 → 새 포스트잇이 하나씩 생김 (최대 12장)
   · 제목줄을 끌어 이동 / − 접기(접은 채로 이동, 탭하면 펼침) / ✕ 삭제(두 번)
   · ◐ 투명도 4단 · 🎨 색 4종 (노랑→분홍→하늘→연두)
   · 필기: 포스트잇 위에 펜슬로 바로 씀 — 연습장 필기바가 열려 있으면
     그 펜/형광펜/지우개·색·굵기를 그대로 따라감 (포스트잇 안에 툴바 없음)
   · 연습장 필기바를 ✕로 닫아도 포스트잇은 그대로 남고, 저장도 자동
   ════════════════════════════════════════════════════════════ */
(function(){
'use strict';
if(!window.PAGE_ID) return;
var PAGE = window.PAGE_ID;
var SID  = localStorage.getItem('geoSid') || 'guest';
var KEY  = 'geo.postit.v1.' + SID + '.' + PAGE;
var PEN_SEEN_KEY = 'geo.gnmemo.penSeen';
var MAXNOTES = 12;
var NW = 232, NH = 186, BARH = 30;    // 기본 크기 (오른쪽 아래 모서리로 조절)
var MINW = 150, MINH = 116, MAXW = 640, MAXH = 520;

var COLORS = [
  { bg:'#fef9c3', bar:'#fde047', edge:'#eab308' },   // 노랑
  { bg:'#fce7f3', bar:'#f9a8d4', edge:'#ec4899' },   // 분홍
  { bg:'#e0f2fe', bar:'#7dd3fc', edge:'#0ea5e9' },   // 하늘
  { bg:'#dcfce7', bar:'#86efac', edge:'#22c55e' }    // 연두
];
var ALPHAS = [1, .8, .55, .35];

var notes = [];         // {id,x,y,ci,ai,folded,strokes:[{c,w,hl,p[]}]}
var seq = 1, zTop = 960;
try{
  var sv = JSON.parse(localStorage.getItem(KEY) || 'null');
  if(sv && sv.v === 1 && Array.isArray(sv.notes)){ notes = sv.notes; seq = sv.seq || (notes.length + 1); }
}catch(e){}
var saveTm = null;
function save(){
  clearTimeout(saveTm);
  saveTm = setTimeout(function(){
    try{ localStorage.setItem(KEY, JSON.stringify({ v:1, seq:seq, notes:notes })); }catch(e){}
  }, 400);
}
window.addEventListener('pagehide', function(){
  clearTimeout(saveTm);
  try{ localStorage.setItem(KEY, JSON.stringify({ v:1, seq:seq, notes:notes })); }catch(e){}
});

/* 지금 펜 설정 (연습장 필기바와 공유; 없으면 검정 펜) */
function penNow(){
  var st = window.GEO_penState ? window.GEO_penState() : null;
  if(!st) return { mode:'pen', c:'#1f2937', w:3 };
  if(st.open && st.tool === 'er') return { mode:'er' };
  if(st.open && st.tool === 'hl') return { mode:'hl', c:st.hl.c, w:st.hl.w };
  return { mode:'pen', c:st.pen.c, w:st.pen.w };
}
function penSeen(){ return localStorage.getItem(PEN_SEEN_KEY) === '1'; }
function markPen(){ try{ localStorage.setItem(PEN_SEEN_KEY,'1'); }catch(e){} }

/* ── 스타일 ── */
var css = document.createElement('style');
css.textContent =
  '.pnote{position:fixed;border-radius:4px 4px 14px 4px;'+
  'box-shadow:0 8px 22px rgba(120,90,0,.30);z-index:960;display:flex;flex-direction:column;'+
  "font-family:'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif;}"+
  '.pnBar{height:'+BARH+'px;border-radius:4px 4px 0 0;display:flex;align-items:center;'+
  'gap:2px;padding:0 4px 0 8px;cursor:grab;touch-action:none;}'+
  '.pnBar:active{cursor:grabbing;}'+
  '.pnBar .sp{flex:1;}'+
  '.pnBar button{border:none;background:rgba(255,255,255,.55);width:22px;height:22px;'+
  'border-radius:6px;cursor:pointer;font-size:12px;line-height:1;color:#57534e;'+
  'display:flex;align-items:center;justify-content:center;padding:0;font-weight:900;}'+
  '.pnBar button:hover{background:#fff;}'+
  '.pnMini{width:13px;height:13px;border-radius:2px 2px 5px 2px;display:block;position:relative;'+
  'box-shadow:0 1px 2px rgba(0,0,0,.25);}'+
  '.pnMini::after{content:"";position:absolute;right:0;bottom:0;width:5px;height:5px;'+
  'background:linear-gradient(315deg,rgba(255,255,255,.95) 46%,rgba(0,0,0,.28) 54%);border-radius:5px 0 5px 0;}'+
  '.pnBody{position:relative;flex:1;border-radius:0 0 14px 4px;overflow:hidden;}'+
  '.pnRs{position:absolute;right:0;bottom:0;width:26px;height:26px;cursor:nwse-resize;'+
  'touch-action:none;z-index:2;display:flex;align-items:flex-end;justify-content:flex-end;padding:4px;opacity:.55;}'+
  '.pnRs:hover{opacity:1;}'+
  '.pnBody canvas{position:absolute;inset:0;touch-action:none;}'+
  '.pnFold{position:fixed;width:42px;height:42px;z-index:960;border:none;cursor:pointer;padding:0;'+
  'border-radius:3px 3px 12px 3px;box-shadow:0 4px 10px rgba(120,90,0,.35);}'+
  '.pnFold::after{content:"";position:absolute;right:0;bottom:0;width:12px;height:12px;'+
  'background:linear-gradient(315deg,rgba(255,255,255,.95) 47%,rgba(0,0,0,.18) 53%);border-radius:12px 0 12px 0;}';
document.head.appendChild(css);

function noteToast(msg){
  var t = document.getElementById('gxToast');
  if(t){ t.textContent = msg; t.style.opacity = '1';
    clearTimeout(t._tm); t._tm = setTimeout(function(){ t.style.opacity = '0'; }, 2500);
    return; }
  // gxToast가 없으면 만들어 씀
  t = document.createElement('div'); t.id = 'gxToast';
  t.style.cssText = 'position:fixed;left:50%;bottom:74px;transform:translateX(-50%);background:#111827;'+
    'color:#fff;font-size:13.5px;padding:10px 18px;border-radius:999px;z-index:2100;opacity:0;'+
    'pointer-events:none;transition:opacity .3s;max-width:88vw;text-align:center;';
  document.body.appendChild(t);
  requestAnimationFrame(function(){ noteToast(msg); });
}

function clampXY(x, y, w, h){
  return [ Math.min(Math.max(x, 2), window.innerWidth - w - 2),
           Math.min(Math.max(y, 2), window.innerHeight - h - 2) ];
}

/* ── 포스트잇 DOM ── */
function buildNote(n){
  var col = COLORS[n.ci % COLORS.length];
  var el = document.createElement('div');
  el.className = 'pnote';
  el.dataset.id = n.id;
  el.innerHTML =
    '<div class="pnBar">'+
      '<span class="sp"></span>'+
      '<button class="pnPen" title="필기바 열기/닫기">'+
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none">'+
        '<path d="M4 20l1.2-4.2L16.4 4.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8 4 20z" '+
        'stroke="#57534e" stroke-width="2.2" stroke-linejoin="round"/></svg>'+
      '</button>'+
      '<button class="pnAl" title="투명도">◐</button>'+
      '<button class="pnCo" title="색 바꾸기"><span class="pnMini"></span></button>'+
      '<button class="pnFo" title="접기">−</button>'+
    '</div>'+
    '<div class="pnBody"><canvas></canvas></div>'+
    '<div class="pnRs" title="크기 조절">'+
      '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M11 4L4 11M11 8L8 11" '+
      'stroke="#78716c" stroke-width="1.8" stroke-linecap="round"/></svg>'+
    '</div>';
  document.body.appendChild(el);
  if(!n.w) n.w = NW;
  if(!n.h) n.h = NH;
  var cv = el.querySelector('canvas');
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var ctx = cv.getContext('2d');
  function applySize(){
    el.style.width = n.w + 'px'; el.style.height = n.h + 'px';
    cv.width = Math.round(n.w * DPR); cv.height = Math.round((n.h - BARH) * DPR);
    cv.style.width = n.w + 'px'; cv.style.height = (n.h - BARH) + 'px';
  }
  applySize();

  function applyLook(){
    var c = COLORS[n.ci % COLORS.length];
    el.style.background = c.bg;
    el.querySelector('.pnBar').style.background = c.bar;
    el.querySelector('.pnMini').style.background = COLORS[(n.ci+1) % COLORS.length].bar;
    el.style.opacity = ALPHAS[n.ai % ALPHAS.length];
    var p = clampXY(n.x, n.y, n.w, n.h);
    n.x = p[0]; n.y = p[1];
    el.style.left = n.x + 'px'; el.style.top = n.y + 'px';
  }
  function redraw(cur){
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, n.w, n.h - BARH);
    var all = cur ? n.strokes.concat([cur]) : n.strokes;
    all.forEach(function(s){
      var p = s.p;
      ctx.beginPath();
      if(p.length < 4){ ctx.arc(p[0], p[1], Math.max(s.w/2,1), 0, 6.2832); ctx.fillStyle = s.c;
        ctx.globalAlpha = s.hl ? .38 : 1; ctx.fill(); ctx.globalAlpha = 1; return; }
      ctx.moveTo(p[0], p[1]);
      for(var i = 2; i < p.length - 2; i += 2)
        ctx.quadraticCurveTo(p[i], p[i+1], (p[i]+p[i+2])/2, (p[i+1]+p[i+3])/2);
      ctx.lineTo(p[p.length-2], p[p.length-1]);
      ctx.strokeStyle = s.c; ctx.lineWidth = s.w;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.globalAlpha = s.hl ? .38 : 1; ctx.stroke(); ctx.globalAlpha = 1;
    });
  }
  function front(){ zTop++; el.style.zIndex = zTop; if(fold) fold.style.zIndex = zTop; }

  /* 제목줄 드래그 */
  var bar = el.querySelector('.pnBar');
  var did = null, offX = 0, offY = 0;
  bar.addEventListener('pointerdown', function(e){
    if(e.target.closest && e.target.closest('button')) return;
    e.preventDefault(); front();
    did = e.pointerId; offX = e.clientX - n.x; offY = e.clientY - n.y;
    try{ bar.setPointerCapture(did); }catch(err){}
    if(window.GEO_trash) window.GEO_trash.show();      // 끌기 시작 → 휴지통 등장
  });
  bar.addEventListener('pointermove', function(e){
    if(e.pointerId !== did) return;
    var p = clampXY(e.clientX - offX, e.clientY - offY, n.w, n.h);
    n.x = p[0]; n.y = p[1];
    el.style.left = n.x + 'px'; el.style.top = n.y + 'px';
    if(window.GEO_trash) window.GEO_trash.hot(e.clientX, e.clientY);
  });
  function dEnd(e){
    if(e.pointerId !== did) return;
    did = null;
    var drop = window.GEO_trash && window.GEO_trash.hit(e.clientX, e.clientY);
    if(window.GEO_trash) window.GEO_trash.hide();
    if(drop){ removeNote(); return; }
    save();
  }
  bar.addEventListener('pointerup', dEnd);
  bar.addEventListener('pointercancel', function(e){
    if(e.pointerId !== did) return;
    did = null;
    if(window.GEO_trash) window.GEO_trash.hide();
    save();
  });

  /* 필기 (연습장 필기바 설정을 따름; 팜 리젝션 공유) */
  var wid = null, cur = null;
  function lp(e){ var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  function eraseAt(x, y){
    var hit = false;
    for(var i = n.strokes.length - 1; i >= 0; i--){
      var p = n.strokes[i].p, r = 10 + n.strokes[i].w / 2;
      for(var j = 0; j < p.length; j += 2){
        var dx = p[j]-x, dy = p[j+1]-y;
        if(dx*dx + dy*dy < r*r){ n.strokes.splice(i,1); hit = true; break; }
      }
    }
    if(hit){ redraw(); save(); }
  }
  cv.addEventListener('pointerdown', function(e){
    if(wid !== null) return;
    if(e.pointerType === 'pen') markPen();
    else if(e.pointerType === 'touch' && penSeen()) return;   // 손바닥 무시
    e.preventDefault(); front();
    wid = e.pointerId;
    try{ cv.setPointerCapture(wid); }catch(err){}
    var pn = penNow(), q = lp(e);
    if(pn.mode === 'er'){ eraseAt(q[0], q[1]); return; }
    cur = { c:pn.c, w:pn.w, hl:pn.mode === 'hl', p:[q[0], q[1]] };
    redraw(cur);
  });
  cv.addEventListener('pointermove', function(e){
    if(e.pointerId !== wid) return;
    e.preventDefault();
    var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    var pn = penNow();
    if(pn.mode === 'er'){ evs.forEach(function(ev){ var q = lp(ev); eraseAt(q[0], q[1]); }); return; }
    if(!cur) return;
    evs.forEach(function(ev){
      var q = lp(ev), m = cur.p.length;
      var dx = q[0]-cur.p[m-2], dy = q[1]-cur.p[m-1];
      if(dx*dx + dy*dy >= 1.4) cur.p.push(Math.round(q[0]*10)/10, Math.round(q[1]*10)/10);
    });
    redraw(cur);
  });
  function wEnd(e){
    if(e.pointerId !== wid) return;
    wid = null;
    if(cur){ n.strokes.push(cur); cur = null; redraw(); save(); }
  }
  cv.addEventListener('pointerup', wEnd);
  cv.addEventListener('pointercancel', wEnd);

  /* 오른쪽 아래 모서리: 크기 조절 */
  (function(){
    var rs = el.querySelector('.pnRs');
    var rid = null, sw = 0, sh = 0, sx = 0, sy = 0;
    rs.addEventListener('pointerdown', function(e){
      e.preventDefault(); e.stopPropagation(); front();
      rid = e.pointerId; sw = n.w; sh = n.h; sx = e.clientX; sy = e.clientY;
      try{ rs.setPointerCapture(rid); }catch(err){}
    });
    rs.addEventListener('pointermove', function(e){
      if(e.pointerId !== rid) return;
      n.w = Math.min(Math.max(sw + e.clientX - sx, MINW), MAXW);
      n.h = Math.min(Math.max(sh + e.clientY - sy, MINH), MAXH);
      applySize(); redraw();
    });
    function rEnd(e){ if(e.pointerId === rid){ rid = null; applyLook(); save(); } }
    rs.addEventListener('pointerup', rEnd);
    rs.addEventListener('pointercancel', rEnd);
  })();

  /* 버튼들 */
  el.querySelector('.pnPen').addEventListener('click', function(){
    if(window.GEO_toggleBar) window.GEO_toggleBar();
  });
  el.querySelector('.pnAl').addEventListener('click', function(){ n.ai = (n.ai+1) % ALPHAS.length; applyLook(); save(); });
  el.querySelector('.pnCo').addEventListener('click', function(){ n.ci = (n.ci+1) % COLORS.length; applyLook(); save(); });
  function removeNote(){
    notes = notes.filter(function(m){ return m.id !== n.id; });
    el.remove(); if(fold) fold.remove();
    save();
    noteToast('포스트잇을 삭제했어요 🗑');
  }

  /* 접기 */
  var fold = null;
  el.querySelector('.pnFo').addEventListener('click', function(){ setFold(true); });
  function setFold(f){
    n.folded = f; save();
    if(f){
      el.style.display = 'none';
      if(!fold){
        fold = document.createElement('button');
        fold.className = 'pnFold';
        document.body.appendChild(fold);
        // 접힌 포스트잇: 6px 이상 끌면 이동, 그냥 탭이면 펼침
        var fid = null, fx = 0, fy = 0, movedF = false;
        fold.addEventListener('pointerdown', function(e){
          e.preventDefault(); fid = e.pointerId; movedF = false;
          fx = e.clientX - n.x; fy = e.clientY - n.y;
          try{ fold.setPointerCapture(fid); }catch(err){}
        });
        fold.addEventListener('pointermove', function(e){
          if(e.pointerId !== fid) return;
          var nx = e.clientX - fx, ny = e.clientY - fy;
          if(!movedF && (nx-n.x)*(nx-n.x) + (ny-n.y)*(ny-n.y) < 36) return;
          if(!movedF && window.GEO_trash) window.GEO_trash.show();
          movedF = true;
          var p = clampXY(nx, ny, 42, 42);
          n.x = p[0]; n.y = p[1];
          fold.style.left = n.x + 'px'; fold.style.top = n.y + 'px';
          if(window.GEO_trash) window.GEO_trash.hot(e.clientX, e.clientY);
        });
        fold.addEventListener('pointerup', function(e){
          if(e.pointerId !== fid) return;
          fid = null;
          if(movedF){
            var drop = window.GEO_trash && window.GEO_trash.hit(e.clientX, e.clientY);
            if(window.GEO_trash) window.GEO_trash.hide();
            if(drop){ removeNote(); return; }
            save(); return;
          }
          setFold(false);                      // 탭 = 펼치기
        });
      }
      fold.style.display = 'block';
      fold.style.background = COLORS[n.ci % COLORS.length].bar;
      fold.style.left = n.x + 'px'; fold.style.top = n.y + 'px';
      fold.style.zIndex = el.style.zIndex || 960;
    } else {
      if(fold) fold.style.display = 'none';
      el.style.display = 'flex';
      applyLook(); redraw();
    }
  }

  applyLook(); redraw();
  if(n.folded) setFold(true);
  return el;
}

/* ── 저장돼 있던 포스트잇 복원 ── */
function restore(){ notes.forEach(function(n){ buildNote(n); }); }

/* ── 하단 바 버튼 (연습장 버튼 오른쪽) ── */
function addPtBtn(){
  if(document.getElementById('ptBtn')) return;
  var btn = document.createElement('button');
  btn.id = 'ptBtn';
  btn.title = '포스트잇 붙이기';
  btn.style.cssText = 'padding:4px 8px;';
  btn.innerHTML = '<img src="' + (window.GN_POSTIT_IMG || '') + '" alt="포스트잇" style="height:26px;display:block">';
  var gn = document.getElementById('gnBtn');
  if(gn && gn.parentNode) gn.parentNode.insertBefore(btn, gn.nextSibling);
  else {
    btn.style.cssText += 'position:fixed;left:60px;bottom:12px;z-index:400;background:#fff;'+
      'border:1.5px solid #cbd5e1;border-radius:11px;cursor:pointer;';
    document.body.appendChild(btn);
  }
  btn.addEventListener('click', function(){
    if(notes.length >= MAXNOTES){ noteToast('포스트잇은 최대 ' + MAXNOTES + '장까지예요'); return; }
    var k = notes.length;
    var n = { id: 'p' + (seq++), w: NW, h: NH,
      x: Math.min(90 + (k%5)*36, window.innerWidth - NW - 20),
      y: Math.min(110 + (k%5)*30, window.innerHeight - NH - 80),
      ci: k % COLORS.length, ai: 0, folded: false, strokes: [] };
    notes.push(n);
    buildNote(n); save();
  });
  restore();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addPtBtn);
else addPtBtn();

/* 테스트용 */
window.__pt = function(){
  return { n: notes.length,
    notes: notes.map(function(m){ return { id:m.id, x:Math.round(m.x), y:Math.round(m.y), w:m.w||0, h:m.h||0,
      ci:m.ci, ai:m.ai, folded:!!m.folded, s:m.strokes.length }; }) };
};
})();
