"use client";
import React from 'react';
import { FileOutput, FileText, Eye, Bot, Save } from 'lucide-react';
import ZoomSlider from '../components/ZoomSlider';

export default function TopBar() {
  return (
    <header className="flex items-center justify-between bg-white shadow-md px-4 py-2 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">Lesson Builder</h1>
      <div className="flex items-center space-x-3">
        <button
          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          title="Export PPTX"
        >
          <FileOutput size={16} /> PPTX
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          title="Export PDF"
        >
          <FileText size={16} /> PDF
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          title="Preview HTML"
        >
          <Eye size={16} /> Preview
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          title="Generate with AI"
        >
          <Bot size={16} /> AI
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          title="Save Lesson"
        >
          <Save size={16} /> Save
        </button>
        <ZoomSlider />
      </div>
    </header>
  );
}
