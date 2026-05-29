/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSlideStore } from '../hooks/useSlideStore';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import BlockPalette from '../components/draggable/BlockPalette';

export default function LeftSidebar() {
  const addSlide = useSlideStore(state => state.addSlide);
  const slides = useSlideStore(state => state.slides);
  const activeSlideId = useSlideStore(state => state.activeSlideId);

  // Ensure at least one slide exists
  useEffect(() => {
    if (slides.length === 0) {
      addSlide();
    }
  }, []);

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Blocks</h2>
      <BlockPalette />
    </aside>
  );
}
