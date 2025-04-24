'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EditLessonPage() {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!id) return;
  
      const fetchLesson = async () => {
        try {
          const res = await fetch(`/api/lesson/${id}`);
          if (!res.ok) throw new Error('Failed to fetch lesson');
          const data = await res.json();
          setLesson(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLesson();
    }, [id]);
  
    if (loading) {
      return <p className="text-white p-6">Loading lesson data...</p>;
    }
  
    if (!lesson) {
      return <p className="text-red-500 p-6">Lesson not found.</p>;
    }

  return (
    <main className="p-6 max-w-5xl mx-auto text-white space-y-6">
    <h1 className="text-3xl font-bold text-[#00ff99]">Edit Lesson Plan</h1>

    <div className="bg-[#5F25D9] p-4 rounded-xl shadow-md space-y-2">
      <div>
        <h2 className="text-xl font-semibold">{lesson.title}</h2>
      </div>

      <div className="flex flex-wrap gap-8 pt-2">
        <div>
          <h2 className="font-semibold">Subject</h2>
          <p>{lesson.subject}</p>
        </div>

        <div>
          <h2 className="font-semibold">Age Group</h2>
          <p>{lesson.yearGroup}</p>
        </div>

        <div>
          <h2 className="font-semibold">Last Updated</h2>
          <p>{new Date(lesson.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>

    <div className="bg-white text-black p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Lesson Content (read-only for now)</h2>
      <pre className="whitespace-pre-wrap">{lesson.content}</pre>
    </div>
  </main>
  );
}
