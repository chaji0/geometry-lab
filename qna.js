/* ============================================================
   qna.js — 질문 게시판 (학생용)
   기하 탐구실 공용 모듈 · 외부 라이브러리 없음
   ------------------------------------------------------------
   · window.PAGE_ID 가 있는 페이지에서만 켜진다 (홈·목차 제외).
   · 우측 상단 지오지브라 'G' 버튼 왼쪽에 'Q' 버튼이 뜬다.
   · 질문은 구글 스프레드시트 '기하 승인명단' 의 '질문' 탭에 쌓인다.
       학번 | 이름 | 질문 | 답변
     질문 칸에는 날짜가 앞에 붙는다 →  (0822)포물선을 지오지브라로…
   · 선생님이 '답변' 칸에 적으면 학생 화면의 그 질문 아래에 답변이 달린다.
   · 학생은 '자기 질문만' 본다.
   ============================================================ */
(function(){
'use strict';
if (!window.PAGE_ID) return;
if (window.__GEO_QNA__) return;
window.__GEO_QNA__ = true;

/* ┌──────────────────────────────────────────────────────────┐
   │  ★ 여기에 '질문 전용' Apps Script 웹앱 주소를 넣으세요.   │
   │    (qna-appsscript.gs 를 배포하면 나오는 /exec 주소)      │
   └──────────────────────────────────────────────────────────┘ */
var QNA_URL = (window.GEO_CONFIG && window.GEO_CONFIG.QNA_URL) ||
              'https://script.google.com/macros/s/여기에_질문용_배포ID/exec';

var MAXLEN = 500;
function sid(){  try{ return localStorage.getItem('geoSid')  || ''; }catch(e){ return ''; } }
function name(){ try{ return localStorage.getItem('geoName') || ''; }catch(e){ return ''; } }
function seenKey(){ return 'geo.qna.seen.' + sid(); }

/* ---------- Apps Script 호출 (JSONP — CORS·리디렉션 문제 없음) ---------- */
var jseq = 0;
function call(params){
  return new Promise(function(resolve, reject){
    var cb = 'geoQnaCb' + (++jseq);
    var s  = document.createElement('script');
    var timer = setTimeout(function(){ done(); reject(new Error('timeout')); }, 15000);
    function done(){
      clearTimeout(timer);
      try{ delete window[cb]; }catch(e){ window[cb] = undefined; }
      if(s.parentNode) s.parentNode.removeChild(s);
    }
    window[cb] = function(d){ done(); resolve(d); };
    params.callback = cb;
    var q = Object.keys(params).map(function(k){
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    s.src = QNA_URL + '?' + q;
    s.onerror = function(){ done(); reject(new Error('network')); };
    document.head.appendChild(s);
  });
}

/* ---------- 스타일 ----------
   색: 포인트 #0F8FB8 · 배경 #EFF4F9 · 카드 #FFF/테두리 #E6EDF3
       날짜 #96A6B5 · 질문 #16232F · 답변 #4A5B6B                */
var CSS = ''
+ '#qnaBtn{position:fixed;top:7px;right:58px;z-index:400;width:38px;height:38px;border-radius:50%;'
+ 'background:#fff;border:2.5px solid #0F8FB8;color:#0F8FB8;font-weight:900;font-size:19px;'
+ 'display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;'
+ 'box-shadow:0 2px 8px rgba(15,143,184,.28);font-family:Georgia,"Times New Roman",serif;'
+ 'transition:transform .12s;-webkit-tap-highlight-color:transparent;}'
+ '#qnaBtn:hover{transform:scale(1.1);}'
+ '#qnaBtn .dot{position:absolute;top:-2px;right:-2px;width:11px;height:11px;border-radius:50%;'
+ 'background:#ef4444;border:2px solid #fff;display:none;}'
+ '#qnaBtn.hasNew .dot{display:block;}'

+ '#qnaBack{position:fixed;inset:0;z-index:600;background:rgba(15,23,42,.42);'
+ 'display:none;align-items:center;justify-content:center;padding:14px;'
+ '-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);}'
+ '#qnaBack.show{display:flex;}'
+ '#qnaSheet{position:relative;width:100%;max-width:600px;max-height:88vh;background:#EFF4F9;'
+ 'border-radius:20px;box-shadow:0 18px 50px rgba(15,23,42,.3);overflow-y:auto;'
+ '-webkit-overflow-scrolling:touch;'
+ 'font-family:"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif;color:#16232F;}'
+ '#qnaClose{position:sticky;top:0;float:right;margin:12px 14px -46px 0;width:34px;height:34px;'
+ 'border:none;background:rgba(255,255,255,.9);border-radius:50%;cursor:pointer;font-size:15px;'
+ 'color:#5B6B7A;line-height:1;padding:0;z-index:2;box-shadow:0 1px 4px rgba(15,23,42,.12);}'
+ '#qnaInner{padding:34px 26px 30px;}'
+ '.qnaTitle{text-align:center;font-size:34px;font-weight:800;color:#0F8FB8;letter-spacing:-.5px;}'
+ '.qnaSub{text-align:center;font-size:13.5px;color:#5B6B7A;margin-top:9px;line-height:1.7;}'
+ '.qnaWho{text-align:center;font-size:12px;color:#96A6B5;margin-top:4px;}'

+ '.qnaCard{background:#fff;border:1px solid #E6EDF3;border-radius:14px;'
+ 'padding:18px 22px;margin-top:14px;}'
+ '.qnaAsk{margin-top:22px;}'
+ '.qnaAsk .askBtn{padding:11px 24px;font-size:14.5px;font-weight:800;color:#fff;border:none;'
+ 'border-radius:9px;cursor:pointer;background:#0F8FB8;font-family:inherit;'
+ 'transition:background .12s;}'
+ '.qnaAsk .askBtn:hover{background:#0d7c9f;}'
+ '.qnaForm{display:none;margin-top:14px;}'
+ '.qnaAsk.open .qnaForm{display:block;}'
+ '.qnaForm textarea{width:100%;min-height:96px;border:1.5px solid #D5E1EA;border-radius:11px;'
+ 'padding:11px 12px;font:inherit;font-size:15px;line-height:1.65;resize:vertical;outline:none;'
+ 'background:#FBFDFE;color:#16232F;box-sizing:border-box;}'
+ '.qnaForm textarea:focus{border-color:#0F8FB8;}'
+ '.qnaForm .row{display:flex;align-items:center;gap:10px;margin-top:10px;}'
+ '.qnaForm .cnt{flex:1;font-size:11.5px;color:#96A6B5;}'
+ '.qnaForm .send{padding:10px 20px;font-size:14px;font-weight:800;color:#fff;border:none;'
+ 'border-radius:9px;cursor:pointer;background:#0F8FB8;font-family:inherit;}'
+ '.qnaForm .send:disabled{opacity:.5;cursor:default;}'
+ '.qnaForm .cancel{padding:10px 16px;font-size:13.5px;font-weight:700;color:#5B6B7A;'
+ 'border:1.5px solid #D5E1EA;border-radius:9px;cursor:pointer;background:#fff;font-family:inherit;}'

+ '.qItem{background:#fff;border:1px solid #E6EDF3;border-radius:14px;'
+ 'padding:20px 22px;margin-top:13px;cursor:pointer;}'
+ '.qItem .head{display:flex;align-items:flex-start;gap:14px;}'
+ '.qItem .meta{flex:1;min-width:0;}'
+ '.qItem .date{font-size:12.5px;color:#96A6B5;}'
+ '.qItem .q{font-size:15.5px;font-weight:800;color:#16232F;margin-top:7px;line-height:1.55;'
+ 'white-space:pre-wrap;word-break:break-word;}'
+ '.qItem .tog{flex:none;width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;'
+ 'background:#E8F3F8;color:#0F8FB8;font-size:19px;font-weight:400;line-height:1;padding:0;'
+ 'display:flex;align-items:center;justify-content:center;font-family:inherit;}'
+ '.qItem.open .tog{background:#0F8FB8;color:#fff;}'
+ '.qItem .ans{display:none;border-top:1px solid #E6EDF3;margin-top:16px;padding-top:15px;'
+ 'font-size:14px;line-height:1.8;color:#4A5B6B;white-space:pre-wrap;word-break:break-word;}'
+ '.qItem.open .ans{display:block;}'
+ '.qItem .ans.none{color:#96A6B5;}'

+ '.qnaEmpty{text-align:center;color:#96A6B5;font-size:13.5px;line-height:1.9;padding:34px 10px;}'
+ '.qnaMsg{font-size:13px;padding:11px 13px;border-radius:11px;margin-top:14px;line-height:1.6;}'
+ '.qnaMsg.ok{background:#dcfce7;color:#166534;}'
+ '.qnaMsg.err{background:#fee2e2;color:#b91c1c;}'
+ '@media(max-width:520px){#qnaInner{padding:28px 16px 24px;}'
+ '.qnaTitle{font-size:29px;}.qnaCard,.qItem{padding:16px 16px;}}';

var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

/* ---------- DOM ---------- */
var btn = document.createElement('button');
btn.id = 'qnaBtn'; btn.title = '질문';
btn.innerHTML = 'Q<span class="dot"></span>';

var back = document.createElement('div');
back.id = 'qnaBack';
back.innerHTML =
    '<div id="qnaSheet">'
  +   '<button id="qnaClose" title="닫기">✕</button>'
  +   '<div id="qnaInner">'
  +     '<div class="qnaTitle">질문</div>'
  +     '<div class="qnaSub">학습하면서 궁금한 점을 언제든지 질문해 주세요.</div>'
  +     '<div class="qnaWho"></div>'
  +     '<div class="qnaCard qnaAsk">'
  +       '<button class="askBtn" id="qnaOpenForm">질문하기</button>'
  +       '<div class="qnaForm">'
  +         '<textarea id="qnaText" maxlength="' + MAXLEN + '" '
  +           'placeholder="궁금한 점을 적어 주세요."></textarea>'
  +         '<div class="row">'
  +           '<span class="cnt" id="qnaCnt">0 / ' + MAXLEN + '</span>'
  +           '<button class="cancel" id="qnaCancel">취소</button>'
  +           '<button class="send" id="qnaSend">보내기</button>'
  +         '</div>'
  +       '</div>'
  +     '</div>'
  +     '<div id="qnaMsgBox"></div>'
  +     '<div id="qnaList"><div class="qnaEmpty">불러오는 중…</div></div>'
  +   '</div>'
  + '</div>';

/* ---------- 렌더 ---------- */
function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function shownDate(it){
  if(it.ymd) return it.ymd;                              // 서버가 준 2026.07.14
  var m = String(it.date||'').match(/^(\d{2})(\d{2})$/);  // 예비: 0714 → 07.14
  return m ? (m[1] + '.' + m[2]) : '';
}
var openSet = {};                                        // 펼쳐둔 항목 기억
function render(items){
  var box = back.querySelector('#qnaList');
  if(!items || !items.length){
    box.innerHTML = '<div class="qnaEmpty">아직 보낸 질문이 없어요.<br>' +
                    '위 <b>질문하기</b>를 눌러 궁금한 점을 남겨 보세요.</div>';
    return;
  }
  box.innerHTML = items.map(function(it, i){
    var has  = it.a && String(it.a).trim() !== '';
    var open = !!openSet[i];
    return '<div class="qItem' + (open ? ' open' : '') + '" data-i="' + i + '">'
      +   '<div class="head">'
      +     '<div class="meta">'
      +       '<div class="date">' + esc(shownDate(it)) + '</div>'
      +       '<div class="q">' + esc(it.q) + '</div>'
      +     '</div>'
      +     '<button class="tog" tabindex="-1">' + (open ? '−' : '+') + '</button>'
      +   '</div>'
      +   '<div class="ans' + (has ? '' : ' none') + '">'
      +     (has ? esc(it.a) : '아직 답변이 달리지 않았어요. 조금만 기다려 주세요.')
      +   '</div>'
      + '</div>';
  }).join('');
}
function msg(kind, text){
  back.querySelector('#qnaMsgBox').innerHTML =
    text ? '<div class="qnaMsg ' + kind + '">' + esc(text) + '</div>' : '';
}

/* ---------- 데이터 ---------- */
var lastItems = null;
function answeredCount(items){
  return (items||[]).filter(function(it){ return it.a && String(it.a).trim() !== ''; }).length;
}
function seen(){ try{ return parseInt(localStorage.getItem(seenKey())||'0',10)||0; }catch(e){ return 0; } }
function setSeen(n){ try{ localStorage.setItem(seenKey(), String(n)); }catch(e){} }

function refresh(silent){
  if(!sid()){ render([]); return Promise.resolve(); }
  return call({ action:'list', sid:sid() }).then(function(r){
    if(!r || !r.ok) throw new Error((r && r.error) || 'error');
    lastItems = r.items || [];
    render(lastItems);
    var n = answeredCount(lastItems);
    btn.classList.toggle('hasNew', n > seen());
    if(back.classList.contains('show')){ setSeen(n); btn.classList.remove('hasNew'); }
  }).catch(function(){
    if(!silent) msg('err', '목록을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.');
    if(!lastItems) back.querySelector('#qnaList').innerHTML =
      '<div class="qnaEmpty">목록을 불러오지 못했어요.</div>';
  });
}

function send(){
  var ta = back.querySelector('#qnaText');
  var t  = ta.value.trim();
  if(!t){ msg('err','질문을 적어 주세요.'); return; }
  if(!sid()){ msg('err','학번 정보가 없어요. 홈에서 다시 입장해 주세요.'); return; }
  var b = back.querySelector('#qnaSend');
  b.disabled = true; b.textContent = '보내는 중…'; msg('', '');
  call({ action:'ask', sid:sid(), name:name(), q:t }).then(function(r){
    if(!r || !r.ok) throw new Error((r && r.error) || 'error');
    ta.value = ''; countUp();
    back.querySelector('.qnaAsk').classList.remove('open');
    openSet = {};
    msg('ok', '질문을 보냈어요. 선생님이 답변을 달면 여기에 나타나요.');
    return refresh(true);
  }).catch(function(){
    msg('err', '전송에 실패했어요. 잠시 뒤 다시 시도해 주세요.');
  }).then(function(){
    b.disabled = false; b.textContent = '보내기';
  });
}
function countUp(){
  back.querySelector('#qnaCnt').textContent =
    back.querySelector('#qnaText').value.length + ' / ' + MAXLEN;
}

/* ---------- 열기 / 닫기 ---------- */
function open(){
  back.querySelector('.qnaWho').textContent = sid() ? (sid() + ' ' + name()) : '';
  back.classList.add('show');
  msg('', '');
  if(lastItems){ render(lastItems); setSeen(answeredCount(lastItems)); btn.classList.remove('hasNew'); }
  refresh(false);
}
function close(){
  back.classList.remove('show');
  back.querySelector('.qnaAsk').classList.remove('open');
}

/* ---------- 시작 ---------- */
function boot(){
  document.body.appendChild(btn);
  document.body.appendChild(back);

  btn.addEventListener('click', open);
  back.querySelector('#qnaClose').addEventListener('click', close);
  back.addEventListener('click', function(e){ if(e.target === back) close(); });

  back.querySelector('#qnaOpenForm').addEventListener('click', function(){
    var card = back.querySelector('.qnaAsk');
    card.classList.toggle('open');
    if(card.classList.contains('open')) back.querySelector('#qnaText').focus();
  });
  back.querySelector('#qnaCancel').addEventListener('click', function(){
    back.querySelector('.qnaAsk').classList.remove('open');
    back.querySelector('#qnaText').value = ''; countUp(); msg('','');
  });
  back.querySelector('#qnaSend').addEventListener('click', send);
  back.querySelector('#qnaText').addEventListener('input', countUp);

  /* 아코디언 */
  back.querySelector('#qnaList').addEventListener('click', function(e){
    var item = e.target.closest && e.target.closest('.qItem');
    if(!item) return;
    var i = item.dataset.i;
    var willOpen = !item.classList.contains('open');
    item.classList.toggle('open', willOpen);
    item.querySelector('.tog').textContent = willOpen ? '−' : '+';
    openSet[i] = willOpen;
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && back.classList.contains('show')) close();
  });

  refresh(true);                                  // 배지용 조용한 조회
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

window.GEO_qna = { open:open, refresh:refresh };
})();
