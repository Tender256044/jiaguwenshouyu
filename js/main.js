/* ============================================================
   契语 QI-YU · 首页交互脚本
   说明：当前为「骨架版」，词表数据与字形均为占位，
   后续替换为真实 SVG 字形库 + 识别接口即可。
   ============================================================ */

/* ---------------- 甲骨字形占位 SVG（示意线条，非真实字形） ---------------- */
const GLYPH_SVGS = {
  '日': '<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="5" fill="currentColor"/>',
  '月': '<path d="M72 18 A38 38 0 1 0 72 82 A26 26 0 1 1 72 18 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
  '山': '<path d="M18 78 L36 40 L50 62 L64 36 L82 78" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><line x1="18" y1="82" x2="82" y2="82" stroke="currentColor" stroke-width="5"/>',
  '水': '<path d="M50 16 L50 84" stroke="currentColor" stroke-width="5"/><path d="M50 30 C38 34 38 44 50 50 C62 56 62 66 50 72" fill="none" stroke="currentColor" stroke-width="5"/><path d="M50 44 C64 48 64 58 50 64" fill="none" stroke="currentColor" stroke-width="4"/>',
  '火': '<path d="M50 14 L50 84" stroke="currentColor" stroke-width="5"/><path d="M50 40 C34 34 28 22 30 12 C40 22 46 26 50 40 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M50 52 C66 46 72 34 70 24 C60 34 54 38 50 52 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
  '木': '<path d="M50 24 L50 84" stroke="currentColor" stroke-width="5"/><path d="M50 36 L30 52 M50 36 L70 52" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M50 54 L34 70 M50 54 L66 70" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
  '人': '<path d="M62 14 L40 44 L30 84 M40 44 L68 76" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  '目': '<ellipse cx="50" cy="50" rx="30" ry="24" fill="none" stroke="currentColor" stroke-width="5"/><ellipse cx="50" cy="50" rx="10" ry="12" fill="currentColor"/>',
  '大': '<path d="M50 14 L50 84 M50 30 L28 48 M50 30 L72 48" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  '口': '<rect x="22" y="26" width="56" height="48" fill="none" stroke="currentColor" stroke-width="5"/>',
  '手': '<path d="M42 20 L42 60 M42 42 L24 34 M42 42 L20 48 M42 56 L26 66" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  '雨': '<line x1="22" y1="24" x2="78" y2="24" stroke="currentColor" stroke-width="5"/><line x1="50" y1="24" x2="50" y2="48" stroke="currentColor" stroke-width="5"/><path d="M34 44 C30 56 34 66 44 68 M66 44 C70 56 66 66 56 68 M50 48 C50 58 52 66 54 70" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
  '天': '<line x1="24" y1="24" x2="76" y2="24" stroke="currentColor" stroke-width="5"/><path d="M50 24 L50 84 M50 40 L30 56 M50 40 L70 56" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
};

/* 无专属 SVG 时的占位 */
function placeholderSvg() {
  return '<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6 5" opacity="0.55"/>'
    + '<text x="50" y="58" text-anchor="middle" font-family="serif" font-size="26" fill="currentColor" opacity="0.45">待</text>';
}
function glyphSvg(char) {
  return GLYPH_SVGS[char] || placeholderSvg();
}

