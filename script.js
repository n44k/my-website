import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById('loginBtn').addEventListener('click', async () => {
  const pin = document.getElementById('loginPin').value.trim();
  const password = document.getElementById('loginPassword').value;
  const error = document.getElementById('loginError');
  error.textContent = '';

  if (!/^\d{4}$/.test(pin)) {
    error.textContent = 'PINは4桁の数字で入力してください。';
    return;
  }

  try {
    const q = query(collection(db, "users"), where("pin", "==", pin));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      error.textContent = 'そのPINは存在しません。';
      return;
    }

    const user = snapshot.docs[0].data();
    const email = user.email;

    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'admin.html'; // ログイン成功後の遷移先（任意）
  } catch (err) {
    error.textContent = `ログイン失敗: ${err.message}`;
  }
});
