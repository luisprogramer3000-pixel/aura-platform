import { Slide, SlideElement } from './types';

// Standard local assets presets
export const IMAGE_PRESETS = [
  'assets/dr_madrid.png',
  'assets/mountain_picnic.png',
  'assets/party_friends.png',
  'assets/sunny_sky.png',
  'assets/woman_cooking.png'
];

export const INITIAL_SLIDES: Slide[] = [
  // Slide 1: Welcome Cover
  {
    id: 'slide-initial-1',
    type: 'cover',
    background: '#fcfbf9',
    transition: 'fade',
    elements: [
      {
        id: 'el-1-title',
        type: 'title',
        left: 80,
        top: 140,
        width: 864,
        height: 120,
        zIndex: 2,
        content: 'La Clase de Español',
        fontSize: 64,
        color: '#1e3a8a',
        align: 'center',
        bold: true,
        italic: false,
        animation: 'fade',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: ''
      },
      {
        id: 'el-1-sub',
        type: 'text',
        left: 100,
        top: 260,
        width: 824,
        height: 120,
        zIndex: 2,
        content: 'Nivel A1-A2 • Vocabulario y Expresiones\n\nAuraSpanish AI Builder',
        fontSize: 24,
        color: '#334155',
        align: 'center',
        bold: false,
        italic: false,
        animation: 'fade',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: ''
      },
      { id: 'el-1-line', type: 'graphic', left: 412, top: 250, width: 200, height: 4, zIndex: 1, shapeType: 'line', backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }
    ]
  },
  
  // Slide 2: Vocabulary
  {
    id: 'slide-initial-2',
    type: 'vocab',
    background: '#fcfbf9',
    transition: 'slide',
    elements: [
      {
        id: 'el-2-title',
        type: 'title',
        left: 80,
        top: 40,
        width: 864,
        height: 70,
        zIndex: 2,
        content: 'Vocabulario Activo: La Cocina',
        fontSize: 36,
        color: '#1e3a8a',
        align: 'center',
        bold: true,
        italic: false,
        animation: 'fade'
      },
      {
        id: 'el-2-img',
        type: 'image',
        left: 80,
        top: 150,
        width: 420,
        height: 320,
        zIndex: 3,
        src: 'assets/woman_cooking.png',
        alt: 'Mujer cocinando en la cocina',
        contain: false,
        borderRadius: 0,
        borderWidth: 2,
        borderColor: '#1e3a8a'
      },
      {
        id: 'el-2-card',
        type: 'vocabulary',
        left: 540,
        top: 150,
        width: 400,
        height: 320,
        zIndex: 3,
        spanish: 'Cocinar',
        english: 'To cook',
        pronunciation: '/ko-si-’nar/',
        example: 'Yo cocino la cena en mi casa todos los días.',
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        padding: 24
      }
    ]
  },

  // Slide 3: Grammar explanation
  {
    id: 'slide-initial-3',
    type: 'grammar',
    background: '#fcfbf9',
    transition: 'fade',
    elements: [
      {
        id: 'el-3-title',
        type: 'title',
        left: 80,
        top: 40,
        width: 864,
        height: 70,
        zIndex: 2,
        content: 'Gramática Clave',
        fontSize: 36,
        color: '#1e3a8a',
        align: 'left',
        bold: true,
        italic: false
      },
      {
        id: 'el-3-card',
        type: 'grammar',
        left: 80,
        top: 130,
        width: 864,
        height: 360,
        zIndex: 3,
        ruleTitle: 'El verbo GUSTAR',
        explanation: 'En español, el verbo gustar funciona de manera diferente al inglés. No conjugamos el verbo según la persona que siente, sino según las cosas que gustan.',
        formula: 'Pronombre (Me/Te/Le/Nos/Os/Les) + GUSTA (Singular) / GUSTAN (Plural)',
        example: 'Me gusta el chocolate 🍫\nNos gustan las montañas 🏔️',
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderWidth: 2,
        borderColor: '#1e3a8a',
        padding: 24
      }
    ]
  },

  // Slide 4: Quiz
  {
    id: 'slide-initial-4',
    type: 'quiz',
    background: '#fcfbf9',
    transition: 'scale',
    elements: [
      {
        id: 'el-4-title',
        type: 'title',
        left: 80,
        top: 50,
        width: 864,
        height: 70,
        zIndex: 2,
        content: 'Cuestionario de Comprensión',
        fontSize: 36,
        color: '#1e3a8a',
        align: 'left',
        bold: true,
        italic: false
      },
      {
        id: 'el-4-quiz',
        type: 'quiz',
        left: 160,
        top: 140,
        width: 700,
        height: 350,
        zIndex: 3,
        question: 'Elige la opción correcta para completar la oración:\n"A nosotros _______ mucho las manzanas rojas."',
        options: [
          'nos gusta',
          'nos gustan',
          'nos gusto'
        ],
        correctIndex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        padding: 20
      }
    ]
  },

  // Slide 5: Dialogue
  {
    id: 'slide-initial-5',
    type: 'dialogue',
    background: '#fcfbf9',
    transition: 'slide',
    elements: [
      {
        id: 'el-5-title',
        type: 'title',
        left: 80,
        top: 40,
        width: 864,
        height: 60,
        zIndex: 2,
        content: 'Práctica: Planificando una fiesta',
        fontSize: 36,
        color: '#1e3a8a',
        align: 'left',
        bold: true,
        italic: false
      },
      {
        id: 'el-5-dialogue',
        type: 'dialogue',
        left: 80,
        top: 120,
        width: 864,
        height: 380,
        zIndex: 3,
        characterA: 'Carlos',
        characterB: 'María',
        lines: [
          { speaker: 'A', text: 'Hola, María. ¿Estás lista para la fiesta de mañana?' },
          { speaker: 'B', text: '¡Hola! Sí, pero me falta comprar comida. ¿Tenemos manzanas en casa?' },
          { speaker: 'A', text: 'No, no tenemos. Necesitamos comprar manzanas, plátanos y un pastel.' },
          { speaker: 'B', text: 'Perfecto. Voy a ir al supermercado ahora mismo. ¡Nos vemos luego!' }
        ],
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#cbd5e1'
      }
    ]
  },

  // Slide 6: Speaking practice
  {
    id: 'slide-initial-6',
    type: 'speaking',
    background: '#fcfbf9',
    transition: 'zoom',
    elements: [
      {
        id: 'el-6-title',
        type: 'title',
        left: 80,
        top: 50,
        width: 864,
        height: 70,
        zIndex: 2,
        content: 'Actividad de Habla',
        fontSize: 36,
        color: '#1e3a8a',
        align: 'left',
        bold: true,
        italic: false
      },
      {
        id: 'el-6-speak',
        type: 'speaking',
        left: 160,
        top: 140,
        width: 700,
        height: 340,
        zIndex: 3,
        phrase: 'El fin de semana pasado, Carlos fue a las montañas con sus amigos.',
        translation: 'Last weekend, Carlos went to the mountains with his friends.',
        hint: 'Enfatiza la correcta pronunciación de "fin de semana" y vocaliza la "ñ" en "montañas".',
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderWidth: 2,
        borderColor: '#1e3a8a',
        padding: 24
      }
    ]
  },

  // Slide 7: Drag & Drop Match
  {
    id: 'slide-initial-7',
    type: 'dragdrop',
    background: '#fcfbf9',
    transition: 'fade',
    elements: [
      {
        id: 'el-7-title',
        type: 'title',
        left: 80,
        top: 50,
        width: 864,
        height: 70,
        zIndex: 2,
        content: 'Une las columnas',
        fontSize: 36,
        color: '#1e3a8a',
        align: 'center',
        bold: true,
        italic: false
      },
      {
        id: 'el-7-drag',
        type: 'dragdrop',
        left: 112,
        top: 140,
        width: 800,
        height: 350,
        zIndex: 3,
        instruction: 'Une cada palabra en la columna izquierda con su opuesto correcto a la derecha.',
        pairs: [
          { id: 'p1', left: 'Caliente (Hot)', right: 'Frío (Cold)' },
          { id: 'p2', left: 'Día (Day)', right: 'Noche (Night)' },
          { id: 'p3', left: 'Grande (Big)', right: 'Pequeño (Small)' }
        ],
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        padding: 20
      }
    ]
  }
];

