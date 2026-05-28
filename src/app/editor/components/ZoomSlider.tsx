"use client";
import React from 'react';
import { useZoom } from '../hooks/useZoom';

export default function ZoomSlider() {
  const zoom = useZoom(state => state.zoom);
  const setZoom = useZoom(state => state.setZoom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(e.target.value));
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Zoom</label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={zoom}
        onChange={handleChange}
        className="w-32"
      />
      <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
    </div>
  );
}
