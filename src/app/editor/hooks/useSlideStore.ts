/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type BlockType =
  | 'title'
  | 'text'
  | 'vocab'
  | 'grammar'
  | 'quiz'
  | 'reading'
  | 'audio'
  | 'image'
  | 'dialogue'
  | 'speaking'
  | 'drag_drop';

export interface BlockData {
  id: string;
  type: BlockType;
  props: Record<string, any>;
}

export interface SlideData {
  id: string;
  blocks: BlockData[];
}

export interface SlideStore {
  slides: SlideData[];
  activeSlideId: string | null;
  selectedBlockId: string | null;
  addSlide: () => void;
  deleteSlide: (slideId: string) => void;
  setActiveSlide: (slideId: string) => void;
  duplicateSlide: (slideId: string) => void;
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  addBlock: (slideId: string, block: Omit<BlockData, 'id'>) => void;
  updateBlockProps: (slideId: string, blockId: string, props: Record<string, any>) => void;
  deleteBlock: (slideId: string, blockId: string) => void;
  selectBlock: (blockId: string | null) => void;
}

export const useSlideStore = create<SlideStore>()(
  devtools((set, get) => ({
    slides: [],
    activeSlideId: null,
    selectedBlockId: null,
    addSlide: () => {
      const newSlide: SlideData = {
        id: `slide-${Date.now()}`,
        blocks: [],
      };
      set(state => ({
        slides: [...state.slides, newSlide],
        activeSlideId: newSlide.id,
      }));
    },
    deleteSlide: slideId => {
      set(state => {
        const filtered = state.slides.filter(s => s.id !== slideId);
        const newActive = filtered.length ? filtered[0].id : null;
        return { slides: filtered, activeSlideId: newActive };
      });
    },
    setActiveSlide: slideId => set({ activeSlideId: slideId }),
    duplicateSlide: slideId => {
      const orig = get().slides.find(s => s.id === slideId);
      if (!orig) return;
      const copy: SlideData = {
        id: `slide-${Date.now()}`,
        blocks: orig.blocks.map(b => ({ ...b, id: `${b.id}-copy-${Date.now()}` })),
      };
      set(state => ({ slides: [...state.slides, copy] }));
    },
    reorderSlides: (from, to) => {
      set(state => {
        const arr = [...state.slides];
        const [moved] = arr.splice(from, 1);
        arr.splice(to, 0, moved);
        return { slides: arr };
      });
    },
    addBlock: (slideId, block) => {
      set(state => ({
        slides: state.slides.map(slide =>
          slide.id === slideId
            ? {
                ...slide,
                blocks: [...slide.blocks, { ...block, id: `block-${Date.now()}` }],
              }
            : slide,
        ),
      }));
    },
    updateBlockProps: (slideId, blockId, props) => {
      set(state => ({
        slides: state.slides.map(slide =>
          slide.id === slideId
            ? {
                ...slide,
                blocks: slide.blocks.map(b =>
                  b.id === blockId ? { ...b, props: { ...b.props, ...props } } : b,
                ),
              }
            : slide,
        ),
      }));
    },
    deleteBlock: (slideId, blockId) => {
      set(state => ({
        slides: state.slides.map(slide =>
          slide.id === slideId
            ? { ...slide, blocks: slide.blocks.filter(b => b.id !== blockId) }
            : slide,
        ),
        selectedBlockId: null,
      }));
    },
    selectBlock: blockId => set({ selectedBlockId: blockId }),
  }))
);
