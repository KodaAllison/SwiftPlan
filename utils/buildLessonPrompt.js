export function buildLessonPrompt(data) {
    return `
  You are a highly experienced teacher creating a detailed, digital-first lesson plan for classroom use.
  
  The lesson topic is: "${data.title}"  
  The subject is: "${data.subject}"  
  The target group is: "${data.ageGroup}"  
  The total lesson duration is: "${data.duration}" minutes  
  The learning objective is: "${data.objective}"  
  ${data.style ? `The teacher prefers the following teaching approach: "${data.style}".` : ''}  
  ${data.notes ? `Consider the following additional context or classroom adaptations: "${data.notes}".` : ''}
  
  Please generate a structured lesson plan that includes the following sections:
  
  1. Learning Objectives – Clearly stated, measurable outcomes.  
  2. Introduction – An engaging starter activity (include duration).  
  3. Main Activities – Sequential, clearly detailed activities with precise timings.  
  4. Differentiation Strategies – At least two explicit methods to support varied pupil needs, including support for students with Special Educational Needs (SEND).  
  5. Engagement Strategy – One interactive, student-led or hands-on approach.  
  6. Extension Tasks – Challenging activities for advanced learners or early finishers.  
  7. Digital Teaching Resources – Generate full content for any worksheets, quiz questions, diagrams, or reflection tasks 
  8. Conclusion – A short reflection or wrap-up activity with timing.
  
  Instructions:  
  • Ensure all sections include specific timings that total exactly ${data.duration} minutes.  
  • Use a formal and concise tone suitable for professional educators.  
  • Ensure all resources are fully digital — no printing or physical materials.  
  • Format using clear ## Section headings for display in a web app.
  `.trim();
  }
      