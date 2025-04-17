'use client';

import LessonPlanForm from "../../../../components/LessonPlanForm";

export default function NewLessonPage() {
  const handleGenerate = async (values) => {
    console.log('Generating lesson plan with:', values);
    // Later: call your API here
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Generate a New Lesson Plan</h1>
      <LessonPlanForm onSubmit={handleGenerate} />
    </div>
  );
}
