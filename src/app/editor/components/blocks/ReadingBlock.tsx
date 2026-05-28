import React from 'react';
import { motion } from 'framer-motion';

export default function ReadingBlock({ block, isSelected, onSelect }: any) {
  const { content = 'Reading passage goes here...', color = '#000000' } = block.props;
  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-4 bg-white rounded border ${isSelected ? 'outline outline-2 outline-indigo-600' : ''}`}
      style={{ color }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <p>{content}</p>
    </motion.div>
  );
}
