const section = document.getElementById('Page5');
const text = document.getElementById('page5-text');
const text2 = document.getElementById('page5-text2');
const text3 = document.getElementById('page5-text3');
const girl = document.getElementById('walking');
const road= document.getElementById('road');
const refuse= document.getElementById('page5-text4');
const hanging= document.getElementById('hanging');
const reaching = document.getElementById("reaching");
const holding = document.getElementById("holding");
let ticking = false;



reaching.addEventListener("click", () => {
    reaching.style.display = "none";
    holding.style.display = "block";
});
// moves one element across, but only during the [start, end] slice of scroll
function slide(el, p, start, end, fromX, toX) {
  let local = (p - start) / (end - start);
  local = Math.max(0, Math.min(1, local));
  const eased = local;      // ease-out: decelerate
  const x = fromX + (toX - fromX) * eased;
  el.style.transform = 'translate(calc(-50% + ' + x + 'vw), -50%)';
}

function slideRight(el, p, start, end, fromX, toX) {
  let local = (p - start) / (end - start);
  local = Math.max(0, Math.min(1, local));
  const eased = local;      // linear
  const x = fromX + (toX - fromX) * eased;
  el.style.transform = 'translate(' + x + 'vw, -50%)';
}

function sliderefuse(el, p, start, end, from, to) {
  let local = (p - start) / (end - start);
  local = Math.max(0, Math.min(1, local));
  const eased = local;
  const x = from + (to - from) * eased;
  el.style.transform = 'translate(' + x + 'vw, -50%)';
}

function slidegirl(el, p, start, end, from, to) {
  let local = (p - start) / (end - start);
  local = Math.max(0, Math.min(1, local));
  const eased = local;
  const x = from + (to - from) * eased;
  el.style.transform = 'translateX(' + x + 'vw)';   // <-- this line was missing
}

function slideroad(el, p, start, end, from, to) {
  let local = (p - start) / (end - start);
  local = Math.max(0, Math.min(1, local));
  const eased = local;
  const x = from + (to - from) * eased;
  el.style.transform = 'translateX(' + x + 'vw)';   // <-- this line was missing
}


function update() {
  ticking = false;
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  let p = -rect.top / (rect.height - vh);
  p = Math.max(0, Math.min(1, p));

  slide(text,      p, 0,     0.333, 80, -79);   // crosses right -> left
  slide(text2,      p, 0.333, 0.666, 90, -90);   // crosses right -> left


  if (p < 0.888) {
    slideRight(text3, p, 0.666, 0.888, 60, -10);
    sliderefuse(refuse, p, 0.888, 1.000, 60, 60);
    slideroad(hanging, p, 0.888, 1, 60, 60);
  }
  else {
    slideRight(text3, p, 0.888, 1.000, -10, -100);
    slidegirl(girl, p, 0.888, 1.000, 0, -90);
    slideroad(road, p, 0.888, 1.000, 0, -100);
    sliderefuse(refuse, p, 0.888, 1.000, 80, -20);
    slideroad(hanging, p, 0.888, 1, 85, -17);
  }
}


window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}, { passive: true });
window.addEventListener('resize', update, { passive: true });
update();

