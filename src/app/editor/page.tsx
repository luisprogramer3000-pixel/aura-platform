import React from 'react';
import TopBar from './layout/TopBar';
import CanvasArea from './layout/CanvasArea';
import BlockPalette from './components/draggable/BlockPalette';

export default function EditorPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with block palette */}
      <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
        <BlockPalette />
      </aside>

      {/* Main editor area */}
      <section className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 relative overflow-hidden">
          <CanvasArea />
        </div>
      </section>
    </div>
  );
}
