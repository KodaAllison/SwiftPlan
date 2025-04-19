import { NextResponse } from 'next/server';
import { buildLessonPrompt } from '../../../../utils/buildLessonPrompt';
import { lessonPlanSchema } from '../../../../lib/lessonPlanSchema';

export async function POST(req) {
  const body = await req.json();
  const result = lessonPlanSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({error: 'Invalid input'}, {status: 400})
  }

    const prompt = buildLessonPrompt(result.data)

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

    if (!output) {
        return  NextResponse.json({error: 'No response from OpenAI'}, {status:502})
    }

    return NextResponse.json({ output });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
