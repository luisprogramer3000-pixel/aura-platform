/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSlideStore } from '../../hooks/useSlideStore';
import { motion } from 'framer-motion';

export default function GrammarBlock({ block, isSelected, onSelect }: any) {
  const { text = 'Grammar explanation...', color = '#000000', fontSize = 16 } = block.props;
  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-2 cursor-pointer select-none ${isSelected ? 'outline outline-2 outline-indigo-600' : ''}`}
      style={{ color, fontSize: `${fontSize}px` }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.div>
  );
}
