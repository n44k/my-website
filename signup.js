import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById('signupBtn').addEventListener('click', async () => {
  const username = document.getElementById('signupUsername').value.trim();
  const pin = document.getElementById('signupPin').value.trim();
  const password = document.getElementById('signupPassword').value;
  const error = document.getElementById('signupError');
  const success = document.getElementById('signupSuccess');
  error.textContent = '';
  success.textContent = '';

  if (!username || !pin || !password) {
    error.textContent = 'すべての項目を入力してください。';
    return;
  }
  if (!/^\d{4}$/.test(pin)) {
    error.textContent = 'PINは4桁の数字で入力してください。';
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

    // メールアドレスは仮の形式（Firebase用）
    const email = `${username}@example.com`;

    // Firebase Auth に登録
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Firestore に保存
    await addDoc(collection(db, "users"), {
      uid: userCredential.user.uid,
      username,
      pin,
      email
    });

    success.textContent = '登録に成功しました！ログインページに移動します...';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2500); // 2.5秒後

  } catch (e) {
    error.textContent = e.message;
  }
});
