export interface Question {
  _id: string;
  description: string;
  code?: string;
  answers: string[];
  correctAnswer?: number;
}
