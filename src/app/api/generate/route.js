import { NextResponse } from 'next/server';
import { buildLessonPrompt } from '../../../../utils/buildLessonPrompt';
import { lessonPlanSchema } from '../../../../lib/lessonPlanSchema';

/**
 * POST /api/lesson/generate
 *
 * This endpoint receives a lesson plan form submission,
 * validates it with Zod, builds a prompt from the data,
 * and sends it to the OpenAI API to generate lesson plan
 *
 * Return Values:
 * - 200 with generated lesson content
 * - 400 if input validation fails
 * - 502 if OpenAI fails to return output
 * - 500 on unexpected server error
 *
 * @param {Request} req - The incoming POST request with JSON lesson plan data
 * @returns {Response} JSON containing generated lesson plan or an error
 */

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
