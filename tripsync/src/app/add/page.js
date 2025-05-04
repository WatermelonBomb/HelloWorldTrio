"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';  
import { useQueryClient } from '@tanstack/react-query';
import { addSchedule } from '@/lib/schedules';
import { ensureAnon } from '@/lib/firebase'; 

export default function AddPage() {
  const router       = useRouter();
  const queryClient  = useQueryClient();

  useEffect(() => {
        ensureAnon();
      }, []);

  const [place, setPlace]   = useState('');
  const [start, setStart]   = useState('');   // "YYYY‑MM‑DDTHH:mm"
  const [end, setEnd]       = useState('');

  const save = async () => {
    // 入力チェック
    if (!place || !start || !end) {
      alert('場所名と日時をすべて入力してください');
      return;
    }

    await addSchedule({
      place,
      startAt: new Date(start).toISOString(), // 文字列 → Date → ISO
      endAt  : new Date(end).toISOString(),
      status : 'pending',
    });

    // 一覧のキャッシュを無効化してホームで即反映
    queryClient.invalidateQueries(['schedules']);
    router.push('/');
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">目的地を追加</h2>

      {/* 場所名 */}
      <input
        className="w-full border p-2"
        placeholder="場所名"
        value={place}
        onChange={e => setPlace(e.target.value)}
      />

      {/* 開始日時 */}
      <input
        type="datetime-local"
        className="w-full border p-2"
        value={start}
        onChange={e => setStart(e.target.value)}
      />

      {/* 終了日時 */}
      <input
        type="datetime-local"
        className="w-full border p-2"
        value={end}
        onChange={e => setEnd(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        保存
      </button>
    </main>
  );
}
