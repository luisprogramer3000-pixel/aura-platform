/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

type QuizBlockProps = {
  block: any;
  isSelected: boolean;
  onSelect: () => void;
};

export default function QuizBlock({ block, isSelected, onSelect }: QuizBlockProps) {
  return (
    <div
      className={`p-4 border rounded ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}
      onClick={onSelect}
    >
      <h3 className="text-lg font-medium mb-2">Quiz Block</h3>
      {/* Placeholder: render quiz data */}
      <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(block.props, null, 2)}
      </pre>
    </div>
  );
}
