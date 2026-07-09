import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenAI } from '@google/genai';
import { validateBrief } from '@/app/utils/validateBrief';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});

// const anthropic = new Anthropic({
//       apiKey: process.env.ANTHROPIC_API_KEY,
//     });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, problemStatement, desiredOutputs, durationInWeeks, hoursPerWeek } = body;

    const userContent = `Company Name: ${companyName}
                        \nProblem Statement: ${problemStatement}
                        \nDesired Outputs: ${desiredOutputs}
                        \nDuration: ${durationInWeeks} weeks
                        \nHours per week: ${hoursPerWeek}`;

    const promptPath = path.join(process.cwd(), 'src', 'app','prompts', 'systemPrompt.txt');
    let prompt = fs.readFileSync(promptPath, 'utf8');
    prompt += userContent;

    // Original Claude variation

    // let response = await anthropic.messages.create({
    //   model: 'claude-3-5-sonnet-20241022',
    //   system: prompt,
    //   messages: [{ role: 'user', content: userContent }],
    // });

    // const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    // End of claude variation

    // Gemini variation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text;
    // End of Gemini variation

    if (!responseText) {
      throw new Error("No response string received from the model");
    }

    const generatedBrief = JSON.parse(responseText);

    const isValid = validateBrief(generatedBrief, Number(durationInWeeks));

    if (!isValid) {
      return NextResponse.json(
        { error: 'Generated brief failed validation check' }, 
        { status: 500 }
      );
    }

    return NextResponse.json(generatedBrief);

  } catch (error: any) {
    console.error("Route Handler Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}