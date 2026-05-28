import { Slide } from './types';

export interface PremiumTemplate {
  id: string;
  name: string;
  category: string;
  thumbnailColor: string;
  slides: Slide[];
}

const genId = (prefix: string) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

// 20 Themes (Colors & Metadata)
const themes = [
  // Botánicos
  { name: 'Naturaleza Viva', category: 'Botánico', bg: '#f0fdf4', primary: '#166534', secondary: '#86efac', text: '#14532d', layoutType: 1, font: 'Georgia, serif' },
  { name: 'Verde Aesthetic', category: 'Botánico', bg: '#fefce8', primary: '#3f6212', secondary: '#bef264', text: '#365314', layoutType: 1, font: 'Georgia, serif' },
  { name: 'Hojas de Otoño', category: 'Botánico', bg: '#fffbeb', primary: '#92400e', secondary: '#fcd34d', text: '#78350f', layoutType: 1, font: 'Georgia, serif' },
  { name: 'Eucalipto Suave', category: 'Botánico', bg: '#f8fafc', primary: '#0f766e', secondary: '#5eead4', text: '#134e4a', layoutType: 1, font: 'Inter, sans-serif' },
  { name: 'Selva Profunda', category: 'Botánico', bg: '#14532d', primary: '#f0fdf4', secondary: '#4ade80', text: '#f0fdf4', layoutType: 1, font: 'Arial, sans-serif' },

  // Geométricos
  { name: 'Split Corporativo', category: 'Geométrico', bg: '#ffffff', primary: '#2563eb', secondary: '#93c5fd', text: '#1e3a8a', layoutType: 0, font: 'Inter, sans-serif' },
  { name: 'Grid Moderno', category: 'Geométrico', bg: '#fafafa', primary: '#db2777', secondary: '#fbcfe8', text: '#831843', layoutType: 2, font: 'Arial, sans-serif' },
  { name: 'Ondas Dinámicas', category: 'Geométrico', bg: '#eef2ff', primary: '#4f46e5', secondary: '#a5b4fc', text: '#312e81', layoutType: 0, font: 'Inter, sans-serif' },
  { name: 'UI Educativa', category: 'Geométrico', bg: '#fff7ed', primary: '#ea580c', secondary: '#fdba74', text: '#7c2d12', layoutType: 2, font: 'Inter, sans-serif' },
  { name: 'Círculos Concéntricos', category: 'Geométrico', bg: '#fdf4ff', primary: '#c026d3', secondary: '#f0abfc', text: '#701a75', layoutType: 4, font: 'Arial, sans-serif' },

  // Corporativos / Elegantes
  { name: 'Oxford Clásico', category: 'Corporativo', bg: '#ffffff', primary: '#1e3a8a', secondary: '#60a5fa', text: '#172554', layoutType: 4, font: 'Arial, sans-serif' },
  { name: 'Cambridge Elite', category: 'Corporativo', bg: '#f8fafc', primary: '#b91c1c', secondary: '#f87171', text: '#7f1d1d', layoutType: 0, font: 'Georgia, serif' },
  { name: 'Gris Ejecutivo', category: 'Corporativo', bg: '#f1f5f9', primary: '#334155', secondary: '#94a3b8', text: '#0f172a', layoutType: 4, font: 'Inter, sans-serif' },
  { name: 'Negocio Innovador', category: 'Corporativo', bg: '#ffffff', primary: '#0891b2', secondary: '#67e8f9', text: '#164e63', layoutType: 2, font: 'Inter, sans-serif' },
  { name: 'Minimalismo Puro', category: 'Corporativo', bg: '#ffffff', primary: '#000000', secondary: '#a3a3a3', text: '#000000', layoutType: 4, font: 'Arial, sans-serif' },

  // Infantil / Divertido
  { name: 'Aventura Espacial', category: 'Infantil', bg: '#1e1b4b', primary: '#fbbf24', secondary: '#fde68a', text: '#fffbeb', layoutType: 3, font: '\'Comic Sans MS\', cursive' },
  { name: 'Colores Pastel', category: 'Infantil', bg: '#fdf2f8', primary: '#ec4899', secondary: '#f9a8d4', text: '#831843', layoutType: 3, font: 'Inter, sans-serif' },
  { name: 'Dinosaurios Kids', category: 'Infantil', bg: '#f0fdfa', primary: '#0d9488', secondary: '#5eead4', text: '#134e4a', layoutType: 3, font: '\'Comic Sans MS\', cursive' },
  { name: 'Ciencia Divertida', category: 'Infantil', bg: '#fffbeb', primary: '#ea580c', secondary: '#fcd34d', text: '#7c2d12', layoutType: 3, font: 'Arial, sans-serif' },
  { name: 'Letras Mágicas', category: 'Infantil', bg: '#faf5ff', primary: '#9333ea', secondary: '#d8b4fe', text: '#581c87', layoutType: 3, font: '\'Comic Sans MS\', cursive' },
];

