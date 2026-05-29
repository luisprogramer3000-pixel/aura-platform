/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface SpeakingBlockProps {
  block: any;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SpeakingBlock({ block, isSelected, onSelect }: SpeakingBlockProps) {
  return (
    <div
      className={`p-4 border rounded ${isSelected ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-2">Speaking Activity</h3>
      {/* Placeholder for speaking activity UI */}
      <p className="text-sm text-gray-600">[Speaking activity content goes here]</p>
    </div>
  );
}
