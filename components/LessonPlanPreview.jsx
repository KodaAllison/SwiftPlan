export default function LessonPlanPreview({ data }) {
    if (!data) {
      return (
        <div className="bg-white text-black p-6 rounded-xl shadow-lg min-h-[300px]">
          <p className="text-gray-600 italic">Fill out the form to see your lesson plan preview.</p>
        </div>
      );
    }
  
    return (
      <div className="bg-white text-black p-6 rounded-xl shadow-lg space-y-3">
        <h2 className="text-xl font-bold mb-4">Preview Plan</h2>
        <p><strong>Objective:</strong> {data.objective}</p>
        <p><strong>Keywords:</strong> {data.keywords || 'N/A'}</p>
        <p><strong>Duration:</strong> {data.duration}</p>
        <p><strong>Adaptations:</strong> {data.notes || 'None'}</p>
      </div>
    );
  }
  