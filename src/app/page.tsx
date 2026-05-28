"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Type, Image as ImageIcon, Volume2, Gamepad2, MousePointer2, 
  LayoutTemplate, Play, Download, Settings, Sparkles, Plus, 
  Trash2, CheckCircle2, Circle, TypeOutline, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Video,
  ChevronLeft, ChevronRight, Monitor, FileText, X,
  Shapes, Square, Star, Cloud, ArrowRight, Minus,
  Pencil, Highlighter, Eraser, Folder
} from 'lucide-react';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import pptxgen from 'pptxgenjs';
import { GraphicLibrary, GRAPHIC_CATEGORIES } from './GraphicElements';
import { Slide, SlideElement, QuizElement, TitleElement, TextElement, VocabularyElement, BaseElement } from '../types';
import { generateAILesson, generateAIWorksheet, INITIAL_SLIDES } from '../templates';
import { PREMIUM_TEMPLATES } from '../templateLibrary';

// Initial dummy state
const initialSlides: Slide[] = INITIAL_SLIDES; // load all slides to showcase the platform

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

export default function Editor() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [presentationTool, setPresentationTool] = useState<'pointer' | 'pen' | 'highlighter'>('pointer');
  const [drawings, setDrawings] = useState<{ path: string, color: string, width: number }[]>([]);
  const [currentPath, setCurrentPath] = useState<{ points: {x: number, y: number}[], color: string, width: number } | null>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiForm, setAiForm] = useState({
    subject: '',
    topic: '',
    slideCount: 12,
    age: '10 años',
    imageType: 'Ilustraciones 2D'
  });

  const [showAIDuplicateModal, setShowAIDuplicateModal] = useState<number | null>(null);
  const [showAIMediaModal, setShowAIMediaModal] = useState<'image' | 'video' | 'audio' | null>(null);
  const [showVideoInputModal, setShowVideoInputModal] = useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [layoutFormat, setLayoutFormat] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // References for export
  const exportContainerRef = useRef<HTMLDivElement>(null);

  // Load template from Dashboard if present
  useEffect(() => {
    const templateId = localStorage.getItem('aura_template_id');
    if (templateId) {
      const template = PREMIUM_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setSlides(template.slides);
        setActiveSlideIndex(0);
        setLayoutFormat('horizontal');
      }
      localStorage.removeItem('aura_template_id');
    }
  }, []);

  const activeSlide = slides[activeSlideIndex];
  const selectedElement = activeSlide?.elements.find((e: any) => e.id === selectedElementId);

  // Clear drawings on slide change or exit
  useEffect(() => {
    setDrawings([]);
    setCurrentPath(null);
  }, [activeSlideIndex, isPlaying]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (presentationTool === 'pointer') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentPath({
      points: [{ x, y }],
      color: presentationTool === 'pen' ? '#ef4444' : 'rgba(234, 179, 8, 0.4)',
      width: presentationTool === 'pen' ? 4 : 24
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!currentPath) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentPath(prev => prev ? {
      ...prev,
      points: [...prev.points, { x, y }]
    } : null);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!currentPath) return;
    if (currentPath.points.length > 1) {
      const d = currentPath.points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
      setDrawings(prev => [...prev, { path: d, color: currentPath.color, width: currentPath.width }]);
    }
    setCurrentPath(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Presentation Mode Keyboard Navigation
  useEffect(() => {
    if (!isPlaying) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (activeSlideIndex < slides.length - 1) setActiveSlideIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft') {
        if (activeSlideIndex > 0) setActiveSlideIndex(prev => prev - 1);
      }
      if (e.key === 'Escape') {
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, activeSlideIndex, slides.length]);

  // Handlers
  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide_${Date.now()}`,
      type: 'blank',
      transition: 'fade',
      elements: [],
      background: '#ffffff'
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const addElement = (type: any, extraProps: any = {}) => {
    if (slides.length === 0) return;
    let newElement: Partial<SlideElement> = {
      id: `el-${Date.now()}`,
      type,
      left: 50,
      top: 50,
      width: 200,
      height: 100,
      zIndex: slides[activeSlideIndex].elements.length + 1,
      ...extraProps
    };
    
    if (type === 'title') {
      newElement = { ...newElement, content: 'Nuevo Título', fontSize: 40, color: '#000000', align: 'center', bold: true, italic: false, underline: false };
    } else if (type === 'text') {
      newElement = { ...newElement, content: 'Escribe tu texto aquí...', fontSize: 24, color: '#333333', align: 'left', bold: false, italic: false, underline: false };
    } else if (type === 'quiz') {
      newElement = { ...newElement, width: 600, height: 300, question: '¿Pregunta?', options: ['Opción 1', 'Opción 2'], correctIndex: 0, backgroundColor: '#ffffff', borderRadius: 12, padding: 20 };
    }

    const updatedSlides = [...slides];
    updatedSlides[activeSlideIndex].elements.push(newElement as SlideElement);
    setSlides(updatedSlides);
    setSelectedElementId(newElement.id as string);
  };

  const handleFileUpload = (type: 'image' | 'video' | 'audio') => {
    const input = document.createElement('input');
    input.type = 'file';
    if (type === 'image') input.accept = 'image/*';
    if (type === 'video') input.accept = 'video/*';
    if (type === 'audio') input.accept = 'audio/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      addElement(type, { src: url, width: type === 'audio' ? 300 : 400, height: type === 'audio' ? 60 : 300 });
    };
    input.click();
  };

  const confirmMedia = async (useAI: boolean) => {
    const type = showAIMediaModal;
    setShowAIMediaModal(null);
    if (!type) return;

    if (!useAI) {
      handleFileUpload(type);
      return;
    }

    if (!aiForm.topic) {
      alert("Por favor, ingresa un Tema en el panel de IA (botón superior derecho) antes de usar la IA para multimedia.");
      return;
    }

    setIsAILoading(true);
    try {
      let endpoint = '';
      if (type === 'image') endpoint = '/api/v1/generate_image';
      if (type === 'video') endpoint = '/api/v1/search_video';
      if (type === 'audio') endpoint = '/api/v1/generate_audio';

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiForm.topic, prompt: '' })
      });
      const data = await res.json();
      if (data.url) {
        addElement(type, { src: data.url, width: type === 'audio' ? 300 : type === 'video' ? 600 : 400, height: type === 'audio' ? 60 : type === 'video' ? 340 : 300 });
      }
    } catch (e) {
      console.error(e);
      alert("Hubo un error al conectar con el servidor de IA.");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleDuplicateRequest = (idx: number, e: any) => {
    e.stopPropagation();
    const slide = slides[idx];
    const isExercise = slide.elements.some((el: any) => el.type === 'quiz');
    if (isExercise) {
      setShowAIDuplicateModal(idx);
    } else {
      confirmDuplicate(idx, false);
    }
  };

  const confirmDuplicate = async (idx: number, useAI: boolean) => {
    setShowAIDuplicateModal(null);
    const originalSlide = slides[idx];
    
    if (!useAI) {
      // Manual Clone
      const clone = JSON.parse(JSON.stringify(originalSlide));
      clone.id = `slide_${Date.now()}`;
      clone.elements.forEach((el: any) => { el.id = `el-${Math.random()}`; });
      const newSlides = [...slides];
      newSlides.splice(idx + 1, 0, clone);
      setSlides(newSlides);
      setActiveSlideIndex(idx + 1);
      return;
    }

    // AI Generation for Exercises
    if (!aiForm.topic) {
      alert("Por favor, ingresa un Tema en el panel superior de IA.");
      return;
    }

    setIsAILoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/v1/generate_exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiForm.topic, subject: aiForm.subject || 'Spanish', cefr_level: 'A1' })
      });
      const data = await res.json();
      const exercises = data.exercises || [];

      // Create a new slide per exercise or one giant slide (let's do one giant slide with the first 2-3 to fit, or stack them)
      // Actually, we can just replace the quiz elements in a clone of the original slide
      const newSlide = JSON.parse(JSON.stringify(originalSlide));
      newSlide.id = `slide_${Date.now()}`;
      
      let qIndex = 0;
      newSlide.elements.forEach((el: any) => {
        el.id = `el-${Math.random()}`;
        if (el.type === 'quiz' && exercises[qIndex]) {
          const ex = exercises[qIndex];
          el.question = ex.question;
          el.options = ex.options;
          el.correctIndex = ex.options.indexOf(ex.correct_answer);
          if (el.correctIndex === -1) el.correctIndex = 0;
          qIndex++;
        }
      });
      
      const newSlides = [...slides];
      newSlides.splice(idx + 1, 0, newSlide);
      setSlides(newSlides);
      setActiveSlideIndex(idx + 1);

    } catch (e) {
      console.error(e);
      alert("Error al generar nuevos ejercicios.");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    // Give react time to render the hidden container
    setTimeout(async () => {
      try {
        const pdf = new jsPDF({
          orientation: layoutFormat === 'horizontal' ? 'landscape' : 'portrait',
          unit: 'px',
          format: layoutFormat === 'horizontal' ? [1920, 1080] : [1080, 1527]
        });

        const slideElements = document.querySelectorAll('.export-slide-node');
        for (let i = 0; i < slideElements.length; i++) {
          const imgData = await htmlToImage.toJpeg(slideElements[i] as HTMLElement, { quality: 0.95, pixelRatio: 1.5 });
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, 0, layoutFormat === 'horizontal' ? 1920 : 1080, layoutFormat === 'horizontal' ? 1080 : 1527);
        }
        pdf.save('leccion.pdf');
      } catch (e) {
        console.error(e);
        alert("Error al exportar PDF");
      }
      setIsExporting(false);
    }, 500);
  };

  const handleExportPPT = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    setTimeout(async () => {
      try {
        const pres = new pptxgen();
        pres.layout = layoutFormat === 'horizontal' ? 'LAYOUT_16x9' : { name: 'A4', width: 8.27, height: 11.69 } as any;
        
        const slideElements = document.querySelectorAll('.export-slide-node');
        for (let i = 0; i < slideElements.length; i++) {
          const imgData = await htmlToImage.toPng(slideElements[i] as HTMLElement, { pixelRatio: 1.5 });
          const slide = pres.addSlide();
          slide.addImage({ data: imgData, x: 0, y: 0, w: '100%', h: '100%' });
        }
        pres.writeFile({ fileName: 'leccion.pptx' });
      } catch (e) {
        console.error(e);
        alert("Error al exportar PPTX");
      }
      setIsExporting(false);
    }, 500);
  };

  const submitVideoUrl = () => {
    if(!videoUrlInput) return;
    let finalUrl = videoUrlInput;
    if(videoUrlInput.includes('youtube.com/watch?v=')) {
       const videoId = videoUrlInput.split('v=')[1].split('&')[0];
       finalUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if(videoUrlInput.includes('youtu.be/')) {
       const videoId = videoUrlInput.split('youtu.be/')[1].split('?')[0];
       finalUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    addElement('video', { src: finalUrl, width: 600, height: 340 });
    setShowVideoInputModal(false);
    setVideoUrlInput('');
  };

  const updateElement = (id: string, updates: Partial<SlideElement>) => {
    const updatedSlides = [...slides];
    const elements = updatedSlides[activeSlideIndex].elements;
    const index = elements.findIndex(e => e.id === id);
    if (index > -1) {
      elements[index] = { ...elements[index], ...updates } as any;
      setSlides(updatedSlides);
    }
  };

  const handleGenerateAI = async () => {
    if (!aiForm.topic) return;
    const generated = await generateAILesson(
      aiForm.topic, 
      aiForm.age, 
      'A1-A2', 
      aiForm.subject, 
      aiForm.slideCount, 
      aiForm.imageType
    );
    setLayoutFormat('horizontal');
    setSlides(generated);
    setActiveSlideIndex(0);
    setShowAIPanel(false);
  };

  const handleGenerateWorksheet = async () => {
    if (!aiForm.topic) return;
    const generated = await generateAIWorksheet(aiForm.topic, aiForm.subject);
    setLayoutFormat('vertical');
    setSlides(generated);
    setActiveSlideIndex(0);
    setShowAIPanel(false);
  };

  // Helper to convert pixels to percentage for responsive canvas
  const toPctX = (px: number) => `${(px / CANVAS_WIDTH) * 100}%`;
  const toPctY = (px: number) => `${(px / CANVAS_HEIGHT) * 100}%`;

  const renderElement = (el: SlideElement) => {
    switch (el.type) {
      case 'title':
        return (
          <div style={{
            fontSize: `${(el.fontSize / CANVAS_WIDTH) * 100}cqw`,
            color: el.color,
            textAlign: el.align as any,
            fontWeight: el.bold ? 'bold' : 'normal',
            fontStyle: el.italic ? 'italic' : 'normal',
            textDecoration: (el as any).underline ? 'underline' : 'none',
            fontFamily: (el as any).fontFamily || 'sans-serif',
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: el.align === 'center' ? 'center' : el.align === 'right' ? 'flex-end' : 'flex-start'
          }}>
            {el.content}
          </div>
        );
      case 'text':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: (el as any).backgroundColor || 'transparent',
            color: (el as any).color || 'black',
            fontSize: `${(el as any).fontSize || 16}px`,
            fontFamily: (el as any).fontFamily || 'sans-serif',
            textAlign: el.align as any,
            fontWeight: (el as any).bold ? 'bold' : 'normal',
            fontStyle: (el as any).italic ? 'italic' : 'normal',
            textDecoration: (el as any).underline ? 'underline' : 'none',
            whiteSpace: 'pre-wrap',
            padding: (el as any).padding || '0px',
            borderRadius: (el as any).borderRadius || '0px',
            border: (el as any).borderWidth ? `${(el as any).borderWidth}px solid ${(el as any).borderColor}` : 'none',
            clipPath: (el as any).clipPath || 'none',
            textShadow: (el as any).textShadow || 'none'
          }}>
            {el.content}
          </div>
        );
      case 'image':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundImage: `url(${el.src || ''})`,
            backgroundSize: el.contain ? 'contain' : 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '0px', // Oxford sharp edges
            border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor}` : 'none'
          }} />
        );
      case 'video':
        return (
          <video 
            src={el.src} 
            controls 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0px', border: '1px solid #cbd5e1' }}
          />
        );
      case 'audio':
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
            <audio src={el.src} controls style={{ width: '90%' }} />
          </div>
        );
      case 'vocabulary':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: '#ffffff', // Force Oxford White
            border: '1px solid #cbd5e1', // Force Oxford Border
            borderRadius: '0px', // Force sharp corners
            padding: el.padding || '20px',
            color: '#0f172a',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px',
            boxShadow: 'none'
          }}>
            <h3 style={{ fontSize: '2cqw', fontWeight: 'bold', fontFamily: 'serif', color: '#1e3a8a' }}>{el.spanish}</h3>
            <p style={{ fontSize: '1.2cqw', color: '#64748b' }}>{el.pronunciation}</p>
            <p style={{ fontSize: '1.5cqw', color: '#0f172a' }}>{el.english}</p>
            <div style={{ marginTop: '10px', fontSize: '1.2cqw', fontStyle: 'italic', borderLeft: '3px solid #b45309', paddingLeft: '10px' }}>"{el.example}"</div>
          </div>
        );
      case 'grammar':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: '#eff6ff', // Force Oxford Light Blue
            borderRadius: '0px',
            border: '1px solid #1e3a8a', // Force Oxford Blue Border
            padding: el.padding || '30px',
            color: '#0f172a',
            display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: 'none'
          }}>
            <h3 style={{ fontSize: '2.5cqw', fontWeight: 'bold', color: '#1e3a8a', fontFamily: 'serif' }}>{el.ruleTitle}</h3>
            <p style={{ fontSize: '1.5cqw', fontFamily: 'serif' }}>{el.explanation}</p>
            <div style={{ backgroundColor: '#f1f5f9', padding: '15px', borderRadius: '4px', fontSize: '1.4cqw', fontFamily: 'monospace', color: '#0f172a', border: '1px solid #e2e8f0' }}>
              {el.formula}
            </div>
            <p style={{ fontSize: '1.4cqw', fontStyle: 'italic', whiteSpace: 'pre-wrap', color: '#475569' }}>{el.example}</p>
          </div>
        );
      case 'quiz':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: '#f8fafc',
            borderRadius: '0px',
            border: '1px solid #cbd5e1',
            padding: el.padding || '30px',
            color: '#0f172a',
            display: 'flex', flexDirection: 'column', gap: '20px',
            boxShadow: 'none'
          }}>
            <h3 style={{ fontSize: '2cqw', fontWeight: 'bold', fontFamily: 'serif' }}>{el.question}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {el.options.map((opt, i) => (
                <div key={i} style={{ 
                  padding: '12px 20px', borderRadius: '6px', 
                  border: i === el.correctIndex ? '2px solid #b45309' : '1px solid #e2e8f0',
                  backgroundColor: i === el.correctIndex ? '#fffbeb' : '#ffffff',
                  display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.5cqw',
                  boxShadow: 'none'
                }}>
                  {i === el.correctIndex ? <CheckCircle2 size={24} color="#b45309" /> : <Circle size={24} color="#cbd5e1" />}
                  <span style={{ color: i === el.correctIndex ? '#78350f' : '#334155' }}>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'dialogue':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: el.backgroundColor,
            borderRadius: el.borderRadius,
            border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor}` : 'none',
            padding: '30px',
            color: '#1e293b',
            display: 'flex', flexDirection: 'column', gap: '20px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.8cqw', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Diálogo</h3>
            {(el as any).lines?.map((line: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 'bold', color: line.speaker === 'A' ? '#2563eb' : '#db2777', fontSize: '1.4cqw', minWidth: '40px' }}>{line.speaker}:</span>
                <span style={{ fontSize: '1.5cqw', flex: 1, fontFamily: 'serif', lineHeight: '1.6' }}>{line.text}</span>
              </div>
            ))}
          </div>
        );
      case 'speaking':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: el.backgroundColor,
            borderRadius: el.borderRadius,
            border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor}` : 'none',
            padding: '24px',
            color: '#1e293b',
            display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
             <h3 style={{ fontSize: '2.5cqw', fontWeight: 'bold', color: '#db2777', textTransform: 'uppercase', letterSpacing: '2px' }}>Lee en voz alta</h3>
             <p style={{ fontSize: '2.5cqw', fontStyle: 'italic', fontFamily: 'serif', color: '#0f172a' }}>"{el.phrase}"</p>
             <p style={{ fontSize: '1.4cqw', color: '#64748b' }}>{el.translation}</p>
          </div>
        );
      case 'dragdrop':
        return (
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: el.backgroundColor,
            borderRadius: el.borderRadius,
            border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor}` : 'none',
            padding: '24px',
            color: '#1e293b',
            display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
             <h3 style={{ fontSize: '2cqw', fontWeight: 'bold', color: '#2563eb' }}>{el.instruction || "Relaciona los pares"}</h3>
             <div style={{ display: 'flex', gap: '40px', width: '100%', justifyContent: 'space-around', marginTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   {(el as any).pairs?.map((p:any) => <div key={p.id} style={{ padding: '15px 25px', backgroundColor: '#f8fafc', borderRadius: '6px', fontSize: '1.5cqw', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>{p.left}</div>)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   {(el as any).pairs?.map((p:any) => <div key={p.id} style={{ padding: '15px 25px', backgroundColor: '#ffffff', border: '2px dashed #cbd5e1', borderRadius: '6px', fontSize: '1.5cqw', color: '#64748b' }}>{p.right}</div>).reverse()}
                </div>
             </div>
          </div>
        );
      case 'imagegrid':
        return (
          <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
             {(el as any).cards?.map((card: any, i: number) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <div style={{ position: 'relative', width: '100%', height: '120px', backgroundColor: '#e2e8f0', backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#6366f1', color: '#fff', padding: '5px 15px', fontWeight: 'bold', borderBottomRightRadius: '8px' }}>{card.num}</div>
                   </div>
                   <div style={{ fontSize: '14px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                      {card.text.split('_____').map((part: string, idx: number, arr: any) => (
                         <span key={idx}>
                            {part}
                            {idx < arr.length - 1 && (
                               <select style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 5px', margin: '0 5px' }}>
                                  <option></option>
                                  {card.dropdown.map((opt: string) => <option key={opt}>{opt}</option>)}
                               </select>
                            )}
                         </span>
                      ))}
                   </div>
                </div>
             ))}
          </div>
        );
      case 'scattercards':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
             {(el as any).cards?.map((card: any, i: number) => {
                const rotation = i === 0 ? '-5deg' : i === 1 ? '5deg' : '0deg';
                const left = i === 0 ? '0px' : '220px';
                const top = i === 0 ? '20px' : '0px';
                return (
                   <div key={i} style={{ position: 'absolute', left, top, width: '200px', backgroundColor: '#fff', border: '3px solid #fca5a5', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transform: `rotate(${rotation})`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.id}</div>
                      <div style={{ fontSize: '11px', color: '#333' }}>{card.body}</div>
                      <div style={{ backgroundColor: '#fca5a5', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', width: '100%' }}>{card.question}</div>
                   </div>
                )
             })}
          </div>
        );
      case 'shape':
      case 'graphic':
        const GraphicComponent = (GraphicLibrary as any)[el.shapeType];
        if (GraphicComponent) {
          return (
            <div className="w-full h-full flex items-center justify-center">
              <GraphicComponent fill={el.backgroundColor} stroke={el.borderColor} />
            </div>
          );
        }
        return <div />;
      default:
        return <div style={{ color: 'white', padding: 10 }}>Block: {el.type}</div>;
    }
  };

  // Render components
  return (
    <div className="flex flex-col h-screen bg-[#f3f4f6] text-gray-900 overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-inner">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Aura Builder
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors mr-2 flex items-center gap-2">
              <Folder className="w-4 h-4" /> Mis Proyectos
            </button>
          </Link>
          <button 
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full font-semibold hover:from-indigo-100 hover:to-purple-100 flex items-center gap-2 transition-all shadow-sm border border-indigo-100"
          >
            <Sparkles className="w-4 h-4" />
            AI Generator
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          
          {/* Layout Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button 
              onClick={() => setLayoutFormat('horizontal')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${layoutFormat === 'horizontal' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Monitor className="w-4 h-4 inline-block mr-1" /> 16:9
            </button>
            <button 
              onClick={() => setLayoutFormat('vertical')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${layoutFormat === 'vertical' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FileText className="w-4 h-4 inline-block mr-1" /> A4
            </button>
          </div>

          <button 
            onClick={() => setIsPlaying(true)}
            className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
          >
            <Play className="w-4 h-4" />
            Preview
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-2 shadow-md shadow-indigo-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            {showExportMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
                <button onClick={handleExportPPT} className="w-full text-left px-4 py-3 hover:bg-indigo-50 text-gray-700 font-bold text-sm border-b border-gray-100 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-indigo-600"/> Microsoft PowerPoint
                </button>
                <button onClick={handleExportPDF} className="w-full text-left px-4 py-3 hover:bg-indigo-50 text-gray-700 font-bold text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-600"/> Documento PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Tools */}
        <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6 z-10 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
          <ToolButton icon={<TypeOutline />} label="Title" onClick={() => addElement('title')} />
          <ToolButton icon={<Type />} label="Text" onClick={() => addElement('text')} />
          <ToolButton icon={<ImageIcon />} label="Image" onClick={() => setShowAIMediaModal('image')} />
          <ToolButton icon={<Video />} label="Video" onClick={() => setShowVideoInputModal(true)} />
          <ToolButton icon={<Shapes />} label="Formas" onClick={() => setShowShapeModal(true)} />
          <ToolButton icon={<Gamepad2 />} label="Quiz" onClick={() => addElement('quiz')} />
          <div className="w-10 h-px bg-gray-200 my-2"></div>
          <ToolButton icon={<Volume2 />} label="Audio" onClick={() => setShowAIMediaModal('audio')} />
          <ToolButton icon={<MousePointer2 />} label="Interact" onClick={() => addElement('dragdrop')} />
        </aside>

        {/* Slides Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4 z-10 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Slides</h2>
            <button onClick={addSlide} className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {slides.map((slide, idx) => (
            <div 
              key={slide.id} 
              onClick={() => {
                setActiveSlideIndex(idx);
                setSelectedElementId(null);
              }}
              className={`group ${layoutFormat === 'horizontal' ? 'aspect-video' : 'aspect-[1/1.414]'} rounded-xl border-2 cursor-pointer transition-all overflow-hidden flex items-center justify-center relative ${
                activeSlideIndex === idx ? 'border-indigo-500 shadow-md ring-4 ring-indigo-50' : 'border-gray-200 hover:border-indigo-300'
              }`}
              style={{ background: slide.background }}
            >
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
              <span className={`absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded ${activeSlideIndex === idx ? 'bg-indigo-500 text-white' : 'bg-white/50 text-gray-700'}`}>{idx + 1}</span>
              
              {/* Duplicate Button */}
              <button 
                onClick={(e) => handleDuplicateRequest(idx, e)}
                className="absolute bottom-2 right-2 p-1.5 bg-white/80 hover:bg-white text-indigo-600 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Duplicar Diapositiva"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 bg-[#f3f4f6] flex items-center justify-center p-8 overflow-hidden relative">
          
          {/* Loading Spinner Overlays */}
          {isAILoading && (
            <div className="absolute inset-0 z-[100] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-indigo-900 font-bold animate-pulse">Cerebro IA procesando...</p>
            </div>
          )}
          
          {isExporting && (
            <div className="absolute inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-indigo-900 font-bold text-xl animate-pulse">Preparando archivo para descarga...</p>
            </div>
          )}

          {/* Video PC vs YouTube Modal */}
          {showVideoInputModal && (
            <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                  <Video className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Insertar Video</h3>
                <p className="text-gray-500 mb-6">Pega un enlace de YouTube o sube un video desde tu PC.</p>
                
                <input 
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 mb-4"
                />
                
                <div className="flex flex-col gap-3">
                  <button onClick={submitVideoUrl} disabled={!videoUrlInput} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50">
                    Insertar desde YouTube
                  </button>
                  <div className="relative py-2 flex items-center">
                     <div className="flex-grow border-t border-gray-300"></div>
                     <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">O</span>
                     <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <button onClick={() => { setShowVideoInputModal(false); handleFileUpload('video'); }} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 flex justify-center items-center gap-2">
                    <Monitor className="w-5 h-5"/> Subir desde mi PC
                  </button>
                  <button onClick={() => setShowVideoInputModal(false)} className="mt-2 text-sm text-gray-400 hover:text-gray-600 font-bold">Cancelar</button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Shape Selection Modal */}
          {showShapeModal && (
            <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full text-center max-h-[80vh] flex flex-col">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                    <Shapes className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Elementos Gráficos</h3>
                  <p className="text-gray-500 mb-6">Añade figuras estilo libre y garabatos a tu presentación.</p>
                </div>
                
                <div className="flex-1 overflow-y-auto px-4 mb-6">
                  {GRAPHIC_CATEGORIES.map((category, idx) => (
                    <div key={idx} className="mb-8 text-left">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{category.title}</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {category.items.map(shape => (
                          <button 
                            key={shape.id}
                            onClick={() => {
                              addElement('graphic', { shapeType: shape.id, backgroundColor: shape.defaultFill, borderColor: shape.defaultStroke, width: 200, height: 200 });
                              setShowShapeModal(false);
                            }}
                            className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors"
                          >
                            <div className="w-16 h-16 flex items-center justify-center text-gray-700">
                              <shape.component fill={shape.defaultFill} stroke={shape.defaultStroke} />
                            </div>
                            <span className="text-xs font-bold">{shape.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex-shrink-0 pt-4 border-t border-gray-100">
                  <button onClick={() => setShowShapeModal(false)} className="text-sm text-gray-500 hover:text-gray-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-100">Cancelar</button>
                </div>
              </motion.div>
            </div>
          )}

          {/* AI Media Choice Modal */}
          {showAIMediaModal && (
            <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Insertar Multimedia</h3>
                <p className="text-gray-500 mb-8">¿Deseas generar este recurso automáticamente con IA o subirlo desde tus archivos?</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => confirmMedia(true)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex justify-center items-center gap-2">
                    <Sparkles className="w-5 h-5"/> Generar con IA
                  </button>
                  <button onClick={() => confirmMedia(false)} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">
                    Subir desde mi PC
                  </button>
                  <button onClick={() => setShowAIMediaModal(null)} className="mt-2 text-sm text-gray-400 hover:text-gray-600">Cancelar</button>
                </div>
              </motion.div>
            </div>
          )}

          {/* AI Duplicate Choice Modal */}
          {showAIDuplicateModal !== null && (
            <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Duplicar Ejercicios</h3>
                <p className="text-gray-500 mb-8">¿Quieres clonar esta hoja vacía para editarla a mano, o generar 5 preguntas nuevas con IA?</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => confirmDuplicate(showAIDuplicateModal, true)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex justify-center items-center gap-2">
                    <Sparkles className="w-5 h-5"/> Inventar Nuevos con IA
                  </button>
                  <button onClick={() => confirmDuplicate(showAIDuplicateModal, false)} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">
                    Clonar Exacto (Manual)
                  </button>
                  <button onClick={() => setShowAIDuplicateModal(null)} className="mt-2 text-sm text-gray-400 hover:text-gray-600">Cancelar</button>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* AI Panel Overlay */}
          {showAIPanel && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-6 right-6 w-[450px] bg-white rounded-2xl shadow-2xl p-6 border border-indigo-100 z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">Generar con IA</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Configura los detalles de tu lección y nuestra IA construirá la estructura completa.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Asignatura</label>
                  <input 
                    type="text"
                    value={aiForm.subject}
                    onChange={(e) => setAiForm({...aiForm, subject: e.target.value})}
                    placeholder="Ej: Español, Matemáticas, Ciencias..."
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tema a trabajar</label>
                  <textarea 
                    value={aiForm.topic}
                    onChange={(e) => setAiForm({...aiForm, topic: e.target.value})}
                    placeholder="Ej: El verbo ser y estar..."
                    className="w-full p-2.5 border border-gray-200 rounded-lg h-20 resize-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Público (Edad)</label>
                    <input 
                      type="text"
                      value={aiForm.age}
                      onChange={(e) => setAiForm({...aiForm, age: e.target.value})}
                      placeholder="Ej: Niños de 10 años"
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Diapositivas</label>
                    <input 
                      type="number"
                      min="1"
                      max="30"
                      value={aiForm.slideCount}
                      onChange={(e) => setAiForm({...aiForm, slideCount: parseInt(e.target.value) || 1})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tipo de imágenes</label>
                  <select 
                    value={aiForm.imageType}
                    onChange={(e) => setAiForm({...aiForm, imageType: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
                  >
                    <option value="Ilustraciones 2D vectoriales">Ilustraciones 2D vectoriales</option>
                    <option value="Fotografías realistas">Fotografías realistas</option>
                    <option value="Estilo anime/cartoon">Estilo anime/cartoon</option>
                    <option value="Acuarela">Acuarela</option>
                    <option value="Iconos minimalistas">Iconos minimalistas</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setShowAIPanel(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={handleGenerateWorksheet}
                    disabled={!aiForm.topic}
                    className="px-4 py-2 bg-pink-100 text-pink-700 hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold shadow-sm flex items-center gap-2 transition-all transform hover:scale-105"
                  >
                    <FileText className="w-4 h-4" />
                    Generar Tarea A4
                  </button>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={!aiForm.topic}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold shadow-md flex items-center gap-2 transition-all transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generar Clase
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* The Canvas (16:9 or A4 Ratio Container) */}
          <div className={`relative w-full ${layoutFormat === 'horizontal' ? 'max-w-5xl aspect-video' : 'max-w-3xl aspect-[1/1.414]'}`} style={{ containerType: 'inline-size' }}>
            <div 
              className="absolute inset-0 bg-white shadow-2xl ring-1 ring-gray-900/5 overflow-hidden transition-colors duration-500"
              style={{ background: activeSlide?.background || '#ffffff' }}
              onClick={() => setSelectedElementId(null)}
            >
              {activeSlide?.elements.map((el: any) => (
                <motion.div
                  key={el.id}
                  drag
                  dragMomentum={false}
                  onDragEnd={(event, info) => {
                    const rect = (event.target as HTMLElement).closest('.absolute.inset-0')?.getBoundingClientRect();
                    if (!rect) return;
                    const dx = (info.offset.x / rect.width) * CANVAS_WIDTH;
                    const dy = (info.offset.y / rect.height) * CANVAS_HEIGHT;
                    updateElement(el.id, { 
                      left: el.left + dx,
                      top: el.top + dy 
                    });
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElementId(el.id);
                  }}
                  className={`absolute cursor-move origin-top-left ${
                    selectedElementId === el.id ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                  }`}
                  style={{
                    top: toPctY(el.top),
                    left: toPctX(el.left),
                    width: toPctX(el.width),
                    height: el.height ? toPctY(el.height) : 'auto',
                    zIndex: el.zIndex || 1,
                  }}
                >
                  {renderElement(el)}
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col gap-8 overflow-y-auto z-10 shadow-[-2px_0_10px_rgba(0,0,0,0.02)]">
          {selectedElement ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-gray-400"/>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Propiedades</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">Tipo de Elemento</p>
                  <p className="text-sm font-bold text-gray-900 capitalize">{selectedElement.type}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Tamaño (Ancho / Alto)</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={(selectedElement as any).width || 200} 
                        onChange={e => updateElement(selectedElement.id, { width: parseInt(e.target.value) || 200 } as any)} 
                        className="w-1/2 p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Ancho px" 
                      />
                      <input 
                        type="number" 
                        value={(selectedElement as any).height || 100} 
                        onChange={e => updateElement(selectedElement.id, { height: parseInt(e.target.value) || 100 } as any)} 
                        className="w-1/2 p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Alto px" 
                      />
                    </div>
                  </div>

                  {selectedElement.type !== 'image' && selectedElement.type !== 'video' && selectedElement.type !== 'audio' && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Color del Cuadro (Fondo)</label>
                        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                          <input 
                            type="color" 
                            value={(selectedElement as any).backgroundColor || '#ffffff'} 
                            onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value } as any)}
                            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                          />
                          <button 
                            onClick={() => updateElement(selectedElement.id, { backgroundColor: 'transparent' } as any)}
                            className="text-xs font-bold text-gray-500 px-2 py-1 hover:bg-gray-200 rounded"
                          >
                            Quitar fondo
                          </button>
                        </div>
                      </div>
                      
                      {(selectedElement.type === 'graphic' || selectedElement.type === 'shape') && (
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Color de Línea (Borde)</label>
                          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                            <input 
                              type="color" 
                              value={(selectedElement as any).borderColor || '#000000'} 
                              onChange={(e) => updateElement(selectedElement.id, { borderColor: e.target.value } as any)}
                              className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                            />
                            <button 
                              onClick={() => updateElement(selectedElement.id, { borderColor: 'transparent' } as any)}
                              className="text-xs font-bold text-gray-500 px-2 py-1 hover:bg-gray-200 rounded"
                            >
                              Quitar borde
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {(selectedElement.type === 'title' || selectedElement.type === 'text') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Tamaño de letra (px)</label>
                      <input 
                        type="number" 
                        value={(selectedElement as any).fontSize || 16} 
                        onChange={e => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) || 16 } as any)} 
                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" 
                        placeholder="Ej. 24" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Color de texto</label>
                      <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <input 
                          type="color" 
                          value={(selectedElement as any).color || '#000000'} 
                          onChange={(e) => updateElement(selectedElement.id, { color: e.target.value } as any)}
                          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-sm font-medium text-gray-600 uppercase">{(selectedElement as any).color || '#000000'}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Tipografía</label>
                      <select
                        value={(selectedElement as any).fontFamily || 'Inter, sans-serif'}
                        onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value } as any)}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                      >
                        <option value="Inter, sans-serif">Inter (Moderna)</option>
                        <option value="Arial, sans-serif">Arial (Clásica legibilidad)</option>
                        <option value="Georgia, serif">Georgia (Elegante / Botánica)</option>
                        <option value="'Comic Sans MS', cursive">Comic Sans (Infantil)</option>
                        <option value="monospace">Monospace (Código)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Estilo y Alineación</label>
                      <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200 w-full mb-2">
                        <button 
                          onClick={() => updateElement(selectedElement.id, { bold: !(selectedElement as any).bold } as any)}
                          className={`flex-1 flex justify-center p-2 rounded-md transition-colors ${(selectedElement as any).bold ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        ><Bold className="w-4 h-4"/></button>
                        <button 
                          onClick={() => updateElement(selectedElement.id, { italic: !(selectedElement as any).italic } as any)}
                          className={`flex-1 flex justify-center p-2 rounded-md transition-colors ${(selectedElement as any).italic ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        ><Italic className="w-4 h-4"/></button>
                        <button 
                          onClick={() => updateElement(selectedElement.id, { underline: !(selectedElement as any).underline } as any)}
                          className={`flex-1 flex justify-center p-2 rounded-md transition-colors ${(selectedElement as any).underline ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        ><Underline className="w-4 h-4"/></button>
                      </div>
                      <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200 w-full">
                        <button 
                          onClick={() => updateElement(selectedElement.id, { align: 'left' } as any)}
                          className={`flex-1 flex justify-center p-2 rounded-md transition-colors ${(selectedElement as any).align === 'left' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        ><AlignLeft className="w-4 h-4"/></button>
                        <button 
                          onClick={() => updateElement(selectedElement.id, { align: 'center' } as any)}
                          className={`flex-1 flex justify-center p-2 rounded-md transition-colors ${(selectedElement as any).align === 'center' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        ><AlignCenter className="w-4 h-4"/></button>
                        <button 
                          onClick={() => updateElement(selectedElement.id, { align: 'right' } as any)}
                          className={`flex-1 flex justify-center p-2 rounded-md transition-colors ${(selectedElement as any).align === 'right' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        ><AlignRight className="w-4 h-4"/></button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Contenido</label>
                      <textarea 
                        value={(selectedElement as any).content}
                        onChange={(e) => updateElement(selectedElement.id, { content: e.target.value } as any)}
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                )}
                {selectedElement.type === 'quiz' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">Pregunta</label>
                    <textarea 
                      value={(selectedElement as any).question}
                      onChange={(e) => updateElement(selectedElement.id, { question: e.target.value } as any)}
                      className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    const updated = [...slides];
                    updated[activeSlideIndex].elements = updated[activeSlideIndex].elements.filter((e: any) => e.id !== selectedElement.id);
                    setSlides(updated);
                    setSelectedElementId(null);
                  }}
                  className="w-full py-2.5 px-4 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 flex items-center justify-center gap-2 transition-colors border border-red-100"
                >
                  <Trash2 className="w-4 h-4"/> Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Ajustes de Slide</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-3 uppercase">Color de fondo</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    '#ffffff', 
                    '#f8fafc', 
                    '#eff6ff', 
                    'radial-gradient(circle, #2d4c3b 0%, #1b3024 100%)', 
                    'repeating-linear-gradient(transparent, transparent 28px, #bae6fd 28px, #bae6fd 29px) white',
                    'linear-gradient(#e2e8f0 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(90deg, #e2e8f0 1px, transparent 1px) 0 0 / 20px 20px white',
                    'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
                    'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)'
                  ].map((bg, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        const updated = [...slides];
                        updated[activeSlideIndex].background = bg;
                        setSlides(updated);
                      }}
                      className="w-full aspect-square rounded-md border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                      style={{ background: bg }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <input 
                    type="color" 
                    value={activeSlide?.background?.startsWith('#') ? activeSlide.background : '#ffffff'} 
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[activeSlideIndex].background = e.target.value;
                      setSlides(updated);
                    }}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-xs font-medium text-gray-600">Color Personalizado</span>
                </div>
              </div>
            </div>
          )}
        </aside>

      </div>

      {/* Interactive Player Overlay (Full Screen Preview) */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col font-sans">
          {/* Floating Presentation Toolbar */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col p-2 gap-2 z-[210] border border-white/20">
            <button 
              onClick={() => setPresentationTool('pointer')}
              className={`p-3 rounded-xl transition-colors ${presentationTool === 'pointer' ? 'bg-indigo-500 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              title="Puntero"
            >
              <MousePointer2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPresentationTool('pen')}
              className={`p-3 rounded-xl transition-colors ${presentationTool === 'pen' ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              title="Lápiz"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPresentationTool('highlighter')}
              className={`p-3 rounded-xl transition-colors ${presentationTool === 'highlighter' ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              title="Resaltador"
            >
              <Highlighter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDrawings([])}
              className={`p-3 rounded-xl transition-colors text-gray-300 hover:bg-white/10 hover:text-white`}
              title="Limpiar Pantalla"
            >
              <Eraser className="w-5 h-5" />
            </button>
          </div>

          <div className="h-16 flex items-center justify-between px-8 bg-black/80 text-white border-b border-white/10 backdrop-blur-md z-[201]">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Play className="w-5 h-5 text-indigo-400 fill-indigo-400" />
              Modo Estudiante
            </h2>
            <div className="flex items-center gap-4">
               <span className="text-gray-400 font-mono">Slide {activeSlideIndex + 1} / {slides.length}</span>
               <button 
                 onClick={() => setIsPlaying(false)}
                 className="px-5 py-2 bg-white/10 rounded-full hover:bg-white/20 text-sm font-bold transition-colors border border-white/10 flex items-center gap-2"
               >
                 <X className="w-4 h-4"/> Salir
               </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0a] relative group">
            
            {/* Prev Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); if (activeSlideIndex > 0) setActiveSlideIndex(activeSlideIndex - 1); }}
              className={`absolute left-28 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-all z-[205] ${activeSlideIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <ChevronLeft className="w-8 h-8"/>
            </button>

            <div className={`w-full ${layoutFormat === 'horizontal' ? 'max-w-6xl aspect-video' : 'max-h-[90vh] aspect-[1/1.414]'} bg-white shadow-2xl relative overflow-hidden rounded-2xl ring-1 ring-white/10`} style={{ background: activeSlide?.background || '#ffffff', containerType: 'inline-size' }}>
              {activeSlide?.elements.map((el: any) => (
                <div
                  key={el.id}
                  className="absolute pointer-events-auto"
                  style={{
                    top: toPctY(el.top),
                    left: toPctX(el.left),
                    width: toPctX(el.width),
                    height: el.height ? toPctY(el.height) : 'auto',
                    zIndex: el.zIndex || 1,
                  }}
                >
                   {renderElement(el)}
                </div>
              ))}
              
              {/* Drawing Overlay */}
              <svg
                className="absolute inset-0 w-full h-full z-[100]"
                style={{ pointerEvents: presentationTool === 'pointer' ? 'none' : 'auto', touchAction: 'none' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {drawings.map((draw, i) => (
                  <path key={i} d={draw.path} stroke={draw.color} strokeWidth={draw.width} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                ))}
                {currentPath && currentPath.points.length > 1 && (
                  <path 
                    d={currentPath.points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')} 
                    stroke={currentPath.color} strokeWidth={currentPath.width} fill="none" strokeLinecap="round" strokeLinejoin="round" 
                  />
                )}
              </svg>
            </div>

            {/* Next Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); if (activeSlideIndex < slides.length - 1) setActiveSlideIndex(activeSlideIndex + 1); }}
              className={`absolute right-8 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-all ${activeSlideIndex === slides.length - 1 ? 'opacity-0 cursor-default' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <ChevronRight className="w-8 h-8"/>
            </button>
            
            {/* Control Bar Overlay */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
               <button onClick={() => { if (activeSlideIndex > 0) setActiveSlideIndex(activeSlideIndex - 1) }} className="text-white hover:text-indigo-400"><ChevronLeft className="w-6 h-6"/></button>
               <span className="text-white/80 font-bold font-mono tracking-widest">{activeSlideIndex + 1} / {slides.length}</span>
               <button onClick={() => { if (activeSlideIndex < slides.length - 1) setActiveSlideIndex(activeSlideIndex + 1) }} className="text-white hover:text-indigo-400"><ChevronRight className="w-6 h-6"/></button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Export Container */}
      {isExporting && (
        <div className="fixed top-[2000px] left-[2000px] pointer-events-none z-[-999]">
          {slides.map((slide, idx) => (
            <div 
              key={`export-${slide.id}`}
              className="export-slide-node bg-white overflow-hidden relative"
              style={{ 
                background: slide.background || '#ffffff',
                width: layoutFormat === 'horizontal' ? '1920px' : '1080px',
                height: layoutFormat === 'horizontal' ? '1080px' : '1527px'
              }}
            >
              {/* Force explicit pixel calculations inside the export box */}
              {slide.elements.map((el: any) => (
                <div key={el.id} className="absolute" style={{ 
                  top: `${(el.top / CANVAS_HEIGHT) * 100}%`, 
                  left: `${(el.left / CANVAS_WIDTH) * 100}%`, 
                  width: `${(el.width / CANVAS_WIDTH) * 100}%`, 
                  height: el.height ? `${(el.height / CANVAS_HEIGHT) * 100}%` : 'auto', 
                  zIndex: el.zIndex || 1 
                }}>
                  {/* For text scaling inside the hidden container, we use inline cq units or standard text logic */}
                  <div style={{ width: '100%', height: '100%', containerType: 'inline-size' }}>
                    {renderElement(el)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

// Helper tool button component
function ToolButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all w-16 group"
    >
      <div className="w-6 h-6 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
