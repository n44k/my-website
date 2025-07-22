// ページロード時に、現在のURLと一致するナビボタンに active クラスをつける
window.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop(); // e.g. 'about.html'
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
