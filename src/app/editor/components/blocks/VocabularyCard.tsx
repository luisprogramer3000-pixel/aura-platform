import React from 'react';

type VocabularyCardProps = {
  block: any;
  isSelected: boolean;
  onSelect: () => void;
};

export default function VocabularyCard({ block, isSelected, onSelect }: VocabularyCardProps) {
  return (
    <div
      className={`p-4 border rounded ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}
      onClick={onSelect}
    >
      <h3 className="text-lg font-medium mb-2">Vocabulary Card</h3>
      <p>{JSON.stringify(block.props)}</p>
    </div>
  );
}
