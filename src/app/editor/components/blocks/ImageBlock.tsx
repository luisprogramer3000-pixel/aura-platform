import React from 'react';
import { motion } from 'framer-motion';

export default function ImageBlock({ block, isSelected, onSelect }: any) {
  const { src = 'https://via.placeholder.com/300x200', alt = 'Image', color = '#000000' } = block.props;
  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`p-2 bg-white rounded border ${isSelected ? 'outline outline-2 outline-indigo-600' : ''}`}
      style={{ color }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img src={src} alt={alt} className="max-w-full h-auto" />
    </motion.div>
  );
}
