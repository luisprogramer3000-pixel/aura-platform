/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from 'react';
import { DndContext, DragOverlay, useDndContext } from '@dnd-kit/core';
import { useSlideStore } from '../hooks/useSlideStore';
import { useZoom } from '../hooks/useZoom';
import Slide from '../components/Slide';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

export default function CanvasArea() {
  const { active, over } = useDndContext();
  const activeSlideId = useSlideStore(state => state.activeSlideId);
  const slides = useSlideStore(state => state.slides);
  const addBlock = useSlideStore(state => state.addBlock);
  const zoom = useZoom(state => state.zoom);

  const slide = slides.find(s => s.id === activeSlideId);

  // Handle drop from palette onto canvas
  React.useEffect(() => {
    if (active && active.data && active.data.current && over && over.id === 'canvas-dropzone') {
      const blockType = active.data.current.type as any;
      const newBlock = {
        type: blockType,
        props: {},
      };
      addBlock(activeSlideId!, newBlock);
    }
  }, [active, over]);

  if (!slide) return null;

  return (
    <div className="flex-1 flex justify-center items-center bg-gray-100 overflow-auto p-4" id="canvas-dropzone">
      <motion.div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden"
        style={{
          width: 'calc(16 / 9 * 600px)', // 600px height base
          height: '600px',
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
        }}
      >
        <Slide slide={slide} />
        {active && (
          <DragOverlay>
            {/* Optional visual preview of dragging block */}
          </DragOverlay>
        )}
      </motion.div>
    </div>
  );
}