/* ---------------- 词表数据（占位：拼音 / 释义待补全为真实考据） ---------------- */
const WORDS = {
  body: [
    { c: '人', p: 'rén', m: '侧面站立之人形' },
    { c: '大', p: 'dà', m: '正面站立之人形' },
    { c: '小', p: 'xiǎo', m: '细微之物（待考）' },
    { c: '子', p: 'zǐ', m: '襁褓中之婴儿（待考）' },
    { c: '女', p: 'nǚ', m: '跪坐之人形（待考）' },
    { c: '目', p: 'mù', m: '眼睛之形' },
    { c: '口', p: 'kǒu', m: '口部之形' },
    { c: '耳', p: 'ěr', m: '耳朵（待考）' },
    { c: '手', p: 'shǒu', m: '手形（待考）' },
    { c: '足', p: 'zú', m: '足（待考）' },
  ],
  nature: [
    { c: '日', p: 'rì', m: '太阳之形' },
    { c: '月', p: 'yuè', m: '月牙之形' },
    { c: '山', p: 'shān', m: '山峰之形' },
    { c: '水', p: 'shuǐ', m: '水流之形' },
    { c: '火', p: 'huǒ', m: '火焰之形' },
    { c: '木', p: 'mù', m: '树木之形' },
    { c: '土', p: 'tǔ', m: '土堆（待考）' },
    { c: '天', p: 'tiān', m: '人之上为天' },
    { c: '雨', p: 'yǔ', m: '天降雨水' },
    { c: '云', p: 'yún', m: '云气（待考）' },
    { c: '风', p: 'fēng', m: '风（待考）' },
    { c: '石', p: 'shí', m: '山崖石块（待考）' },
  ],
  animal: [
    { c: '牛', p: 'niú', m: '牛首之形（待考）' },
    { c: '羊', p: 'yáng', m: '羊首之形（待考）' },
    { c: '马', p: 'mǎ', m: '马之形（待考）' },
    { c: '鱼', p: 'yú', m: '鱼之形（待考）' },
    { c: '鸟', p: 'niǎo', m: '鸟之形（待考）' },
    { c: '虎', p: 'hǔ', m: '虎之形（待考）' },
    { c: '鹿', p: 'lù', m: '鹿之形（待考）' },
    { c: '犬', p: 'quǎn', m: '犬之形（待考）' },
    { c: '豕', p: 'shǐ', m: '猪之形（待考）' },
    { c: '龟', p: 'guī', m: '龟之形（待考）' },
    { c: '龙', p: 'lóng', m: '龙之形（待考）' },
    { c: '象', p: 'xiàng', m: '大象之形（待考）' },
  ],
  number: [
    { c: '一', p: 'yī', m: '一横' },
    { c: '二', p: 'èr', m: '两横' },
    { c: '三', p: 'sān', m: '三横' },
    { c: '四', p: 'sì', m: '四横（待考）' },
    { c: '五', p: 'wǔ', m: '五（待考）' },
    { c: '六', p: 'liù', m: '六（待考）' },
    { c: '七', p: 'qī', m: '七（待考）' },
    { c: '八', p: 'bā', m: '八（待考）' },
    { c: '九', p: 'jiǔ', m: '九（待考）' },
    { c: '十', p: 'shí', m: '十（待考）' },
  ],
  direction: [
    { c: '上', p: 'shàng', m: '上（待考）' },
    { c: '下', p: 'xià', m: '下（待考）' },
    { c: '中', p: 'zhōng', m: '中（待考）' },
    { c: '左', p: 'zuǒ', m: '左（待考）' },
    { c: '右', p: 'yòu', m: '右（待考）' },
    { c: '东', p: 'dōng', m: '东（待考）' },
  ],
  action: [
    { c: '来', p: 'lái', m: '来（待考）' },
    { c: '去', p: 'qù', m: '去（待考）' },
    { c: '见', p: 'jiàn', m: '见（待考）' },
    { c: '闻', p: 'wén', m: '闻（待考）' },
    { c: '问', p: 'wèn', m: '问（待考）' },
    { c: '立', p: 'lì', m: '站立（待考）' },
    { c: '坐', p: 'zuò', m: '坐（待考）' },
    { c: '行', p: 'xíng', m: '行走（待考）' },
    { c: '止', p: 'zhǐ', m: '足趾（待考）' },
    { c: '取', p: 'qǔ', m: '取（待考）' },
    { c: '逐', p: 'zhú', m: '追逐（待考）' },
    { c: '射', p: 'shè', m: '射（待考）' },
    { c: '牧', p: 'mù', m: '牧（待考）' },
    { c: '休', p: 'xiū', m: '人倚木而息' },
  ],
};

/* ---------------- DOM 引用 ---------------- */
const tabBar = document.getElementById('tabBar');
const chipGrid = document.getElementById('chipGrid');
const glyphKai = document.getElementById('glyphKai');
const glyphPinyin = document.getElementById('glyphPinyin');
const glyphMean = document.getElementById('glyphMean');
const glyphSvgBox = document.getElementById('glyphSvg');
const glyphSource = document.getElementById('glyphSource');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

/* ---------------- 词表渲染 ---------------- */
let currentCat = 'body';

function renderChips(cat) {
  const words = WORDS[cat];
  chipGrid.innerHTML = '';
  words.forEach((w, i) => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (i === 0 ? ' active' : '');
    btn.textContent = w.c;
    btn.addEventListener('click', () => selectChip(w, btn));
    chipGrid.appendChild(btn);
  });
  if (words.length) selectChip(words[0], chipGrid.querySelector('.chip'));
}

function selectChip(word, el) {
  chipGrid.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  glyphKai.textContent = word.c;
  glyphPinyin.textContent = word.p;
  glyphMean.textContent = word.m;
  glyphSvgBox.innerHTML = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + glyphSvg(word.c) + '</svg>';
  glyphSource.textContent = 'source：自建 SVG 字形库 · ' + word.c + '（待填充）';
}

tabBar.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  tabBar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  currentCat = tab.dataset.cat;
  renderChips(currentCat);
});

/* ---------------- 卜辞卷轴：注入甲骨占位 SVG ---------------- */
document.querySelectorAll('.scroll-word').forEach((node) => {
  const char = node.dataset.char;
  const obi = node.querySelector('.sc-obi');
  if (obi) {
    obi.innerHTML = '<svg viewBox="0 0 100 100" width="44" height="44" xmlns="http://www.w3.org/2000/svg" style="color:inherit">'
      + glyphSvg(char) + '</svg>';
  }
});

/* ---------------- 移动端菜单 ---------------- */
navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));

/* ---------------- 滚动：导航高亮 + 进入动画 ---------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function spyNav() {
  const pos = window.scrollY + 120;
  let current = '';
  sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

const revealTargets = document.querySelectorAll(
  '.strip-item, .pipe-card, .section-head, .chip, .glyph-card, .scroll-paper, .tech-card, .arch-box, .about-inner'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); observer.unobserve(en.target); }
  });
}, { threshold: 0.12 });
revealTargets.forEach(t => { t.classList.add('reveal'); observer.observe(t); });

window.addEventListener('scroll', spyNav, { passive: true });
window.addEventListener('load', () => { spyNav(); renderChips(currentCat); });
