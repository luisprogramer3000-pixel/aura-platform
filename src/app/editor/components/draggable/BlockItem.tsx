"use client";
import React from 'react';
import { motion } from 'framer-motion';

type BlockItemProps = {
  type: string;
  label: string;
  icon: React.ReactNode;
};

export default function BlockItem({ type, label, icon }: BlockItemProps) {
  // Placeholder: clicking could set selected block type in store – omitted for now
  return (
    <motion.div
      className="flex items-center p-2 border rounded hover:bg-gray-100 cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{label}</span>
    </motion.div>
  );
}
