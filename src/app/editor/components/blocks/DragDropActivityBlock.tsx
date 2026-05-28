import React from 'react';
import { motion } from 'framer-motion';

type BlockProps = {
  block: {
    id: string;
    type: string;
    props: Record<string, any>;
  };
  isSelected: boolean;
  onSelect: () => void;
};

export default function DragDropActivityBlock({ block, isSelected, onSelect }: BlockProps) {
  // Placeholder implementation – you can extend this with actual drag‑and‑drop UI later.
  return (
    <motion.div
      className={`p-4 border rounded ${isSelected ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="font-semibold mb-2">Drag‑Drop Activity</h3>
      <p className="text-sm text-gray-600">[Placeholder] Configure drag‑drop activity here.</p>
    </motion.div>
  );
}
