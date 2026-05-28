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
    background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
    transition: 'fade',
    elements: [
      {
        id: 'el-1-title',
        type: 'title',
        left: 80,
        top: 140,
        width: 864,
        height: 100,
        zIndex: 2,
        content: '¡Bienvenidos a la Clase de Español!',
        fontSize: 46,
        color: '#ffffff',
        align: 'center',
        bold: true,
        italic: false,
        animation: 'bounce',
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
        content: 'Nivel A1-A2 • Clase Interactiva sobre Vocabulario y Expresiones del Día a Día\n\nCreado con AuraSpanish AI Builder ✨',
        fontSize: 22,
        color: '#e0e7ff',
        align: 'center',
        bold: false,
        italic: false,
        animation: 'fade',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: ''
      }
    ]
  },
  
  // Slide 2: Vocabulary
  {
    id: 'slide-initial-2',
    type: 'vocab',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
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
        fontSize: 34,
        color: '#f472b6',
        align: 'center',
        bold: true,
        italic: false,
        animation: 'scale'
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
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'rgba(244,114,182,0.3)'
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
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        padding: 24
      }
    ]
  },

  // Slide 3: Grammar explanation
  {
    id: 'slide-initial-3',
    type: 'grammar',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
        content: 'Gramática: El verbo de gustos y preferencias',
        fontSize: 32,
        color: '#60a5fa',
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
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3b82f6',
        padding: 24
      }
    ]
  },

  // Slide 4: Quiz
  {
    id: 'slide-initial-4',
    type: 'quiz',
    background: 'linear-gradient(135deg, #090d16 0%, #111827 100%)',
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
        content: 'Cuestionario Rápido de Comprensión',
        fontSize: 30,
        color: '#34d399',
        align: 'center',
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
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(52,211,153,0.2)',
        padding: 20
      }
    ]
  },

  // Slide 5: Dialogue
  {
    id: 'slide-initial-5',
    type: 'dialogue',
    background: 'linear-gradient(135deg, #111827 0%, #030712 100%)',
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
        content: 'Práctica Auditiva: Planificando una fiesta',
        fontSize: 28,
        color: '#a78bfa',
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
        characterA: 'Carlos (David)',
        characterB: 'María (Helena)',
        lines: [
          { speaker: 'A', text: 'Hola, María. ¿Estás lista para la fiesta de mañana?' },
          { speaker: 'B', text: '¡Hola! Sí, pero me falta comprar comida. ¿Tenemos manzanas en casa?' },
          { speaker: 'A', text: 'No, no tenemos. Necesitamos comprar manzanas, plátanos y un pastel.' },
          { speaker: 'B', text: 'Perfecto. Voy a ir al supermercado ahora mismo. ¡Nos vemos luego!' }
        ],
        backgroundColor: 'rgba(15,23,42,0.8)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(167,139,250,0.2)'
      }
    ]
  },

  // Slide 6: Speaking practice
  {
    id: 'slide-initial-6',
    type: 'speaking',
    background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)',
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
        content: 'Actividad de Habla (Speaking)',
        fontSize: 32,
        color: '#fb7185',
        align: 'center',
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
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#f43f5e',
        padding: 24
      }
    ]
  },

  // Slide 7: Drag & Drop Match
  {
    id: 'slide-initial-7',
    type: 'dragdrop',
    background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
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
        content: 'Mini-Juego: Relaciona los opuestos',
        fontSize: 30,
        color: '#34d399',
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
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(52,211,153,0.3)',
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
  imageType: string = 'illustrative'
): Promise<Slide[]> {
    const uniqueId = `ai-${Date.now()}`;

    // -------------------------------------------------------------------------------------
    // SISTEMA DE ENTRENAMIENTO IA - AGENTES INTEGRADOS (DISEÑADOR EDITORIAL & CONSTRUCTOR)
    // -------------------------------------------------------------------------------------
    // SYSTEM PROMPT inyectado para las llamadas a la API:
    // "Eres un Diseñador Editorial Educativo y un Constructor Interactivo Frontend.
    // Tu objetivo es crear lecciones de Español estructuradas bajo el CEFR.
    // Estilo Visual: Oxford ELT, Modern Minimalist, Gamified.
    // Componentes Obligatorios:
    // - Portada Editorial Limpia
    // - UI Moderna de Gramática (Cajas y jerarquía visual clara)
    // - Interacciones: Drag & Drop, Scattercards para participación activa.
    // - Evaluación: Quiz final gamificado."
    // -------------------------------------------------------------------------------------
    
    // MODEL CLASS FALLBACK: Español B1 - El Pretérito Perfecto
    const safeTopic = "El Pretérito Perfecto (Experiencias Pasadas)";
    const safeSubject = "Español";
    const safeLevel = "B1";
    
    // Paleta Editorial "Oxford Modern"
    const bgDark = '#0f172a'; // Slate 900
    const bgLight = '#f8fafc'; // Slate 50
    const primary = '#4f46e5'; // Indigo 600
    const accent = '#f59e0b'; // Amber 500
    
    const fallbackSlides: Slide[] = [];
    
    // 1. COVER SLIDE - Oxford Editorial Style
    fallbackSlides.push({
      id: `slide-${uniqueId}-cover`,
      type: 'cover',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      transition: 'fade',
      elements: [
        { id: `el-${uniqueId}-c-badge`, type: 'text', left: 80, top: 80, width: 200, height: 40, zIndex: 2, content: `NIVEL ${safeLevel}`, fontSize: 16, color: '#ffffff', backgroundColor: primary, borderRadius: 20, padding: 10, align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-c-subject`, type: 'text', left: 80, top: 140, width: 800, height: 30, zIndex: 2, content: `CLASE DE ${safeSubject.toUpperCase()}`, fontSize: 18, color: accent, align: 'left', bold: true, italic: false, textShadow: 'none' },
        { id: `el-${uniqueId}-c-title`, type: 'title', left: 80, top: 180, width: 800, height: 160, zIndex: 2, content: 'El Pretérito Perfecto', fontSize: 64, color: '#ffffff', align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-c-sub`, type: 'text', left: 80, top: 340, width: 600, height: 80, zIndex: 2, content: 'Hablar de experiencias pasadas y acciones recientes que tienen conexión con el presente.', fontSize: 24, color: '#94a3b8', align: 'left', bold: false, italic: false },
        // Decorative shapes (Constructor Interactivo)
        { id: `el-${uniqueId}-c-circle`, type: 'graphic', left: 750, top: 100, width: 200, height: 200, zIndex: 1, shapeType: 'circle', backgroundColor: 'transparent', borderColor: 'rgba(79, 70, 229, 0.5)' },
        { id: `el-${uniqueId}-c-star`, type: 'graphic', left: 850, top: 250, width: 100, height: 100, zIndex: 1, shapeType: 'star', backgroundColor: accent, borderColor: 'transparent' }
      ]
    });
    
    // 2. GRAMMAR SLIDE - Clean Minimalist UI
    fallbackSlides.push({
      id: `slide-${uniqueId}-gram`,
      type: 'grammar',
      background: bgLight,
      transition: 'slide',
      elements: [
        { id: `el-${uniqueId}-g-title`, type: 'title', left: 60, top: 50, width: 800, height: 60, zIndex: 2, content: 'Estructura Gramatical', fontSize: 36, color: bgDark, align: 'left', bold: true, italic: false },
        { id: `el-${uniqueId}-g-line`, type: 'text', left: 60, top: 110, width: 800, height: 2, zIndex: 1, content: '', backgroundColor: '#e2e8f0', fontSize: 10, color: 'transparent', align: 'left', bold: false, italic: false },
        
        { id: `el-${uniqueId}-g-card1`, type: 'grammar', left: 60, top: 150, width: 440, height: 350, zIndex: 3, 
          ruleTitle: 'Verbo Auxiliar HABER',
          explanation: 'Se usa el presente de indicativo del verbo haber.',
          formula: 'He, Has, Ha,\nHemos, Habéis, Han',
          example: 'Nosotros hemos...',
          backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 2, borderColor: primary, padding: 24 
        },
        { id: `el-${uniqueId}-g-card2`, type: 'grammar', left: 520, top: 150, width: 440, height: 350, zIndex: 3, 
          ruleTitle: 'Participio Pasado',
          explanation: 'Verbos regulares añaden las siguientes terminaciones:',
          formula: '-AR ➔ -ado (hablado)\n-ER/-IR ➔ -ido (comido)',
          example: 'Nosotros hemos viajado a España.',
          backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 2, borderColor: accent, padding: 24 
        },
        { id: `el-${uniqueId}-g-plus`, type: 'text', left: 475, top: 300, width: 70, height: 70, zIndex: 4, content: '+', fontSize: 40, color: '#ffffff', backgroundColor: bgDark, borderRadius: 35, padding: 0, align: 'center', bold: true, italic: false }
      ]
    });

    // 3. INTERACTIVE COMPONENT - Scattercards for Irregular Participles
    fallbackSlides.push({
      id: `slide-${uniqueId}-scatter`,
      type: 'interact',
      background: '#f0f9ff',
      transition: 'zoom',
      elements: [
        { id: `el-${uniqueId}-sc-title`, type: 'title', left: 60, top: 50, width: 800, height: 60, zIndex: 2, content: '¡Cuidado con los Irregulares!', fontSize: 36, color: '#0369a1', align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-sc-desc`, type: 'text', left: 60, top: 110, width: 800, height: 40, zIndex: 2, content: 'Repasa con tus estudiantes. Cada tarjeta muestra un verbo infinitivo.', fontSize: 20, color: '#0284c7', align: 'center', bold: false, italic: false },
        
        { id: `el-${uniqueId}-sc-cards`, type: 'scattercards', left: 200, top: 180, width: 600, height: 300, zIndex: 3, 
          cards: [
            { id: 1, body: 'VER', question: 'VISTO' },
            { id: 2, body: 'ESCRIBIR', question: 'ESCRITO' },
            { id: 3, body: 'HACER', question: 'HECHO' },
            { id: 4, body: 'VOLVER', question: 'VUELTO' },
            { id: 5, body: 'DECIR', question: 'DICHO' }
          ]
        }
      ]
    });

    // 4. INTERACTIVE COMPONENT - Drag & Drop for Time Markers
    fallbackSlides.push({
      id: `slide-${uniqueId}-drag`,
      type: 'dragdrop',
      background: '#fef2f2',
      transition: 'fade',
      elements: [
        { id: `el-${uniqueId}-dd-title`, type: 'title', left: 60, top: 50, width: 800, height: 60, zIndex: 2, content: 'Marcadores Temporales', fontSize: 36, color: '#b91c1c', align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-dd-drag`, type: 'dragdrop', left: 112, top: 130, width: 800, height: 400, zIndex: 3, 
          instruction: 'Une el marcador temporal con el contexto correcto.',
          pairs: [
            { id: 'p1', left: 'Hoy', right: '...he tomado un café con María.' },
            { id: 'p2', left: 'Todavía no', right: '...hemos terminado los deberes.' },
            { id: 'p3', left: 'Alguna vez', right: '¿...has estado en México?' },
            { id: 'p4', left: 'Ya', right: '...he visto esa película.' }
          ],
          backgroundColor: '#ffffff', borderRadius: 24, borderWidth: 0, borderColor: '', padding: 30
        }
      ]
    });

    // 5. GAMIFICATION - Final Quiz
    fallbackSlides.push({
      id: `slide-${uniqueId}-quiz`,
      type: 'quiz',
      background: bgDark,
      transition: 'scale',
      elements: [
        { id: `el-${uniqueId}-qz-title`, type: 'title', left: 60, top: 60, width: 800, height: 60, zIndex: 2, content: 'Misión Final: Evaluación', fontSize: 40, color: accent, align: 'center', bold: true, italic: false },
        { id: `el-${uniqueId}-qz-quiz`, type: 'quiz', left: 160, top: 160, width: 700, height: 350, zIndex: 3, 
          question: 'Completa la frase correctamente:\n"Esta mañana, Pedro y yo _______ _______ el desayuno a las 8:00."',
          options: [
            'hemos hecho',
            'han hecho',
            'hemos hacido'
          ],
          correctIndex: 0,
          backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', padding: 30
        }
      ]
    });

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
