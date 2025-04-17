'use client';

import LessonPlanForm from "../../../../components/LessonPlanForm";
import LessonPlanPreview from "../../../../components/LessonPlanPreview"; 
import { useState } from 'react';


export default function NewLessonPage() {
    const [planData, setPlanData] = useState(null);

    const handleGenerate = async (values) => {
    console.log('Generating lesson plan with:', values);
    setPlanData(values)
    

    // TODO: API call here
  };

  return (
    <main className="min-h-screen bg-white text-white px-4 py-6">
      <div className="max-w-6xl mx-auto bg-[#5F25D9] flex flex-col md:flex-row gap-6 px-6 py-6">
        {/* Lefthand side = Form */}
        <div className="w-full md:w-1/2">
          <LessonPlanForm onSubmit={handleGenerate} />
        </div>

        {/* Righthand side = Preview */}
        <div className="w-full md:w-1/2 mt-6">
          <LessonPlanPreview data={planData} />
        </div>
      </div>
    </main>
  );
}
