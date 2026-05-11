export type AppStep = 'welcome' | 'style-select' | 'upload' | 'generating' | 'result' | 'video' | 'blind-box';

export type ChildhoodTheme = 'outdoor' | 'indoor' | 'school' | 'taste';

export interface TriviaQuestion {
  question: string;
  options: string[];
  answer: number;
}
