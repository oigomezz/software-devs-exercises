export interface Question {
  _id: string;
  description: string;
  answers: string[];
  code?: string;
  correctAnswer?: number;
}
