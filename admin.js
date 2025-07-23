import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert('ログインが必要です');
    window.location.href = 'index.html';
    return;
  }

  // 管理者はadminユーザーとして認証されていないため
  // ここでは特にアクセス制限はしません
  // 本格的な管理権限管理は別途検討してください

  const listDiv = document.getElementById('userList');
  listDiv.textContent = 'ユーザー一覧を読み込み中...';

  try {
    const snapshot = await getDocs(collection(db, "users"));
    listDiv.textContent = '';

    snapshot.forEach(doc => {
      const data = doc.data();
      const p = document.createElement('p');
      p.textContent = `ユーザー名: ${data.username} | PIN: ${data.pin}`;
      listDiv.appendChild(p);
    });
  } catch {
    listDiv.textContent = 'ユーザー情報の取得に失敗しました。';
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});