// DYNAMIC MOCK AI LESSON GENERATOR
// Entrenado por los agentes: Diseñador Editorial Educativo & Constructor Interactivo
export async function generateAILesson(
  topic: string, 
  age: string, 
  level: string, 
  subject: string,
  slideCount: number = 5,
  imageType: string = 'illustrative',
  aiData: any = null
): Promise<Slide[]> {
    const uniqueId = `ai-${Date.now()}`;
    
    const safeTopic = topic || "El Pretérito Perfecto";
    const safeSubject = subject || "Español";
    const safeLevel = level || "B1";
    
    // Paleta Editorial Oxford
    const bgDark = '#1e293b'; 
    const bgLight = '#ffffff'; 
    const primary = '#2563eb'; 
    const accent = '#f59e0b'; 
    
    const fallbackSlides: Slide[] = [];
    
    const getReading = (idx: number) => aiData?.readings?.[idx % Math.max(1, aiData?.readings?.length || 1)] || { title: `Lectura sobre ${safeTopic}`, text: 'Historia por defecto...', question: 'Pregunta', options: ['A', 'B', 'C'], correctIndex: 0, imageKeyword: 'book' };
    const getGrammar = (idx: number) => aiData?.grammarRules?.[idx % Math.max(1, aiData?.grammarRules?.length || 1)] || { ruleTitle: 'Regla', explanation: 'Explicación', example: 'Ejemplo' };
    const getVocab = (idx: number) => {
        const items = aiData?.vocabulary || [{spanish: 'Concepto', english: 'Concept', example: 'Ejemplo', pronunciation: '/kon/'}];
        return [items[idx % items.length], items[(idx+1) % items.length], items[(idx+2) % items.length]];
    };
    const getDialogue = (idx: number) => aiData?.dialogues?.[idx % Math.max(1, aiData?.dialogues?.length || 1)] || { characterA: 'Ana', characterB: 'Carlos', lines: [ { speaker: 'A', text: 'Hola' }, { speaker: 'B', text: 'Hola' } ] };
    const getMC = (idx: number) => aiData?.multipleChoice?.[idx % Math.max(1, aiData?.multipleChoice?.length || 1)] || { question: 'Pregunta', options: [{text: 'A', isCorrect: true}, {text: 'B', isCorrect: false}] };
    const getTF = (idx: number) => aiData?.trueFalse?.[idx % Math.max(1, aiData?.trueFalse?.length || 1)] || { statement: 'Afirmación', isTrue: true, explanation: 'Explicación' };
    const getRiddle = (idx: number) => aiData?.riddles?.[idx % Math.max(1, aiData?.riddles?.length || 1)] || { riddle: 'Acertijo', answer: 'Respuesta' };
    const getDrag = (idx: number) => aiData?.vocabulary || [{spanish: 'A', english: 'A'}]; 

    for (let i = 0; i < slideCount; i++) {
       const slideId = `slide-${uniqueId}-${i}`;
       
       if (i === 0) {
          fallbackSlides.push({
            id: slideId, type: 'cover', background: bgLight, transition: 'fade',
            elements: [
              { id: `el-${i}-header`, type: 'graphic', left: 0, top: 0, width: 1024, height: 120, zIndex: 1, shapeType: 'rectangle', backgroundColor: primary, borderColor: primary },
              { id: `el-${i}-badge`, type: 'text', left: 60, top: 40, width: 200, height: 40, zIndex: 2, content: `NIVEL ${safeLevel}`, fontSize: 18, color: '#ffffff', align: 'left', bold: true, italic: false },
              { id: `el-${i}-subject`, type: 'text', left: 280, top: 40, width: 684, height: 30, zIndex: 2, content: `CLASE DE ${safeSubject.toUpperCase()}`, fontSize: 20, color: accent, align: 'right', bold: true, italic: false },
              { id: `el-${i}-title`, type: 'title', left: 60, top: 200, width: 900, height: 160, zIndex: 2, content: safeTopic, fontSize: 64, color: bgDark, align: 'left', bold: true, italic: false },
              { id: `el-${i}-sub`, type: 'text', left: 60, top: 380, width: 700, height: 80, zIndex: 2, content: 'Oxford Style Interactive Lesson', fontSize: 28, color: '#64748b', align: 'left', bold: false, italic: false }
            ]
          });
       } else if (i === slideCount - 1) {
          fallbackSlides.push({
            id: slideId, type: 'quiz', background: bgDark, transition: 'scale',
            elements: [
              { id: `el-${i}-title`, type: 'title', left: 60, top: 60, width: 900, height: 60, zIndex: 2, content: `Misión Final: ${safeTopic}`, fontSize: 40, color: '#ffffff', align: 'center', bold: true, italic: false },
              { id: `el-${i}-quiz`, type: 'quiz', left: 162, top: 160, width: 700, height: 350, zIndex: 3, 
                question: getMC(i).question,
                options: getMC(i).options.map((o:any)=>o.text),
                correctIndex: getMC(i).options.findIndex((o:any)=>o.isCorrect) >= 0 ? getMC(i).options.findIndex((o:any)=>o.isCorrect) : 0,
                backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', padding: 30
              }
            ]
          });
       } else {
          const sequence = ['reading', 'grammar', 'vocab', 'dialogue', 'multiplechoice', 'truefalse', 'riddle', 'dragdrop'];
          const layoutName = sequence[(i - 1) % sequence.length];
          
          switch (layoutName) {
             case 'reading':
                const reading = getReading(i);
                fallbackSlides.push({
                   id: slideId, type: 'reading', background: bgLight, transition: 'fade',
                   elements: [
                      { id: `el-${i}-bar`, type: 'graphic', left: 0, top: 0, width: 24, height: 576, zIndex: 1, shapeType: 'rectangle', backgroundColor: primary, borderColor: primary },
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: reading.title, fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-text`, type: 'text', left: 60, top: 110, width: 500, height: 420, zIndex: 2, content: reading.text, fontSize: 18, color: '#334155', align: 'left', bold: false, italic: false },
                      { id: `el-${i}-img`, type: 'image', left: 600, top: 110, width: 380, height: 220, zIndex: 2, src: `https://loremflickr.com/400/300/${encodeURIComponent(reading.imageKeyword || 'student')}`, alt: 'Imagen', contain: false, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
                      { id: `el-${i}-qbox`, type: 'text', left: 600, top: 350, width: 380, height: 180, zIndex: 2, content: `Pregunta:\n${reading.question}\n\n${reading.options.map((o:any,idx:any) => String.fromCharCode(65+idx)+') '+o).join('  ')}`, fontSize: 16, color: '#0f172a', backgroundColor: '#f8fafc', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', align: 'left', bold: false, italic: false }
                   ]
                });
                break;
             case 'grammar':
                const gr = getGrammar(i);
                fallbackSlides.push({
                   id: slideId, type: 'grammar', background: bgLight, transition: 'fade',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'Estructura Gramatical', fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-gcard`, type: 'grammar', left: 60, top: 110, width: 904, height: 420, zIndex: 3, 
                        ruleTitle: gr.ruleTitle, explanation: gr.explanation, formula: 'Regla Clave', example: gr.example,
                        backgroundColor: '#f0f9ff', borderRadius: 8, borderWidth: 2, borderColor: primary, padding: 30 
                      }
                   ]
                });
                break;
             case 'vocab':
                const v = getVocab(i);
                fallbackSlides.push({
                   id: slideId, type: 'vocab', background: bgLight, transition: 'slide',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'Vocabulario Clave', fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-v1`, type: 'vocabulary', left: 60, top: 110, width: 280, height: 420, zIndex: 3, spanish: v[0].spanish, english: v[0].english, example: v[0].example, pronunciation: v[0].pronunciation || '', backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 20 },
                      { id: `el-${i}-v2`, type: 'vocabulary', left: 372, top: 110, width: 280, height: 420, zIndex: 3, spanish: v[1].spanish, english: v[1].english, example: v[1].example, pronunciation: v[1].pronunciation || '', backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 20 },
                      { id: `el-${i}-v3`, type: 'vocabulary', left: 684, top: 110, width: 280, height: 420, zIndex: 3, spanish: v[2].spanish, english: v[2].english, example: v[2].example, pronunciation: v[2].pronunciation || '', backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 20 }
                   ]
                });
                break;
             case 'dialogue':
                const dial = getDialogue(i);
                fallbackSlides.push({
                   id: slideId, type: 'dialogue', background: bgLight, transition: 'slide',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'En Contexto', fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-img`, type: 'image', left: 60, top: 110, width: 300, height: 420, zIndex: 2, src: `https://loremflickr.com/400/600/${encodeURIComponent('people talking')}`, alt: 'Imagen', contain: false, borderRadius: 8, borderWidth: 0, borderColor: '' },
                      { id: `el-${i}-dial`, type: 'dialogue', left: 390, top: 110, width: 574, height: 420, zIndex: 3, 
                        characterA: dial.characterA, characterB: dial.characterB, lines: dial.lines,
                        backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 30
                      }
                   ]
                });
                break;
             case 'multiplechoice':
                const mc = getMC(i);
                fallbackSlides.push({
                   id: slideId, type: 'multiplechoice', background: bgLight, transition: 'fade',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'Evaluación de Conceptos', fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-mc`, type: 'quiz', left: 162, top: 120, width: 700, height: 350, zIndex: 3, 
                        question: mc.question, options: mc.options.map((o:any)=>o.text), correctIndex: mc.options.findIndex((o:any)=>o.isCorrect) >= 0 ? mc.options.findIndex((o:any)=>o.isCorrect) : 0, backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 30 }
                   ]
                });
                break;
             case 'truefalse':
                const tf = getTF(i);
                fallbackSlides.push({
                   id: slideId, type: 'truefalse', background: bgLight, transition: 'fade',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'Análisis Crítico', fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-tf`, type: 'truefalse', left: 212, top: 120, width: 600, height: 350, zIndex: 3, statement: tf.statement, isTrue: tf.isTrue, explanation: tf.explanation, backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 30 }
                   ]
                });
                break;
             case 'riddle':
                const rid = getRiddle(i);
                fallbackSlides.push({
                   id: slideId, type: 'riddle', background: bgLight, transition: 'zoom',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'Acertijo', fontSize: 32, color: accent, align: 'center', bold: true, italic: false },
                      { id: `el-${i}-rid`, type: 'riddle', left: 212, top: 120, width: 600, height: 350, zIndex: 3, riddle: rid.riddle, answer: rid.answer, backgroundColor: '#fff7ed', borderRadius: 8, borderWidth: 2, borderColor: accent, padding: 30 }
                   ]
                });
                break;
             case 'dragdrop':
                const dragV = getDrag(i);
                fallbackSlides.push({
                   id: slideId, type: 'dragdrop', background: bgLight, transition: 'fade',
                   elements: [
                      { id: `el-${i}-title`, type: 'title', left: 60, top: 40, width: 900, height: 50, zIndex: 2, content: 'Relaciona Conceptos', fontSize: 32, color: primary, align: 'left', bold: true, italic: false },
                      { id: `el-${i}-dd`, type: 'dragdrop', left: 112, top: 120, width: 800, height: 400, zIndex: 3, 
                        instruction: 'Une los conceptos correctamente.',
                        pairs: [
                          { id: `p1`, left: dragV[i%dragV.length]?.spanish||'A', right: dragV[i%dragV.length]?.english||'A' },
                          { id: `p2`, left: dragV[(i+1)%dragV.length]?.spanish||'B', right: dragV[(i+1)%dragV.length]?.english||'B' },
                          { id: `p3`, left: dragV[(i+2)%dragV.length]?.spanish||'C', right: dragV[(i+2)%dragV.length]?.english||'C' }
                        ],
                        backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', padding: 30
                      }
                   ]
                });
                break;
          }
       }
    }

    return fallbackSlides;
}

