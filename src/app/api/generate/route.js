import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  const prompt = `Create a ${body.duration} lesson plan for ${body.subject} at ${body.ageGroup} level. The topic is "${body.title}". The objective is: ${body.objective}. Preferred style: ${body.style || 'none'}. Keywords: ${body.keywords || 'none'}. Notes: ${body.notes || 'none'}. Return the plan in sections: starter, main, extension, and adaptations.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const json = await response.json();
    const output = json.choices?.[0]?.message?.content;

    return NextResponse.json({ output });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
