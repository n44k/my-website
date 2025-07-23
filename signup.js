import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById('signupBtn').addEventListener('click', async () => {
  const username = document.getElementById('signupUsername').value.trim();
  const pin = document.getElementById('signupPin').value.trim();
  const password = document.getElementById('signupPassword').value;

  const errorEl = document.getElementById('signupError');
  const successEl = document.getElementById('signupSuccess');

  errorEl.textContent = '';
  successEl.textContent = '';

  if (!username || !pin || !password) {
    errorEl.textContent = 'すべての項目を入力してください。';
    return;
  }

  if (!/^\d{4}$/.test(pin)) {
    errorEl.textContent = 'PINは4桁の数字で入力してください。';
    return;
  }

  try {
    // PINの重複チェック
    const qPin = query(collection(db, "users"), where("pin", "==", pin));
    const pinSnap = await getDocs(qPin);
    if (!pinSnap.empty) {
      throw new Error('このPINは既に使われています。');
    }

    // ユーザー名の重複チェック
    const qUser = query(collection(db, "users"), where("username", "==", username));
    const userSnap = await getDocs(qUser);
    if (!userSnap.empty) {
      throw new Error('このユーザー名は既に使われています。');
    }

    const email = `${username}@example.com`;

    // Firebase 認証にユーザー作成
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Firestore にユーザー情報保存
    await addDoc(collection(db, "users"), {
      uid: userCredential.user.uid,
      username,
      pin,
      email
    });

    // ✅ 成功メッセージ表示
    successEl.textContent = '登録に成功しました！ログインページに移動します...';

    // ✅ 2.5秒後にログインページへ自動リダイレクト
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2500);

  } catch (error) {
    errorEl.textContent = error.message || '登録に失敗しました。';
  }
});
