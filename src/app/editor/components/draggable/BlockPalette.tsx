"use client";
import BlockItem from './BlockItem';
import { BlockType } from '../../hooks/useSlideStore';
import { motion } from 'framer-motion';
import { GripHorizontal } from 'lucide-react';

const blocks: {type: BlockType; label: string; icon: React.ReactNode}[] = [
  {type: 'title', label: 'Title', icon: <GripHorizontal size={16} />},
  {type: 'text', label: 'Text', icon: <GripHorizontal size={16} />},
  {type: 'vocab', label: 'Vocabulary Card', icon: <GripHorizontal size={16} />},
  {type: 'grammar', label: 'Grammar Explanation', icon: <GripHorizontal size={16} />},
  {type: 'quiz', label: 'Quiz', icon: <GripHorizontal size={16} />},
  {type: 'reading', label: 'Reading', icon: <GripHorizontal size={16} />},
  {type: 'audio', label: 'Audio', icon: <GripHorizontal size={16} />},
  {type: 'image', label: 'Image', icon: <GripHorizontal size={16} />},
  {type: 'dialogue', label: 'Dialogue', icon: <GripHorizontal size={16} />},
  {type: 'speaking', label: 'Speaking Activity', icon: <GripHorizontal size={16} />},
  {type: 'drag_drop', label: 'Drag‑Drop Activity', icon: <GripHorizontal size={16} />},
];

export default function BlockPalette() {
  return (
    <div className="space-y-2">
      {blocks.map(b => (
        <BlockItem key={b.type} type={b.type} label={b.label} icon={b.icon} />
      ))}
    </div>
  );
}
