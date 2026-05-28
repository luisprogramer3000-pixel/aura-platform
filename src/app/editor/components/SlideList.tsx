import React from 'react';
import { useSlideStore } from '../hooks/useSlideStore';
import type { SlideStore, SlideData } from '../hooks/useSlideStore';
import { GripVertical } from 'lucide-react';

export default function SlideList() {
  const slides = useSlideStore((state: SlideStore) => state.slides);
  const activeSlideId = useSlideStore((state: SlideStore) => state.activeSlideId);
  const setActiveSlide = useSlideStore((state: SlideStore) => state.setActiveSlide);
  const duplicateSlide = useSlideStore((state: SlideStore) => state.duplicateSlide);
  const deleteSlide = useSlideStore((state: SlideStore) => state.deleteSlide);
  const addSlide = useSlideStore((state: SlideStore) => state.addSlide);

  return (
    <div className="flex space-x-2 overflow-x-auto p-2 bg-gray-50 border-t border-gray-200 items-center">
      {slides.map((slide: SlideData) => (
        <div
          key={slide.id}
          className={`w-24 h-14 rounded-md border-2 flex items-center justify-center cursor-pointer ${slide.id === activeSlideId ? 'border-indigo-600' : 'border-gray-300'}`}
          onClick={() => setActiveSlide(slide.id)}
        >
          <span className="text-xs text-gray-700">{slide.id.replace('slide-', '')}</span>
        </div>
      ))}
      <button
        onClick={addSlide}
        className="flex items-center px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        title="Add slide"
      >
        <GripVertical size={16} className="mr-1" /> Add
      </button>
      {activeSlideId && (
        <>
          <button
            onClick={() => duplicateSlide(activeSlideId)}
            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            title="Duplicate slide"
          >
            Dup
          </button>
          <button
            onClick={() => deleteSlide(activeSlideId)}
            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            title="Delete slide"
          >
            Del
          </button>
        </>
      )}
    </div>
  );
}
