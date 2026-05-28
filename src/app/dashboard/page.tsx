"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, Search, ChevronDown, MoreVertical, LayoutTemplate, Presentation, BookOpen, Plus, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PREMIUM_TEMPLATES } from '../../templateLibrary';

// Dummy data for presentation projects
const dummyProjects = [
  { id: 1, title: 'El Pretérito Perfecto', type: 'Presentación', date: 'Hace 2 horas', color: 'bg-indigo-500' },
  { id: 2, title: 'Revolución Industrial', type: 'Plantilla', date: 'Ayer', color: 'bg-purple-500' },
  { id: 3, title: 'Vocabulario: La Cocina', type: 'Actividad', date: 'Hace 3 días', color: 'bg-pink-500' },
  { id: 4, title: 'Gramática B2: Subjuntivo', type: 'Presentación', date: 'La semana pasada', color: 'bg-blue-500' },
];

export default function Dashboard() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  
  const folders = [
    { id: 'proyectos', label: 'Proyectos', icon: Folder, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'actividades', label: 'Actividades', icon: BookOpen, color: 'text-pink-600', bg: 'bg-pink-100' },
    { id: 'plantillas', label: 'Plantillas', icon: LayoutTemplate, color: 'text-indigo-600', bg: 'bg-indigo-100' }
  ];

  const filters = ['Tipo', 'Categoría', 'Titular', 'Fecha de modificaci...'];
  const router = useRouter();

  const handleTemplateClick = (templateId: string) => {
    localStorage.setItem('aura_template_id', templateId);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans overflow-x-hidden pb-20">
      {/* Background Gradient similar to the screenshot */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-cyan-100/40 via-purple-100/30 to-pink-100/40 -z-10 pointer-events-none" />

      {/* Header & Navigation */}
      <header className="px-8 py-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2 text-purple-700 font-bold text-xl tracking-tight">
          <Presentation className="w-6 h-6" />
          AuraSpanish
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-gray-700 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200">
              <Home className="w-4 h-4" />
              Ir al Editor
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all">
              <Plus className="w-4 h-4" />
              Nueva Clase
            </button>
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold shadow-md cursor-pointer">
            J
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 mt-12">
        {/* Folders Section */}
        <div className="flex justify-center gap-12 mb-20">
          {folders.map((folder) => {
            const isActive = activeFolder === folder.id;
            return (
              <motion.button 
                key={folder.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFolder(isActive ? null : folder.id)}
                className={`flex flex-col items-center gap-3 transition-all ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className={`w-24 h-24 rounded-3xl ${folder.bg} flex items-center justify-center shadow-sm ${isActive ? 'ring-4 ring-purple-200 shadow-md' : ''} transition-all`}>
                  <folder.icon className={`w-10 h-10 ${folder.color}`} />
                </div>
                <span className={`font-bold ${isActive ? 'text-purple-900' : 'text-gray-600'}`}>
                  {folder.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Central Search Section */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Todos los proyectos</h1>
          
          <div className="w-full max-w-3xl relative mb-6 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700 placeholder-gray-400 font-medium transition-all"
              placeholder="Buscar en todo el contenido"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button 
                key={filter}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                {filter}
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(!activeFolder || activeFolder === 'proyectos' || activeFolder === 'actividades') && dummyProjects
            .filter(p => !activeFolder || (activeFolder === 'actividades' && p.type === 'Actividad') || (activeFolder === 'proyectos' && p.type === 'Presentación'))
            .map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-purple-200 transition-all group cursor-pointer"
            >
              <div className={`h-32 ${project.color} bg-opacity-20 flex items-center justify-center relative overflow-hidden`}>
                <div className={`absolute w-full h-full bg-gradient-to-br ${project.color} opacity-10`}></div>
                <LayoutTemplate className={`w-12 h-12 ${project.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{project.title}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                    {project.type}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {project.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {(!activeFolder || activeFolder === 'plantillas') && PREMIUM_TEMPLATES.map((tpl, idx) => (
            <motion.div 
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleTemplateClick(tpl.id)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-indigo-300 transition-all group cursor-pointer"
            >
              <div className="h-32 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: tpl.thumbnailColor + '20' }}>
                <div className="absolute w-full h-full opacity-20" style={{ backgroundImage: `linear-gradient(to bottom right, ${tpl.thumbnailColor}, transparent)` }}></div>
                <LayoutTemplate className="w-12 h-12" style={{ color: tpl.thumbnailColor }} />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{tpl.name}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md">
                    Plantilla • {tpl.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    3 slides
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
