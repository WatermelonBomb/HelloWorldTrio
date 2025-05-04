"use client";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ensureAnon } from '@/lib/firebase';
import { fetchSchedules } from '@/lib/schedules';
import ScheduleCard from '@/app/_components/ScheduleCard';

export default function Home() {
  useEffect(() => { ensureAnon(); }, []);

  const { data: schedules = [] } = useQuery({
    queryKey: ['schedules'],
    queryFn: fetchSchedules,
  });

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TripSync 🚀</h1>

      {schedules.map(s => <ScheduleCard key={s.id} sched={s} />)}

      <a href="/add"
         className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg text-lg">
        ＋
      </a>
    </main>
  );
}
