'use client';

import LessonPlanForm from "../../../../components/LessonPlanForm";
import LessonPlanPreview from "../../../../components/LessonPlanPreview"; 
import { useState } from 'react';


export default function NewLessonPage() {
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (values) => {
    console.log('Generating lesson plan with:', values);
    setLoading(true);
    setPlanData(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const json = await res.json();
  
      if (!res.ok) {
        console.error('Error from API:', json.error);
        return;
      }
  
      setPlanData(json.output);
    } catch (err) {
      console.error('Failed to generate lesson plan:', err);
    } finally {
      setLoading(false); 
    }
    
  };

  const handleSave = async (formValues) => {
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: planData, 
          title: formValues.title || 'Untitled Plan',
          subject: formValues.subject || 'Unknown',
          yearGroup: formValues.ageGroup || 'Unknown',
          tags: [], 
        }),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert('Lesson plan saved successfully!');
      } else {
        alert('Failed to save lesson plan: ' + result.error);
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert('Something went wrong while saving.');
    }
  };
  

  return (
    <main className="min-h-screen bg-white text-white px-4 py-6">
      <div className="max-w-400 mx-auto bg-[#5F25D9] flex flex-col rounded-2xl md:flex-row gap-6 px-6 py-6">
        {/* Lefthand side = Form */}
        <div className="w-full md:w-1/2">
          <LessonPlanForm onSubmit={handleGenerate} onSave={handleSave} showSave={!!planData} />
        </div>

        {/* Righthand side = Preview */}
        <div className="w-full md:w-1/2 mt-6">
        {loading ? (
            <div className="bg-white text-black p-6 rounded-xl shadow-lg animate-pulse min-h-[200px] flex items-center justify-center">
              <p className="text-gray-500 italic">Generating lesson plan preview...</p>
            </div>
          ) : (
          <LessonPlanPreview data={planData} />
          )}
        </div>
      </div>
    </main>
  );
}
