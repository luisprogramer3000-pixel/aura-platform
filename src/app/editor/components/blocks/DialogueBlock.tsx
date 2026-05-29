/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface DialogueBlockProps {
  block: any;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DialogueBlock({ block, isSelected, onSelect }: DialogueBlockProps) {
  return (
    <div
      className={`p-4 border rounded ${isSelected ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-2">Dialogue</h3>
      {/* Placeholder content – replace with actual dialogue UI */}
      <p className="text-sm text-gray-600">[Dialogue content goes here]</p>
    </div>
  );
}
