/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

interface TextBlockProps {
  block: {
    id: string;
    type: string;
    props: {
      text?: string;
      color?: string;
      fontSize?: number;
    };
  };
  isSelected: boolean;
  onSelect: () => void;
}

export default function TextBlock({ block, isSelected, onSelect }: TextBlockProps) {
  const { text = 'Paragraph text...', color = '#000000', fontSize = 16 } = block.props;

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-2 cursor-pointer select-none ${isSelected ? 'outline outline-2 outline-indigo-600' : ''}`}
      style={{
        color,
        fontSize: `${fontSize}px`,
        lineHeight: '1.5',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.div>
  );
}
