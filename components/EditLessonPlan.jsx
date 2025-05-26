/**
 * EditLessonForm Component
 * 
 * Allows teachers to view and edit an existing lesson plan.
 * - Displays lesson metadata (subject, age group, title, last updated date).
 * - Provides a text editor for editing lesson content.
 * - Includes actions to save changes or download the lesson plan as a file.
 * 
 * @param {object} lesson - The lesson data object
 * @param {string} content - The current editable lesson content
 * @param {function} setContent - Setter function updates content state
 * @param {boolean} isContentEdited - Boolean to see if changes were made
 * @param {function} handleSave - Function for when the save button is clicked
 **/

'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditLessonForm({ lesson, content, setContent, isContentEdited, handleSave }) {
  if (!lesson) return null;

  return (
    <div className="bg-[#5F25D9] p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-white mb-6">Edit Lesson Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-1">Subject</label>
          <p className="bg-white text-black rounded px-4 py-2">{lesson.subject}</p>
        </div>
        <div>
          <label className="block font-semibold mb-1">Age Group</label>
          <p className="bg-white text-black rounded px-4 py-2">{lesson.yearGroup}</p>
        </div>
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <p className="bg-white text-black rounded px-4 py-2">{lesson.title}</p>
        </div>
        <div>
          <label className="block font-semibold mb-1">Last Updated</label>
          <p className="bg-white text-black rounded px-4 py-2">{new Date(lesson.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div>
        <label className="block font-semibold text-lg mb-2">Lesson Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="bg-white text-black"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
      <a
            href={`/api/lesson/download/${lesson.id}`}
            className="px-6 py-2 rounded-full border border-[#00ff99] bg-[#5F25D9] hover:bg-[#00ff99] hover:text-[#5F25D9] text-[#00ff99] transition"
            download
            >
            Download
        </a>
        <button
          onClick={handleSave}
          className={`px-6 py-2 rounded-full transition bg-[#00ff99] text-[#5F25D9] border border-[#00ff99] hover:bg-white`}
        >
          Save
        </button>

        
      </div>
    </div>
  );
}
