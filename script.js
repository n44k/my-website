// パスワード式ログイン（簡易認証）
function login() {
  const password = document.getElementById("loginPassword").value;
  const correct = "1234"; // 任意のパスワードに変更可
  const error = document.getElementById("loginError");

  if (password === correct) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  } else {
    error.style.display = "block";
  }
}

// ナビゲーションハイライト処理
window.addEventListener("DOMContentLoaded", () =>
