"use client";
import { useSlideStore } from '../hooks/useSlideStore';
import { motion } from 'framer-motion';
import VocabularyCard from './blocks/VocabularyCard.tsx';
import GrammarBlock from './blocks/GrammarBlock.tsx';
import QuizBlock from './blocks/QuizBlock.tsx';
import ReadingBlock from './blocks/ReadingBlock.tsx';
import AudioBlock from './blocks/AudioBlock.tsx';
import ImageBlock from './blocks/ImageBlock.tsx';
import DialogueBlock from './blocks/DialogueBlock.tsx';
import SpeakingBlock from './blocks/SpeakingBlock.tsx';
import DragDropActivityBlock from './blocks/DragDropActivityBlock.tsx';
import TitleBlock from './blocks/TitleBlock.tsx';
import TextBlock from './blocks/TextBlock.tsx';

interface SlideProps {
  slide: {
    id: string;
    blocks: {
      id: string;
      type: string;
      props: Record<string, any>;
    }[];
  };
}

export default function Slide({ slide }: SlideProps) {
  const selectBlock = useSlideStore(state => state.selectBlock);
  const selectedBlockId = useSlideStore(state => state.selectedBlockId);

  const renderBlock = (block: any) => {
    const isSelected = block.id === selectedBlockId;
    const commonProps = {
      key: block.id,
      block,
      isSelected,
      onSelect: () => selectBlock(block.id),
    };
    switch (block.type) {
      case 'title':
        return <TitleBlock {...commonProps} />;
      case 'text':
        return <TextBlock {...commonProps} />;
      case 'vocab':
        return <VocabularyCard {...commonProps} />;
      case 'grammar':
        return <GrammarBlock {...commonProps} />;
      case 'quiz':
        return <QuizBlock {...commonProps} />;
      case 'reading':
        return <ReadingBlock {...commonProps} />;
      case 'audio':
        return <AudioBlock {...commonProps} />;
      case 'image':
        return <ImageBlock {...commonProps} />;
      case 'dialogue':
        return <DialogueBlock {...commonProps} />;
      case 'speaking':
        return <SpeakingBlock {...commonProps} />;
      case 'drag_drop':
        return <DragDropActivityBlock {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full p-4">
      {slide.blocks.map(renderBlock)}
    </div>
  );
}
