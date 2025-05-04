// schedules.js
import { db, ensureAnon } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Firestore に schedule を追加
 * @param {{ place: string, arriveIso: string }} data
 */
export async function addSchedule(data) {
  // ① 必ずユーザーを確定させる（uid を得る）
  const user = await ensureAnon();   // ← ここがポイント

  // ② uid が確定した“あと”でコレクション参照を作る
  const col = collection(db, `users/${user.uid}/schedules`);

  // ③ ドキュメントを追加
  await addDoc(col, {
    ...data,
    createdAt: serverTimestamp(),
  });
}
