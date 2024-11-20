import mongoose from "mongoose";

interface Question {
  id: string;
  description: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  category: string[];
}

const questionSchema = new mongoose.Schema<Question>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  answers: { type: [String], required: true },
  code: { type: String, required: false },
  correctAnswer: { type: Number, required: false },
  category: { type: [String], required: false },
});

const QuestionModel = mongoose.model<Question>("Question", questionSchema);

export default QuestionModel;
