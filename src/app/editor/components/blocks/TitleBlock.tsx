import React from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

interface TitleBlockProps {
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

export default function TitleBlock({ block, isSelected, onSelect }: TitleBlockProps) {
  const { text = 'Title', color = '#000000', fontSize = 24 } = block.props;

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-2 cursor-pointer select-none ${isSelected ? 'outline outline-2 outline-indigo-600' : ''}`}
      style={{
        color,
        fontSize: `${fontSize}px`,
        fontWeight: 'bold',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.div>
  );
}
