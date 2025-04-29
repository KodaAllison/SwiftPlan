export default function LessonPlanPreview({ data }) {
    if (!data) {
      return (
        <div className="bg-white text-black p-6 rounded-xl shadow-lg min-h-[30px]">
          <p className="text-gray-600 italic">Fill out the form to see your lesson plan preview.</p>
        </div>
      );
    }
    
    const cleaned = data
      .replace(/^[ \t]*#[^#\n].*$/gm, '') 
      .replace(/\n{3,}/g, '\n\n')             
      .trim();
 
    const sections = cleaned.split(/^##\s+/gm).filter(Boolean);

    return (
      <div className="bg-white text-black p-6 rounded-xl shadow-lg space-y-6 whitespace-pre-wrap">
      <h2 className="text-2xl font-bold mb-4 text-[#5F25D9]">Lesson Plan Preview</h2>

      {sections.map((section, index) => {
        const [titleLine, ...contentLines] = section.split('\n');
        const content = contentLines.join('\n');

        return (
          <details key={index} className="border border-purple-200 rounded-lg p-4 scroll-smooth">
            <summary className="cursor-pointer text-lg font-semibold text-purple-800 mb-2">
              {titleLine.trim()}
            </summary>
            <div className="space-y-2">
              <p>{content.trim()}</p>
            </div>
          </details>
        );
      })}
    </div>
    );
  }
  