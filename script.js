import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "adminSecret123"; // 管理者パスワード（適宜変更してください）

document.getElementById('loginBtn').addEventListener('click', async () => {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const error = document.getElementById('loginError');
  error.textContent = '';

  if (!username || !password) {
    error.textContent = 'ユーザー名とパスワードを入力してください。';
    return;
  }

  try {
    // 管理者判定
    if (username === ADMIN_USERNAME) {
      if (password === ADMIN_PASSWORD) {
        window.location.href = 'admin.html';
        return;
      } else {
        throw new Error('ログインに失敗しました。');
      }
    }

    // 通常ユーザーはPIN（username）+パスワードでログイン
    if (!/^\d{4}$/.test(username)) {
      throw new Error('PINは4桁の数字で入力してください。');
    }

    // PINからユーザーのメールを取得
    const q = query(collection(db, "users"), where("pin", "==", username));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error('ログインに失敗しました。');
    }
    const user = snapshot.docs[0].data();
    const email = user.email;

    // Firebase Authでログイン
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'home.html';

  } catch (e) {
    error.textContent = e.message;
  }
});
