import mongoose, { ObjectId } from "mongoose";

interface Question {
  _id: ObjectId;
  description: string;
  answers: string[];
  code: string;
  correctAnswer: number;
  category: string[];
}

const questionSchema = new mongoose.Schema<Question>({
  _id: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, required: true },
  answers: { type: [String], required: true },
  code: { type: String, required: false },
  correctAnswer: { type: Number, required: false },
  category: { type: [String], required: false },
});

const QuestionModel = mongoose.model<Question>("Question", questionSchema);

export default QuestionModel;