export async function generateAIWorksheet(
  topic: string,
  subject: string = 'Español'
): Promise<Slide[]> {
    const uniqueId = `ws-${Date.now()}`;
    
    // Worksheet specific styles (Print friendly, Oxford Workbook Style)
    const bgWhite = '#ffffff';
    const textDark = '#1e293b';
    const primary = '#4f46e5';
    const accent = '#0ea5e9';
    
    const worksheetSlides: Slide[] = [];
    
    // ---------------------------------------------------------
    // PAGE 1: Theory & Controlled Practice (Fill in the blanks)
    // ---------------------------------------------------------
    worksheetSlides.push({
      id: `slide-${uniqueId}-p1`,
      type: 'worksheet',
      background: bgWhite,
      transition: 'fade',
      elements: [
        { id: `el-${uniqueId}-p1-h1`, type: 'text', left: 50, top: 50, width: 924, height: 40, zIndex: 1, content: `CUADERNO DE TRABAJO: ${subject.toUpperCase()}`, fontSize: 16, color: primary, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p1-h2`, type: 'title', left: 50, top: 90, width: 924, height: 80, zIndex: 1, content: topic, fontSize: 42, color: textDark, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p1-line`, type: 'text', left: 50, top: 160, width: 924, height: 4, zIndex: 1, content: '', backgroundColor: primary, fontSize: 10, color: 'transparent', align: 'left', bold: false, italic: false },
        
        // Concept Box
        { id: `el-${uniqueId}-p1-c1`, type: 'text', left: 50, top: 200, width: 924, height: 220, zIndex: 1, 
          content: 'GRAMÁTICA:\nEl Pretérito Perfecto se usa para hablar de acciones pasadas que tienen una conexión con el presente.\n\nFórmula: HABER (he, has, ha, hemos, habéis, han) + Participio (-ado, -ido)\n\nEjemplos:\n• Hoy he desayunado tostadas.\n• ¿Alguna vez has viajado a España?',
          fontSize: 22, color: textDark, backgroundColor: '#f8fafc', padding: 24, borderRadius: 12, borderWidth: 2, borderColor: '#e2e8f0', align: 'left', bold: false, italic: false 
        },
        
        { id: `el-${uniqueId}-p1-t1`, type: 'title', left: 50, top: 460, width: 924, height: 50, zIndex: 1, content: 'Ejercicio 1: Completa las frases con el verbo correcto.', fontSize: 26, color: primary, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p1-ex1`, type: 'text', left: 50, top: 530, width: 924, height: 50, zIndex: 1, content: '1. Yo (comer) __________________ una manzana esta mañana.', fontSize: 24, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p1-ex2`, type: 'text', left: 50, top: 600, width: 924, height: 50, zIndex: 1, content: '2. ¿Vosotros (ver) __________________ la nueva película?', fontSize: 24, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p1-ex3`, type: 'text', left: 50, top: 670, width: 924, height: 50, zIndex: 1, content: '3. María (hacer) __________________ sus deberes ya.', fontSize: 24, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p1-ex4`, type: 'text', left: 50, top: 740, width: 924, height: 50, zIndex: 1, content: '4. Nosotros todavía no (escribir) __________________ la carta.', fontSize: 24, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p1-ex5`, type: 'text', left: 50, top: 810, width: 924, height: 50, zIndex: 1, content: '5. Pedro y Juan (llegar) __________________ tarde a clase hoy.', fontSize: 24, color: textDark, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p1-pg`, type: 'text', left: 50, top: 1350, width: 924, height: 30, zIndex: 1, content: 'Página 1 | AuraSpanish AI Builder', fontSize: 14, color: '#94a3b8', align: 'center', bold: false, italic: false }
      ]
    });

    // ---------------------------------------------------------
    // PAGE 2: Vocabulary & Matching (Marcadores Temporales)
    // ---------------------------------------------------------
    worksheetSlides.push({
      id: `slide-${uniqueId}-p2`,
      type: 'worksheet',
      background: bgWhite,
      transition: 'none',
      elements: [
        { id: `el-${uniqueId}-p2-h1`, type: 'text', left: 50, top: 50, width: 924, height: 40, zIndex: 1, content: `CUADERNO DE TRABAJO: ${subject.toUpperCase()}`, fontSize: 16, color: primary, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p2-line`, type: 'text', left: 50, top: 90, width: 924, height: 4, zIndex: 1, content: '', backgroundColor: primary, fontSize: 10, color: 'transparent', align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p2-t1`, type: 'title', left: 50, top: 130, width: 924, height: 50, zIndex: 1, content: 'Ejercicio 2: Marcadores Temporales', fontSize: 26, color: primary, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p2-desc`, type: 'text', left: 50, top: 190, width: 924, height: 80, zIndex: 1, content: 'El Pretérito Perfecto suele usarse con palabras clave que indican un periodo de tiempo no terminado (ej. Hoy, Esta semana, Últimamente, Ya, Todavía no).', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p2-t2`, type: 'title', left: 50, top: 300, width: 924, height: 50, zIndex: 1, content: 'Une con flechas el marcador temporal con su uso correcto:', fontSize: 22, color: textDark, align: 'left', bold: true, italic: false },
        
        // Matching Columns
        { id: `el-${uniqueId}-p2-m1L`, type: 'text', left: 100, top: 380, width: 250, height: 60, zIndex: 1, content: 'A. Ya', fontSize: 24, color: textDark, backgroundColor: '#f0f9ff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bae6fd', align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-p2-m1R`, type: 'text', left: 500, top: 380, width: 450, height: 60, zIndex: 1, content: '1. Acción negativa hasta este momento.', fontSize: 18, color: textDark, padding: 15, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p2-m2L`, type: 'text', left: 100, top: 480, width: 250, height: 60, zIndex: 1, content: 'B. Todavía no', fontSize: 24, color: textDark, backgroundColor: '#f0f9ff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bae6fd', align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-p2-m2R`, type: 'text', left: 500, top: 480, width: 450, height: 60, zIndex: 1, content: '2. Pregunta sobre experiencias en la vida.', fontSize: 18, color: textDark, padding: 15, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p2-m3L`, type: 'text', left: 100, top: 580, width: 250, height: 60, zIndex: 1, content: 'C. Alguna vez', fontSize: 24, color: textDark, backgroundColor: '#f0f9ff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bae6fd', align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-p2-m3R`, type: 'text', left: 500, top: 580, width: 450, height: 60, zIndex: 1, content: '3. Indica una unidad de tiempo actual.', fontSize: 18, color: textDark, padding: 15, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p2-m4L`, type: 'text', left: 100, top: 680, width: 250, height: 60, zIndex: 1, content: 'D. Esta semana', fontSize: 24, color: textDark, backgroundColor: '#f0f9ff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bae6fd', align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-p2-m4R`, type: 'text', left: 500, top: 680, width: 450, height: 60, zIndex: 1, content: '4. Acción completada antes de lo esperado.', fontSize: 18, color: textDark, padding: 15, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p2-pg`, type: 'text', left: 50, top: 1350, width: 924, height: 30, zIndex: 1, content: 'Página 2 | AuraSpanish AI Builder', fontSize: 14, color: '#94a3b8', align: 'center', bold: false, italic: false }
      ]
    });

    // ---------------------------------------------------------
    // PAGE 3: Reading Comprehension & Writing
    // ---------------------------------------------------------
    worksheetSlides.push({
      id: `slide-${uniqueId}-p3`,
      type: 'worksheet',
      background: bgWhite,
      transition: 'none',
      elements: [
        { id: `el-${uniqueId}-p3-h1`, type: 'text', left: 50, top: 50, width: 924, height: 40, zIndex: 1, content: `CUADERNO DE TRABAJO: ${subject.toUpperCase()}`, fontSize: 16, color: primary, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p3-line`, type: 'text', left: 50, top: 90, width: 924, height: 4, zIndex: 1, content: '', backgroundColor: primary, fontSize: 10, color: 'transparent', align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p3-t1`, type: 'title', left: 50, top: 130, width: 924, height: 50, zIndex: 1, content: 'Ejercicio 3: Comprensión Lectora', fontSize: 26, color: primary, align: 'left', bold: true, italic: false },
        
        // Reading Text
        { id: `el-${uniqueId}-p3-txt`, type: 'text', left: 50, top: 200, width: 924, height: 180, zIndex: 1, 
          content: 'Lee el siguiente texto:\n"Hoy ha sido un día muy interesante. Me he levantado muy temprano, he tomado un buen desayuno y he ido a la universidad. Esta semana hemos tenido muchos exámenes, así que todavía no he podido descansar. Además, mi amigo Carlos y yo hemos empezado un curso de pintura. ¡Nunca antes había pintado!"',
          fontSize: 20, color: textDark, backgroundColor: '#fef2f2', padding: 24, borderRadius: 12, borderWidth: 1, borderColor: '#fecaca', align: 'left', bold: false, italic: true 
        },
        
        { id: `el-${uniqueId}-p3-q1`, type: 'text', left: 50, top: 410, width: 924, height: 40, zIndex: 1, content: 'Responde Verdadero (V) o Falso (F):', fontSize: 22, color: textDark, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p3-tf1`, type: 'text', left: 50, top: 470, width: 924, height: 40, zIndex: 1, content: '1. El narrador se ha levantado tarde hoy.  [   ]', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p3-tf2`, type: 'text', left: 50, top: 520, width: 924, height: 40, zIndex: 1, content: '2. Ha tenido exámenes esta semana.        [   ]', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p3-tf3`, type: 'text', left: 50, top: 570, width: 924, height: 40, zIndex: 1, content: '3. Ya ha podido descansar bastante.        [   ]', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },

        { id: `el-${uniqueId}-p3-t2`, type: 'title', left: 50, top: 660, width: 924, height: 50, zIndex: 1, content: 'Ejercicio 4: Producción Escrita', fontSize: 26, color: primary, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-p3-w1`, type: 'text', left: 50, top: 730, width: 924, height: 40, zIndex: 1, content: 'Escribe 3 cosas que has hecho hoy y 1 cosa que todavía no has hecho:', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p3-w2`, type: 'text', left: 50, top: 800, width: 924, height: 40, zIndex: 1, content: '1. ____________________________________________________________________', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p3-w3`, type: 'text', left: 50, top: 870, width: 924, height: 40, zIndex: 1, content: '2. ____________________________________________________________________', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p3-w4`, type: 'text', left: 50, top: 940, width: 924, height: 40, zIndex: 1, content: '3. ____________________________________________________________________', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        { id: `el-${uniqueId}-p3-w5`, type: 'text', left: 50, top: 1010, width: 924, height: 40, zIndex: 1, content: 'Todavía no ___________________________________________________________', fontSize: 20, color: textDark, align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-p3-pg`, type: 'text', left: 50, top: 1350, width: 924, height: 30, zIndex: 1, content: 'Página 3 | AuraSpanish AI Builder', fontSize: 14, color: '#94a3b8', align: 'center', bold: false, italic: false }
      ]
    });

    return worksheetSlides;
}
