'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import EditLessonForm from '../../../../../components/EditLessonPlan';

export default function EditLessonPage() {
    const { id } = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState([]);
  
    useEffect(() => {
      if (!id) return;
  
      const fetchLesson = async () => {
        try {
          const res = await fetch(`/api/lesson/${id}`);
          if (!res.ok) throw new Error('Failed to fetch lesson');
          const data = await res.json();
          setLesson(data);
          setContent(data.content || '');
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLesson();
    }, [id]);
  
    const isContentEdited = content !== (lesson?.content || '');
    const handleSave = async () => {
        const res = await fetch(`/api/lesson/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
    
        if (res.ok) {
          router.push('/Lesson/Dashboard');
        } else {
          alert('Failed to save lesson content.');
        }
      };

    if (loading) {
      return <p className="text-white p-6">Loading lesson data...</p>;
    }
  
    if (!lesson) {
      return <p className="text-red-500 p-6">Lesson not found.</p>;
    }

  return (
    <main className="p-6 max-w-6xl mx-auto text-white">
      <div className="mb-4">
        <Link
          href="/Lesson/Dashboard"
          className="text-sm text-[#5F25D9] underline hover:text-[#00ff99] transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <EditLessonForm
        lesson={lesson}
        content={content}
        setContent={setContent}
        isContentEdited={isContentEdited}
        handleSave={handleSave}
      />
    </main>
  );
}