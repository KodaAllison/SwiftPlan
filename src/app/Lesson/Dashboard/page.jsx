'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const session = useSession();

  useEffect(() => {
    fetch('/api/lesson')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error('Failed to load plans', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlans = plans.filter(plan =>
    plan.title.toLowerCase().includes(search.toLowerCase()) ||
    plan.subject.toLowerCase().includes(search.toLowerCase()) ||
    plan.yearGroup.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className='text-white p-6'>
      <div className="w-full mx-auto bg-[#5F25D9] rounded-2xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-6">My Lesson Plans</h1>
        
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 mb-6 rounded-full border-2 border-[#00ff99] text-white"
        />

        {loading ? (
          <p className="text-center">Loading plans...</p>
        ) : (
          <div className="space-y-4">
            {filteredPlans.length === 0 ? (
              <p className="text-center">No lesson plans found.</p>
            ) : (
              filteredPlans.map(plan => (
                <div
                  key={plan.id}
                  className="flex justify-between items-center border-b border-[#00ff99] pb-2 text-white"
                >
                  <div className="text-sm md:text-base">
                    {plan.yearGroup} - {plan.subject} - {plan.title}
                  </div>
                  <div className="text-right text-xs md:text-sm flex gap-3">
                    <span>{new Date(plan.createdAt).toLocaleDateString()}</span>
                    <Link href={`/Lesson/Edit/${plan.id}`} className="text-[#00ff99] font-bold">[EDIT]</Link>
                    <Link href={`/api/lesson/download/${plan.id}`} className="text-white">[DOWNLOAD]</Link>
                    <button
                      className="text-red-400 cursor-pointer" 
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this lesson plan?')) {
                          try {
                            const res = await fetch(`/api/lesson/${plan.id}`, { method: 'DELETE' });
                            if (res.ok) {
                              setPlans(prev => prev.filter(p => p.id !== plan.id));
                            } else {
                              alert('Failed to delete.');
                            }
                          } catch (err) {
                            console.error('Delete failed', err);
                            alert('Something went wrong.');
                          }
                        }
                      }} 
                    >
                      [DELETE]
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-8 text-right">
          <Link
            href="/Lesson/New"
            className="inline-block px-8 py-2 rounded-full border border-[#00ff99] hover:bg-[#5F25D9] bg-[#00ff99] text-[#5F25D9] hover:text-[#00ff99] transition">
            Create New
          </Link>
        </div>
      </div>
    </main>
  );
}