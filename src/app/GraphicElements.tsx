import React from 'react';

export const GraphicLibrary = {
  cloud_outline: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 25 55 C 10 55 10 35 25 35 C 30 15 60 10 70 25 C 85 20 95 35 90 50 C 95 65 80 80 65 75 C 55 85 30 85 25 75 C 10 80 10 65 25 55 Z" 
            stroke={stroke || '#000'} strokeWidth="3" fill={fill || '#fff'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cloud_solid: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 60 C 5 60 5 40 20 40 C 25 20 55 15 65 30 C 80 25 90 40 85 55 C 95 65 80 85 65 75 C 55 90 30 85 25 75 C 10 80 5 65 20 60 Z" 
            stroke={stroke || 'transparent'} strokeWidth="2" fill={fill || '#7dd3fc'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  circle_sketch: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 10 C 80 12 90 35 85 60 C 80 85 50 90 30 85 C 10 80 8 50 15 30 C 20 15 40 8 60 12 C 75 15 85 30 85 45" 
            stroke={stroke || '#ef4444'} strokeWidth="3" fill={fill || 'none'} strokeLinecap="round" fillOpacity="0.2" />
    </svg>
  ),
  circle_solid: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 5 C 75 5 95 25 95 50 C 95 75 75 95 50 95 C 25 95 5 75 5 50 C 5 25 25 5 50 5 Z" 
            stroke={stroke || 'transparent'} strokeWidth="0" fill={fill || '#fcd34d'} />
    </svg>
  ),
  arrow_curved: ({ stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 80 C 20 50 40 20 85 15 M 65 10 L 85 15 L 75 35" 
            stroke={stroke || '#000'} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrow_loop: ({ stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 50 C 30 10 70 10 70 40 C 70 70 40 70 40 50 C 40 30 70 30 90 60 M 70 60 L 90 60 L 85 40" 
            stroke={stroke || '#000'} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scribble: ({ stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 50 Q 20 20 30 50 T 50 50 T 70 50 T 90 50" 
            stroke={stroke || '#8b5cf6'} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star_sketch: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 10 L 60 40 L 90 40 L 65 60 L 75 90 L 50 70 L 25 90 L 35 60 L 10 40 L 40 40 Z" 
            stroke={stroke || '#f59e0b'} strokeWidth="3" fill={fill || '#fef3c7'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  rectangle: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100" fill={fill || '#e2e8f0'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  square: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100" fill={fill || '#e2e8f0'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  circle: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill={fill || '#e2e8f0'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  triangle: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,0 100,100 0,100" fill={fill || '#e2e8f0'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  star: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,54 78,85 50,65 22,85 32,54 5,35 39,35" fill={fill || '#fbbf24'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  wave: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,50 C25,25 75,75 100,50 L100,100 L0,100 Z" fill={fill || '#6366f1'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  blob: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.5,-75.8C55.4,-67.2,63.6,-53.4,70.6,-39.3C77.6,-25.2,83.5,-10.8,81.1,2.3C78.8,15.3,68.2,27.1,59.2,38.8C50.2,50.5,42.8,62.2,31.7,69.5C20.6,76.8,5.8,79.8,-7.8,77.5C-21.3,75.2,-33.6,67.6,-45.5,59.3C-57.3,51,-68.6,42,-74.7,29.9C-80.9,17.8,-81.8,2.7,-78.3,-11C-74.8,-24.7,-66.8,-37,-56.3,-47.5C-45.7,-58,-32.7,-66.7,-19.1,-71.4C-5.5,-76,8.8,-76.6,22.1,-74.6C35.4,-72.5,47.7,-67.8,43.5,-75.8Z" transform="translate(50 50)" fill={fill || '#86efac'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  ),
  organic: ({ fill, stroke }: any) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M38.5,-59.6C48.8,-51.7,55.3,-38.7,61.7,-25C68.1,-11.3,74.4,3.1,72.6,16.5C70.8,30,61.1,42.5,49.1,52.2C37.2,61.9,23,68.9,8.7,71.2C-5.6,73.5,-20,71.1,-32.5,64.3C-45,57.5,-55.6,46.3,-62.4,32.8C-69.2,19.3,-72.1,3.5,-68.8,-10.9C-65.4,-25.3,-55.9,-38.4,-44.1,-46.8C-32.3,-55.2,-18.2,-58.9,-3,-54.6C12.2,-50.3,28.2,-67.4,38.5,-59.6Z" transform="translate(50 50)" fill={fill || '#bef264'} stroke={stroke || 'transparent'} strokeWidth="2" />
    </svg>
  )
};

export const GRAPHIC_CATEGORIES = [
  {
    title: "Nubes",
    items: [
      { id: 'cloud_outline', label: 'Nube Borde', component: GraphicLibrary.cloud_outline, defaultFill: '#ffffff', defaultStroke: '#334155' },
      { id: 'cloud_solid', label: 'Nube Color', component: GraphicLibrary.cloud_solid, defaultFill: '#7dd3fc', defaultStroke: 'transparent' }
    ]
  },
  {
    title: "Círculos y Marcas",
    items: [
      { id: 'circle_sketch', label: 'Círculo Mano', component: GraphicLibrary.circle_sketch, defaultFill: 'none', defaultStroke: '#ef4444' },
      { id: 'circle_solid', label: 'Punto Color', component: GraphicLibrary.circle_solid, defaultFill: '#fcd34d', defaultStroke: 'transparent' },
      { id: 'star_sketch', label: 'Estrella Dibujo', component: GraphicLibrary.star_sketch, defaultFill: '#fef3c7', defaultStroke: '#f59e0b' },
      { id: 'circle', label: 'Círculo', component: GraphicLibrary.circle, defaultFill: '#e2e8f0', defaultStroke: 'transparent' },
      { id: 'star', label: 'Estrella', component: GraphicLibrary.star, defaultFill: '#fbbf24', defaultStroke: 'transparent' }
    ]
  },
  {
    title: "Flechas y Líneas",
    items: [
      { id: 'arrow_curved', label: 'Flecha Curva', component: GraphicLibrary.arrow_curved, defaultFill: 'none', defaultStroke: '#1e293b' },
      { id: 'arrow_loop', label: 'Flecha Lazo', component: GraphicLibrary.arrow_loop, defaultFill: 'none', defaultStroke: '#1e293b' },
      { id: 'scribble', label: 'Garabato', component: GraphicLibrary.scribble, defaultFill: 'none', defaultStroke: '#8b5cf6' }
    ]
  },
  {
    title: "Formas Básicas",
    items: [
      { id: 'rectangle', label: 'Rectángulo', component: GraphicLibrary.rectangle, defaultFill: '#e2e8f0', defaultStroke: 'transparent' },
      { id: 'square', label: 'Cuadrado', component: GraphicLibrary.square, defaultFill: '#e2e8f0', defaultStroke: 'transparent' },
      { id: 'triangle', label: 'Triángulo', component: GraphicLibrary.triangle, defaultFill: '#e2e8f0', defaultStroke: 'transparent' }
    ]
  },
  {
    title: "Orgánicas y Dinámicas",
    items: [
      { id: 'blob', label: 'Mancha (Blob)', component: GraphicLibrary.blob, defaultFill: '#86efac', defaultStroke: 'transparent' },
      { id: 'organic', label: 'Orgánica', component: GraphicLibrary.organic, defaultFill: '#bef264', defaultStroke: 'transparent' },
      { id: 'wave', label: 'Onda', component: GraphicLibrary.wave, defaultFill: '#6366f1', defaultStroke: 'transparent' }
    ]
  }
];
