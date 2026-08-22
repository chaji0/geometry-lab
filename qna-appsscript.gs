/**
 * qna-appsscript.gs — 기하 탐구실 '질문 게시판' 백엔드
 *
 * 기존 승인/소감용 Apps Script는 그대로 두고, 이것만 새 프로젝트로 따로 배포하세요.
 * (기존 스크립트에 doGet 이 이미 있어서 합치면 충돌합니다.)
 *
 * ── 설치 순서 ────────────────────────────────────────────────
 * 1. script.google.com → 새 프로젝트 → 이 파일 내용 전체 붙여넣기
 * 2. 아래 SHEET_ID 에 '기하 승인명단' 스프레드시트 ID 를 넣기
 *      https://docs.google.com/spreadsheets/d/★여기가ID★/edit
 * 3. (선택) 왼쪽에서 setup 함수 한 번 실행 → '질문' 탭이 만들어짐
 *      처음 실행하면 권한 승인 창이 뜹니다. 승인해 주세요.
 * 4. 배포 → 새 배포 → 유형: 웹 앱
 *      실행 계정: 나  /  액세스 권한: 모든 사용자
 *    → 나오는 .../exec 주소를 복사
 * 5. qna.js 위쪽 QNA_URL 에 그 주소를 붙여넣기
 *
 * ── 시트 모양 ────────────────────────────────────────────────
 *   '질문' 탭 :  A 학번 | B 이름 | C 질문 | D 답변
 *   질문 칸에는 날짜가 앞에 붙습니다 →  (0822)포물선을 지오지브라로 그릴 수 있나요?
 *   선생님이 D열(답변)에 적으면 학생 앱의 그 질문 아래에 바로 달립니다.
 *   (C열의 (MMDD) 부분은 지우지 마세요. 날짜 표시에 씁니다.)
 */

var SHEET_ID = '여기에_기하_승인명단_스프레드시트_ID';
var TAB      = '질문';
var TZ       = 'Asia/Seoul';
var MAXLEN   = 500;

/* ---------- 시트 ---------- */
function getSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.getRange(1, 1, 1, 4).setValues([['학번', '이름', '질문', '답변']]);
    sh.getRange(1, 1, 1, 4)
      .setFontWeight('bold').setBackground('#e0f2fe').setHorizontalAlignment('center');
    sh.setColumnWidth(1, 90);
    sh.setColumnWidth(2, 90);
    sh.setColumnWidth(3, 420);
    sh.setColumnWidth(4, 420);
    sh.getRange(1, 3, sh.getMaxRows(), 2).setWrap(true).setVerticalAlignment('top');
    sh.setFrozenRows(1);
  }
  return sh;
}

/** 한 번만 눌러서 '질문' 탭을 미리 만들어 두고 싶을 때 */
function setup() {
  var sh = getSheet_();
  Logger.log('준비 완료: ' + sh.getName() + ' (행 ' + sh.getLastRow() + ')');
}

/* ---------- 웹앱 진입점 (JSONP) ---------- */
function doGet(e) {
  var p  = (e && e.parameter) || {};
  var cb = p.callback || 'callback';
  var out;
  try {
    if      (p.action === 'ask')  out = ask_(p.sid, p.name, p.q);
    else if (p.action === 'list') out = list_(p.sid);
    else                          out = { ok: false, error: 'unknown action' };
  } catch (err) {
    out = { ok: false, error: String(err) };
  }
  return ContentService
    .createTextOutput(cb + '(' + JSON.stringify(out) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

/* ---------- 질문 등록 ---------- */
function ask_(sid, name, q) {
  sid  = String(sid  || '').trim();
  name = String(name || '').trim();
  q    = String(q    || '').trim();
  if (!sid)      return { ok: false, error: '학번이 없습니다' };
  if (!q)        return { ok: false, error: '질문이 비어 있습니다' };
  if (q.length > MAXLEN) q = q.substring(0, MAXLEN);

  var lock = LockService.getScriptLock();
  try { lock.waitLock(8000); } catch (e) { return { ok: false, error: 'busy' }; }
  try {
    var sh   = getSheet_();
    var date = Utilities.formatDate(new Date(), TZ, 'MMdd');   // 예: 0822
    sh.appendRow([sid, name, '(' + date + ')' + q, '']);
    var r = sh.getLastRow();
    sh.getRange(r, 3, 1, 2).setWrap(true).setVerticalAlignment('top');
    return { ok: true, date: date };
  } finally {
    lock.releaseLock();
  }
}

/* ---------- 내 질문 + 답변 목록 ---------- */
function list_(sid) {
  sid = String(sid || '').trim();
  if (!sid) return { ok: true, items: [] };

  var sh = getSheet_();
  var last = sh.getLastRow();
  if (last < 2) return { ok: true, items: [] };

  var rows  = sh.getRange(2, 1, last - 1, 4).getValues();
  var now   = new Date();
  var today = Utilities.formatDate(now, TZ, 'MMdd');
  var year  = Number(Utilities.formatDate(now, TZ, 'yyyy'));
  var items = [];
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim() !== sid) continue;
    var raw = String(rows[i][2] || '');
    var m   = raw.match(/^\((\d{3,4})\)\s*([\s\S]*)$/);        // (0822)질문내용
    var mmdd = m ? ('0000' + m[1]).slice(-4) : '';
    var ymd  = '';
    if (mmdd) {                                    // MMDD 만 저장하므로 연도는 추정
      var y = (mmdd > today) ? (year - 1) : year;  // 오늘보다 뒤면 작년 것
      ymd = y + '.' + mmdd.substring(0, 2) + '.' + mmdd.substring(2);
    }
    items.push({
      date: mmdd,
      ymd : ymd,
      q   : m ? m[2] : raw,
      a   : String(rows[i][3] || '')
    });
  }
  items.reverse();                                              // 최근 질문이 위로
  return { ok: true, items: items };
}
