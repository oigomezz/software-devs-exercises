import mongoose from "mongoose";

interface Question {
  description: string;
  answers: string[];
  code: string;
  correctAnswer: number;
  categories: string[];
}

const questionSchema = new mongoose.Schema<Question>({
  description: { type: String, required: true },
  answers: { type: [String], required: true },
  code: { type: String, required: false },
  correctAnswer: { type: Number, required: false },
  categories: { type: [String], required: false },
});

const QuestionModel = mongoose.model<Question>("Question", questionSchema);

export default QuestionModel;
