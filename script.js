document.getElementById('openMenu').addEventListener('click', () => {
  document.getElementById('mobilePanel').classList.add('open');
});
document.getElementById('closeMenu').addEventListener('click', () => {
  document.getElementById('mobilePanel').classList.remove('open');
});
document.querySelectorAll('.mobile-panel a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('mobilePanel').classList.remove('open');
  });
});
