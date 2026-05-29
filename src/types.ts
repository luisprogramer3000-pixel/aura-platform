export type BlockType = 
  | 'title' 
  | 'text' 
  | 'vocabulary' 
  | 'grammar' 
  | 'quiz' 
  | 'reading' 
  | 'audio' 
  | 'image' 
  | 'video'
  | 'dialogue' 
  | 'speaking' 
  | 'dragdrop'
  | 'scattercards'
  | 'graphic'
  | 'shape'
  | 'imagegrid'
  | 'wordsearch'
  | 'fillblanks'
  | 'truefalse'
  | 'riddle'
  | 'tonguetwister'
  | 'multiplechoice';

export interface BaseElement {
  id: string;
  type: BlockType;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
  // Common properties
  animation?: 'none' | 'fade' | 'slide' | 'scale' | 'bounce';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  padding?: number;
}

export interface TitleElement extends BaseElement {
  type: 'title';
  content: string;
  fontSize: number;
  color: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline?: boolean;
  fontFamily?: string;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontSize: number;
  color: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline?: boolean;
  fontFamily?: string;
  textShadow?: string;
}

export interface VocabularyElement extends BaseElement {
  type: 'vocabulary';
  spanish: string;
  english: string;
  pronunciation: string;
  image?: string;
  example: string;
}

export interface GrammarElement extends BaseElement {
  type: 'grammar';
  ruleTitle: string;
  explanation: string;
  formula: string;
  example: string;
}

export interface QuizElement extends BaseElement {
  type: 'quiz';
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ReadingElement extends BaseElement {
  type: 'reading';
  title: string;
  text: string;
  question: string;
  options: string[];
  correctIndex: number;
  image?: string;
}

export interface AudioElement extends BaseElement {
  type: 'audio';
  src?: string;
  transcript: string;
  speaker: 'male' | 'female';
  dialogueLines: Array<{ speaker: string; text: string }>;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt: string;
  contain: boolean;
}

export interface DialogueElement extends BaseElement {
  type: 'dialogue';
  characterA: string;
  characterB: string;
  lines: Array<{ speaker: 'A' | 'B'; text: string }>;
}

export interface SpeakingElement extends BaseElement {
  type: 'speaking';
  phrase: string;
  translation: string;
  hint: string;
}

export interface DragDropElement extends BaseElement {
  type: 'dragdrop';
  instruction: string;
  pairs: Array<{ left: string; right: string; id: string }>;
}

export interface VideoElement extends BaseElement {
  type: 'video';
  src: string;
}

export interface GraphicElement extends BaseElement {
  type: 'graphic';
  shapeType: string;
  content?: string;
  color?: string;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  italic?: boolean;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: string;
  content?: string;
  color?: string;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  italic?: boolean;
}

export interface ScatterCardsElement extends BaseElement {
  type: 'scattercards';
  cards: Array<{ id: number; body: string; question: string }>;
}

export interface ImageGridElement extends BaseElement {
  type: 'imagegrid';
  images: Array<{ src: string; alt: string; caption: string }>;
}

export interface WordSearchElement extends BaseElement {
  type: 'wordsearch';
  words: string[];
  gridSize?: number;
}

export interface FillBlanksElement extends BaseElement {
  type: 'fillblanks';
  textWithBlanks: string;
  answers: string[];
}

export interface TrueFalseElement extends BaseElement {
  type: 'truefalse';
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface RiddleElement extends BaseElement {
  type: 'riddle';
  riddle: string;
  answer: string;
  imageHint?: string;
}

export interface TongueTwisterElement extends BaseElement {
  type: 'tonguetwister';
  twister: string;
  level: 'easy' | 'medium' | 'hard';
}

export interface MultipleChoiceElement extends BaseElement {
  type: 'multiplechoice';
  question: string;
  options: Array<{ text: string; image?: string; isCorrect: boolean }>;
}

export type SlideElement =
  | TitleElement
  | TextElement
  | VocabularyElement
  | GrammarElement
  | QuizElement
  | ReadingElement
  | AudioElement
  | ImageElement
  | DialogueElement
  | SpeakingElement
  | DragDropElement
  | VideoElement
  | GraphicElement
  | ShapeElement
  | ScatterCardsElement
  | ImageGridElement
  | WordSearchElement
  | FillBlanksElement
  | TrueFalseElement
  | RiddleElement
  | TongueTwisterElement
  | MultipleChoiceElement;

export interface Slide {
  id: string;
  type: string;
  background: string;
  transition: 'none' | 'slide' | 'fade' | 'zoom' | 'scale' | 'bounce';
  elements: SlideElement[];
}

export interface AIInput {
  topic: string;
  age: string;
  level: string;
  subject: string;
}
