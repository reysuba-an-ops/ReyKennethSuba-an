// Simple looping typed effect
document.addEventListener('DOMContentLoaded', () => {
  const words = ["Mobile Developer", "UI Designer", "Capstone Developer", "React Native Developer", "Unity & AR Enthusiast"];
  const el = document.getElementById('typed');
  let idx = 0, char = 0, deleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 40;
  const pauseAfter = 1500;

  function tick() {
    const current = words[idx];
    if (!deleting) {
      el.textContent = current.slice(0, char + 1);
      char++;
      if (char === current.length) {
        deleting = true;
        setTimeout(tick, pauseAfter);
      } else {
        setTimeout(tick, typeSpeed + Math.random()*40);
      }
    } else {
      el.textContent = current.slice(0, char - 1);
      char--;
      if (char === 0) {
        deleting = false;
        idx = (idx + 1) % words.length;
        setTimeout(tick, 350);
      } else {
        setTimeout(tick, deleteSpeed);
      }
    }
  }
  tick();
});
