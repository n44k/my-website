import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById('signupBtn').addEventListener('click', async () => {
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const pin = document.getElementById('signupPin').value.trim();
  const msg = document.getElementById('signupMessage');
  msg.textContent = '';

  if (!/^\d{4}$/.test(pin)) {
    msg.textContent = 'PINは4桁の数字を入力してください。';
    return;
  }

  try {
    const q = query(collection(db, "users"), where("pin", "==", pin));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      msg.textContent = 'そのPINはすでに使用されています。';
      return;
    }

    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      email: email,
      pin: pin,
      uid: userCred.user.uid
    });
    
    msg.style.color = 'green';
    msg.innerHTML = '登録成功！<br><span class="loading">ログインページへ移動中...</span>';
    
    // リダイレクト
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
    msg.style.color = 'green';
  } catch (err) {
    msg.textContent = `登録失敗: ${err.message}`;
  }
});
