import { NextResponse } from 'next/server';

// This forces the route to be dynamic, which is usually required for API routes that take POST body
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { topic, age, level, slideCount } = await req.json();

    const apiKey = "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";
    const invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions";

    const systemPrompt = `Eres un experto diseñador curricular de la Universidad de Oxford. Tu objetivo es crear contenido de clase de altísima calidad en español para estudiantes de ${age} con un nivel ${level}. 
El tema es: "${topic}".
Necesitas proveer suficiente material rico para llenar ${slideCount} actividades.

Debes devolver EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura, sin formato Markdown alrededor:
{
  "readings": [ { "title": "...", "text": "Un cuento o lectura de al menos 3 párrafos", "question": "pregunta", "options": ["A", "B", "C"], "correctIndex": 0, "imageKeyword": "palabra en ingles para buscar foto" } ],
  "vocabulary": [ { "spanish": "...", "english": "...", "pronunciation": "...", "example": "..." } ],
  "grammarRules": [ { "ruleTitle": "...", "explanation": "...", "example": "..." } ],
  "riddles": [ { "riddle": "...", "answer": "..." } ],
  "tonguetwisters": [ { "twister": "...", "level": "medium" } ],
  "trueFalse": [ { "statement": "...", "isTrue": true, "explanation": "..." } ],
  "multipleChoice": [ { "question": "...", "options": [ {"text": "...", "isCorrect": true}, {"text": "...", "isCorrect": false} ] } ],
  "dialogues": [ { "characterA": "...", "characterB": "...", "lines": [ {"speaker": "A", "text": "..."}, {"speaker": "B", "text": "..."} ] } ]
}

Asegúrate de generar AL MENOS 5 elementos en cada arreglo para tener variedad.`;

    const payload = {
      model: "stepfun-ai/step-3.7-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Genera el material educativo para el tema: ${topic}` }
      ],
      max_tokens: 4096,
      temperature: 0.7,
      stream: false
    };

    const response = await fetch(invoke_url, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Nvidia API Error:", errorText);
      return NextResponse.json({ error: 'Failed to fetch from Nvidia API' }, { status: 500 });
    }

    const data = await response.json();
    const contentStr = data.choices[0].message.content;
    
    // Attempt to parse JSON safely (removing markdown code blocks if the LLM hallucinated them)
    const jsonMatch = contentStr.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : contentStr;
    
    const parsedData = JSON.parse(jsonStr);

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
