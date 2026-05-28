import React from 'react';
import { useSlideStore } from '../hooks/useSlideStore';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';

export default function RightSidebar() {
  const activeSlideId = useSlideStore(state => state.activeSlideId);
  const selectedBlockId = useSlideStore(state => state.selectedBlockId);
  const slides = useSlideStore(state => state.slides);
  const updateBlockProps = useSlideStore(state => state.updateBlockProps);

  if (!activeSlideId || !selectedBlockId) {
    return (
      <aside className="w-64 bg-gray-50 border-l border-gray-200 p-4">
        <p className="text-gray-500">Select a block to edit its properties.</p>
      </aside>
    );
  }

  const slide = slides.find(s => s.id === activeSlideId);
  const block = slide?.blocks.find(b => b.id === selectedBlockId);

  const handleColorChange = (color: string) => {
    if (block) updateBlockProps(activeSlideId, block.id, { color });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize = parseInt(e.target.value, 10);
    if (block) updateBlockProps(activeSlideId, block.id, { fontSize });
  };

  return (
    <aside className="w-64 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Properties</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <HexColorPicker
          color={block?.props?.color || '#000000'}
          onChange={handleColorChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
        <input
          type="range"
          min="12"
          max="48"
          step="1"
          value={block?.props?.fontSize || 16}
          onChange={handleFontSizeChange}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{block?.props?.fontSize || 16}px</span>
      </div>
      {/* Additional property controls (spacing, borders, animations) can be added here */}
    </aside>
  );
}
