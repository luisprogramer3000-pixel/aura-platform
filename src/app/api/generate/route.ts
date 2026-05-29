import { NextResponse } from 'next/server';

// This forces the route to be dynamic, which is usually required for API routes that take POST body
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { topic, age, level, slideCount } = await req.json();

    const apiKey = "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";
    const invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions";

    const itemsCount = Math.max(5, Math.ceil(slideCount / 2));
    
    const systemPrompt = `Eres un experto diseñador curricular y pedagogo de la Universidad de Oxford. Tu objetivo es crear contenido de clase de altísima calidad en español para estudiantes de ${age} con un nivel ${level}.
El tema de la clase es: "${topic}".

INSTRUCCIONES CLAVE:
1. HILO CONDUCTOR: Inventa un par de personajes (por ejemplo, Ana y Carlos, o nombres acordes al tema) que actúen como hilo conductor a lo largo de TODA la lección. Ellos deben protagonizar las lecturas, diálogos y ejemplos gramaticales.
2. CALIDAD DE CONTENIDO: Razona como un tutor experto. La gramática debe estar explicada de forma impecable. Las preguntas deben hacer pensar al alumno.
3. ESTILO VISUAL: Sugiere en 'imageKeyword' términos muy específicos (en inglés) que un diseñador usaría para buscar fotografías de archivo de alta calidad (ej. "students studying library bright", "two professionals talking office").
4. ESCALABILIDAD: Necesitamos contenido abundante para ${slideCount} diapositivas. Genera AL MENOS ${itemsCount} elementos en CADA arreglo para evitar que la plataforma repita diapositivas.

Debes devolver EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura, sin formato Markdown alrededor:
{
  "readings": [ { "title": "...", "text": "Historia con los personajes...", "question": "pregunta inferencial", "options": ["A", "B", "C"], "correctIndex": 0, "imageKeyword": "photo search term" } ],
  "vocabulary": [ { "spanish": "...", "english": "...", "pronunciation": "...", "example": "Oración usando a los personajes..." } ],
  "grammarRules": [ { "ruleTitle": "...", "explanation": "...", "example": "..." } ],
  "riddles": [ { "riddle": "...", "answer": "..." } ],
  "tonguetwisters": [ { "twister": "...", "level": "medium" } ],
  "trueFalse": [ { "statement": "...", "isTrue": true, "explanation": "..." } ],
  "multipleChoice": [ { "question": "...", "options": [ {"text": "...", "isCorrect": true}, {"text": "...", "isCorrect": false} ] } ],
  "dialogues": [ { "characterA": "Personaje 1", "characterB": "Personaje 2", "lines": [ {"speaker": "A", "text": "..."}, {"speaker": "B", "text": "..."} ] } ]
}`;

    const providers = [
      { key: "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", model: "stepfun-ai/step-3.7-flash" },
      { key: "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", model: "minimaxai/minimax-m2.7" }
    ];

    let contentStr = '';

    for (const provider of providers) {
      try {
        const payload = {
          model: provider.model,
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
            "Authorization": `Bearer ${provider.key}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          contentStr = data.choices[0].message.content;
          break; // Success, exit loop
        } else {
          console.error(`Nvidia API Error with ${provider.model}:`, await response.text());
        }
      } catch (err) {
        console.error(`Fetch error with ${provider.model}:`, err);
      }
    }

    if (!contentStr) {
      return NextResponse.json({ error: 'All Nvidia APIs failed' }, { status: 500 });
    }
    
    
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
