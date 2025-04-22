export default function LessonPlanPreview({ data }) {
    if (!data) {
      return (
        <div className="bg-white text-black p-6 rounded-xl shadow-lg min-h-[300px]">
          <p className="text-gray-600 italic">Fill out the form to see your lesson plan preview.</p>
        </div>
      );
    }
    
    const sections = data.split('## ').filter(Boolean);

    return (
      <div className="bg-white text-black p-6 rounded-xl shadow-lg space-y-6 whitespace-pre-wrap">
      <h2 className="text-2xl font-bold mb-4 text-[#5F25D9]">Lesson Plan Preview</h2>

      {sections.map((section, index) => {
        const [titleLine, ...contentLines] = section.split('\n');
        const content = contentLines.join('\n');

        return (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-semibold text-purple-800">{titleLine.trim()}</h3>
            <div className="space-y-2">
              {content.split('### ').map((sub, i) => {
                if (i === 0) {
                  return <p key={i}>{sub.trim()}</p>;
                }

                const [subTitle, ...subContent] = sub.split('\n');
                return (
                  <div key={i}>
                    <h4 className="font-medium text-indigo-600">{subTitle.trim()}</h4>
                    <p>{subContent.join('\n').trim()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    );
  }
  