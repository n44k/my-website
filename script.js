// ページ読み込み時にナビリンクの active クラスをセット
window.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// ログイン関数
function login() {
  const input = document.getElementById("loginPassword").value;
  const errorMsg = document.getElementById("loginError");

  // あまり見ないで欲しいっす。ちなみに誕生日。
  if (input === "1001") {
    // ログイン成功 → フォーム非表示、コンテンツ表示
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    errorMsg.style.display = "none";
  } else {
    // エラーメッセージ表示
    errorMsg.style.display = "block";
  }
}