export const PREMIUM_TEMPLATES: PremiumTemplate[] = themes.map((theme, index) => {
  const tid = `tpl-${index}`;
  const slides: Slide[] = [];
  
  // ==========================================
  // LAYOUT 0: THE SPLIT (Corporate / Modern)
  // ==========================================
  if (theme.layoutType === 0) {
    slides.push({
      id: `${tid}-s1`, type: 'content', background: theme.bg, transition: 'slide',
      elements: [
        // Left Solid Block
        { id: genId('bg1'), type: 'graphic', left: 0, top: 0, width: 400, height: 600, zIndex: 0, content: '', shapeType: 'rectangle', backgroundColor: theme.primary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('bg2'), type: 'graphic', left: -50, top: 400, width: 200, height: 200, zIndex: 1, content: '', shapeType: 'circle', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        
        // Sticker / Label
        { id: genId('stk'), type: 'text', left: 450, top: 180, width: 120, height: 35, zIndex: 2, content: 'MODERNO', fontSize: 14, color: theme.bg, backgroundColor: theme.text, borderRadius: 20, align: 'center', bold: true, italic: false, fontFamily: 'Inter, sans-serif' },
        
        // Typography
        { id: genId('tit'), type: 'title', left: 450, top: 230, width: 500, height: 120, zIndex: 2, content: theme.name.toUpperCase(), fontSize: 60, color: theme.primary, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('sub'), type: 'text', left: 450, top: 350, width: 500, height: 60, zIndex: 2, content: 'Presentación de Alto Impacto', fontSize: 24, color: theme.text, align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
    slides.push({
      id: `${tid}-s2`, type: 'content', background: theme.bg, transition: 'slide',
      elements: [
        { id: genId('bg'), type: 'graphic', left: 0, top: 0, width: 1024, height: 100, zIndex: 0, content: '', shapeType: 'rectangle', backgroundColor: theme.primary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('itit'), type: 'title', left: 50, top: 20, width: 500, height: 60, zIndex: 1, content: 'Índice de Contenidos', fontSize: 40, color: theme.bg, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('itx1'), type: 'text', left: 100, top: 180, width: 800, height: 40, zIndex: 1, content: '01. Introducción', fontSize: 28, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('itx2'), type: 'text', left: 100, top: 260, width: 800, height: 40, zIndex: 1, content: '02. Metodología', fontSize: 28, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('itx3'), type: 'text', left: 100, top: 340, width: 800, height: 40, zIndex: 1, content: '03. Resultados', fontSize: 28, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
      ]
    });
    slides.push({
      id: `${tid}-s3`, type: 'content', background: theme.bg, transition: 'slide',
      elements: [
        { id: genId('stk'), type: 'text', left: 50, top: 50, width: 120, height: 30, zIndex: 2, content: 'LECCIÓN 1', fontSize: 14, color: theme.primary, backgroundColor: theme.secondary, borderRadius: 4, align: 'center', bold: true, italic: false },
        { id: genId('ctit'), type: 'title', left: 50, top: 90, width: 800, height: 60, zIndex: 1, content: 'Desarrollo del Tema', fontSize: 45, color: theme.primary, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('cimg'), type: 'graphic', left: 600, top: 180, width: 350, height: 300, zIndex: 1, content: '', shapeType: 'rectangle', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, borderRadius: 16, align: 'left', bold: false, italic: false },
        { id: genId('ctx'), type: 'text', left: 50, top: 180, width: 500, height: 300, zIndex: 1, content: 'Coloca aquí tu texto principal. El formato dividido permite un balance perfecto entre la lectura y el apoyo visual a la derecha.', fontSize: 22, color: theme.text, align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
  }

  // ==========================================
  // LAYOUT 1: AESTHETIC / ORGANIC (Botanical)
  // ==========================================
  else if (theme.layoutType === 1) {
    slides.push({
      id: `${tid}-s1`, type: 'content', background: theme.bg, transition: 'fade',
      elements: [
        { id: genId('b1'), type: 'graphic', left: -100, top: -100, width: 500, height: 500, zIndex: 0, content: '', shapeType: 'blob', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('b2'), type: 'graphic', left: 700, top: 300, width: 400, height: 400, zIndex: 0, content: '', shapeType: 'organic', backgroundColor: theme.primary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('stk'), type: 'text', left: 452, top: 180, width: 120, height: 35, zIndex: 2, content: 'B1 INTERMEDIO', fontSize: 14, color: theme.text, backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: theme.text, align: 'center', bold: true, italic: false, fontFamily: 'Arial, sans-serif' },
        { id: genId('tit'), type: 'title', left: 100, top: 240, width: 824, height: 100, zIndex: 2, content: theme.name, fontSize: 68, color: theme.text, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('sub'), type: 'text', left: 200, top: 360, width: 624, height: 50, zIndex: 2, content: 'Un enfoque orgánico y natural para aprender.', fontSize: 24, color: theme.primary, align: 'center', bold: false, italic: true, fontFamily: 'Arial, sans-serif' },
      ]
    });
    slides.push({
      id: `${tid}-s2`, type: 'content', background: theme.bg, transition: 'fade',
      elements: [
        { id: genId('tit'), type: 'title', left: 100, top: 80, width: 824, height: 80, zIndex: 1, content: 'Índice de Naturaleza', fontSize: 45, color: theme.primary, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('txb1'), type: 'text', left: 212, top: 200, width: 600, height: 60, zIndex: 1, content: '• Capítulo Uno: Semillas', fontSize: 24, color: theme.text, backgroundColor: '#ffffff80', padding: 15, borderRadius: 10, align: 'left', bold: false, italic: false, fontFamily: theme.font },
        { id: genId('txb2'), type: 'text', left: 212, top: 280, width: 600, height: 60, zIndex: 1, content: '• Capítulo Dos: Raíces', fontSize: 24, color: theme.text, backgroundColor: '#ffffff80', padding: 15, borderRadius: 10, align: 'left', bold: false, italic: false, fontFamily: theme.font },
        { id: genId('txb3'), type: 'text', left: 212, top: 360, width: 600, height: 60, zIndex: 1, content: '• Capítulo Tres: Ramas', fontSize: 24, color: theme.text, backgroundColor: '#ffffff80', padding: 15, borderRadius: 10, align: 'left', bold: false, italic: false, fontFamily: theme.font },
      ]
    });
    slides.push({
      id: `${tid}-s3`, type: 'content', background: theme.bg, transition: 'fade',
      elements: [
        { id: genId('tit'), type: 'title', left: 100, top: 80, width: 824, height: 60, zIndex: 1, content: 'Explorando Conceptos', fontSize: 40, color: theme.text, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('b1'), type: 'graphic', left: 362, top: 160, width: 300, height: 300, zIndex: 0, content: '', shapeType: 'blob', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('txt'), type: 'text', left: 262, top: 200, width: 500, height: 200, zIndex: 2, content: 'La belleza de este diseño radica en su simplicidad y el uso extensivo de márgenes y tipografías elegantes.', fontSize: 22, color: theme.text, align: 'center', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
  }

  // ==========================================
  // LAYOUT 2: THE GRID / MONDRIAN (SaaS UI)
  // ==========================================
  else if (theme.layoutType === 2) {
    slides.push({
      id: `${tid}-s1`, type: 'content', background: theme.bg, transition: 'slide',
      elements: [
        // Grid Boxes
        { id: genId('bx1'), type: 'text', left: 50, top: 50, width: 550, height: 400, zIndex: 0, content: '', backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0', fontSize: 16, color: 'transparent', align: 'left', bold: false, italic: false },
        { id: genId('bx2'), type: 'text', left: 620, top: 50, width: 350, height: 200, zIndex: 0, content: '', backgroundColor: theme.primary, borderRadius: 20, fontSize: 16, color: 'transparent', align: 'left', bold: false, italic: false },
        { id: genId('bx3'), type: 'text', left: 620, top: 270, width: 350, height: 180, zIndex: 0, content: '', backgroundColor: theme.secondary, borderRadius: 20, fontSize: 16, color: 'transparent', align: 'left', bold: false, italic: false },
        
        { id: genId('stk'), type: 'text', left: 90, top: 100, width: 140, height: 30, zIndex: 2, content: 'GRAMÁTICA', fontSize: 12, color: '#ffffff', backgroundColor: theme.text, borderRadius: 4, align: 'center', bold: true, italic: false, fontFamily: 'Inter, sans-serif' },
        { id: genId('tit'), type: 'title', left: 90, top: 160, width: 480, height: 120, zIndex: 2, content: theme.name, fontSize: 52, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('sub'), type: 'text', left: 90, top: 290, width: 480, height: 60, zIndex: 2, content: 'Aprende con una interfaz moderna y estructurada.', fontSize: 20, color: '#64748b', align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
    slides.push({
      id: `${tid}-s2`, type: 'content', background: theme.bg, transition: 'slide',
      elements: [
        { id: genId('bx1'), type: 'text', left: 50, top: 50, width: 924, height: 100, zIndex: 0, content: '', backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', fontSize: 16, color: 'transparent', align: 'left', bold: false, italic: false },
        { id: genId('tit'), type: 'title', left: 80, top: 70, width: 800, height: 60, zIndex: 1, content: 'Contenidos de la Unidad', fontSize: 36, color: theme.primary, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        
        { id: genId('g1'), type: 'text', left: 50, top: 180, width: 440, height: 120, zIndex: 1, content: 'Tema 1\nIntroducción', fontSize: 24, color: theme.text, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', padding: 20, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('g2'), type: 'text', left: 534, top: 180, width: 440, height: 120, zIndex: 1, content: 'Tema 2\nDesarrollo', fontSize: 24, color: theme.text, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', padding: 20, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('g3'), type: 'text', left: 50, top: 320, width: 924, height: 120, zIndex: 1, content: 'Tema 3\nPráctica Interactiva', fontSize: 24, color: theme.text, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', padding: 20, align: 'left', bold: true, italic: false, fontFamily: theme.font },
      ]
    });
    slides.push({
      id: `${tid}-s3`, type: 'content', background: theme.bg, transition: 'slide',
      elements: [
        { id: genId('bx1'), type: 'text', left: 50, top: 50, width: 924, height: 460, zIndex: 0, content: '', backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0', fontSize: 16, color: 'transparent', align: 'left', bold: false, italic: false },
        { id: genId('tit'), type: 'title', left: 100, top: 100, width: 824, height: 60, zIndex: 1, content: 'Teoría Principal', fontSize: 40, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('txt'), type: 'text', left: 100, top: 180, width: 824, height: 200, zIndex: 1, content: 'El diseño en grid facilita la lectura y organiza la información en bloques digeribles. Es ideal para estudiantes acostumbrados a interfaces web.', fontSize: 22, color: '#475569', align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
  }

  // ==========================================
  // LAYOUT 3: PLAYFUL / GAMIFIED (Kids/Teens)
  // ==========================================
  else if (theme.layoutType === 3) {
    slides.push({
      id: `${tid}-s1`, type: 'content', background: theme.bg, transition: 'bounce',
      elements: [
        { id: genId('w1'), type: 'graphic', left: 0, top: 400, width: 1024, height: 200, zIndex: 0, content: '', shapeType: 'wave', backgroundColor: theme.primary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('s1'), type: 'graphic', left: 100, top: 80, width: 80, height: 80, zIndex: 0, content: '', shapeType: 'star', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('s2'), type: 'graphic', left: 800, top: 150, width: 120, height: 120, zIndex: 0, content: '', shapeType: 'star', backgroundColor: theme.primary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        
        { id: genId('stk'), type: 'text', left: 412, top: 140, width: 200, height: 45, zIndex: 2, content: '¡NUEVO!', fontSize: 20, color: theme.primary, backgroundColor: theme.bg, borderRadius: 25, borderWidth: 3, borderColor: theme.primary, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        
        { id: genId('tit'), type: 'title', left: 100, top: 200, width: 824, height: 120, zIndex: 2, content: theme.name, fontSize: 72, color: theme.text, align: 'center', bold: true, italic: false, fontFamily: theme.font },
      ]
    });
    slides.push({
      id: `${tid}-s2`, type: 'content', background: theme.bg, transition: 'bounce',
      elements: [
        { id: genId('bx'), type: 'text', left: 100, top: 50, width: 824, height: 100, zIndex: 0, content: 'Mapa de la Aventura', fontSize: 45, color: theme.bg, backgroundColor: theme.primary, borderRadius: 50, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        
        { id: genId('c1'), type: 'graphic', left: 200, top: 220, width: 100, height: 100, zIndex: 1, content: '', shapeType: 'circle', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('t1'), type: 'text', left: 320, top: 245, width: 400, height: 50, zIndex: 1, content: 'Misión 1: Aprender', fontSize: 32, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        
        { id: genId('c2'), type: 'graphic', left: 200, top: 350, width: 100, height: 100, zIndex: 1, content: '', shapeType: 'circle', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('t2'), type: 'text', left: 320, top: 375, width: 400, height: 50, zIndex: 1, content: 'Misión 2: Jugar', fontSize: 32, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
      ]
    });
    slides.push({
      id: `${tid}-s3`, type: 'content', background: theme.bg, transition: 'bounce',
      elements: [
        { id: genId('bx'), type: 'text', left: 50, top: 50, width: 924, height: 460, zIndex: 0, content: '', backgroundColor: '#ffffff', borderRadius: 40, borderWidth: 4, borderColor: theme.primary, fontSize: 16, color: 'transparent', align: 'left', bold: false, italic: false },
        { id: genId('tit'), type: 'title', left: 100, top: 100, width: 824, height: 60, zIndex: 1, content: '¡Hora de aprender!', fontSize: 45, color: theme.primary, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('txt'), type: 'text', left: 150, top: 200, width: 724, height: 200, zIndex: 1, content: 'Las cajas redondeadas, los bordes gruesos y las fuentes divertidas aumentan la retención en los estudiantes más jóvenes.', fontSize: 26, color: theme.text, align: 'center', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
  }

  // ==========================================
  // LAYOUT 4: LUXURY MINIMALISM (Cambridge)
  // ==========================================
  else {
    slides.push({
      id: `${tid}-s1`, type: 'content', background: theme.bg, transition: 'fade',
      elements: [
        { id: genId('bg1'), type: 'graphic', left: 312, top: 88, width: 400, height: 400, zIndex: 0, content: '', shapeType: 'circle', backgroundColor: theme.secondary, color: 'transparent', fontSize: 16, align: 'left', bold: false, italic: false },
        { id: genId('lin'), type: 'text', left: 412, top: 200, width: 200, height: 2, zIndex: 2, content: '', backgroundColor: theme.text, color: 'transparent', fontSize: 10, align: 'center', bold: false, italic: false },
        
        { id: genId('tit'), type: 'title', left: 100, top: 230, width: 824, height: 80, zIndex: 2, content: theme.name, fontSize: 50, color: theme.text, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('sub'), type: 'text', left: 100, top: 320, width: 824, height: 40, zIndex: 2, content: 'SIMPLICIDAD Y ELEGANCIA', fontSize: 16, color: theme.primary, align: 'center', bold: true, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
    slides.push({
      id: `${tid}-s2`, type: 'content', background: theme.bg, transition: 'fade',
      elements: [
        { id: genId('linTop'), type: 'text', left: 100, top: 80, width: 824, height: 1, zIndex: 1, content: '', backgroundColor: theme.primary, color: 'transparent', fontSize: 10, align: 'center', bold: false, italic: false },
        { id: genId('tit'), type: 'title', left: 100, top: 110, width: 824, height: 50, zIndex: 1, content: 'I. CONTENIDOS', fontSize: 24, color: theme.text, align: 'center', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('linBot'), type: 'text', left: 100, top: 180, width: 824, height: 1, zIndex: 1, content: '', backgroundColor: theme.primary, color: 'transparent', fontSize: 10, align: 'center', bold: false, italic: false },
        
        { id: genId('tx1'), type: 'text', left: 200, top: 250, width: 624, height: 40, zIndex: 1, content: '1.0 Introducción .................................... 04', fontSize: 18, color: theme.text, align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
        { id: genId('tx2'), type: 'text', left: 200, top: 320, width: 624, height: 40, zIndex: 1, content: '2.0 Desarrollo   .................................... 08', fontSize: 18, color: theme.text, align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
        { id: genId('tx3'), type: 'text', left: 200, top: 390, width: 624, height: 40, zIndex: 1, content: '3.0 Conclusión   .................................... 12', fontSize: 18, color: theme.text, align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif' },
      ]
    });
    slides.push({
      id: `${tid}-s3`, type: 'content', background: theme.bg, transition: 'fade',
      elements: [
        { id: genId('tit'), type: 'title', left: 100, top: 100, width: 400, height: 60, zIndex: 1, content: '1.0 Teoría', fontSize: 32, color: theme.text, align: 'left', bold: true, italic: false, fontFamily: theme.font },
        { id: genId('lin'), type: 'text', left: 100, top: 180, width: 400, height: 1, zIndex: 1, content: '', backgroundColor: theme.primary, color: 'transparent', fontSize: 10, align: 'left', bold: false, italic: false },
        { id: genId('txt'), type: 'text', left: 100, top: 220, width: 400, height: 200, zIndex: 1, content: 'El minimalismo fuerza a enfocarse en lo verdaderamente importante. Menos distracciones, más aprendizaje.', fontSize: 18, color: theme.text, align: 'left', bold: false, italic: false, fontFamily: 'Arial, sans-serif', padding: 0 },
        { id: genId('img'), type: 'text', left: 560, top: 100, width: 364, height: 350, zIndex: 1, content: 'Espacio Visual', fontSize: 20, color: theme.primary, backgroundColor: theme.secondary, align: 'center', bold: false, italic: false, fontFamily: theme.font, padding: 150 },
      ]
    });
  }

  return {
    id: tid,
    name: theme.name,
    category: theme.category,
    thumbnailColor: theme.primary,
    slides
  };
});
