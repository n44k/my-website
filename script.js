// パスワード式ログイン（簡易認証）
function login() {
  const password = document.getElementById("loginPassword").value;
  const correct = "1001"; // 簡単にパスワード見えちゃうけど、まぁご愛嬌ということで。ちな誕生日。
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
