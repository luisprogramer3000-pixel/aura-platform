import React from 'react';
import { useSlideStore } from '../../hooks/useSlideStore';
import { motion } from 'framer-motion';

export default function AudioBlock({ block, isSelected, onSelect }: any) {
  const { src = '', caption = 'Audio caption', color = '#000000' } = block.props;
  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-2 bg-white rounded border ${isSelected ? 'outline outline-2 outline-indigo-600' : ''}`}
      style={{ color }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <audio controls src={src} className="w-full mb-2" />
      <span className="text-sm">{caption}</span>
    </motion.div>
  );
}
