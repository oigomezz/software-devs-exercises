export interface Question {
  id: string;
  question: string;
  code?: string;
  answers: string[];
  correctAnswer?: number;
}
