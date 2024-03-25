import { create } from "zustand";
import { type Question } from "../types";

import confetti from "canvas-confetti";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

const API_URL = import.meta.env.PROD
  ? "https://midu-react-13.surge.sh/"
  : "http://localhost:5173/";

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch(`${API_URL}/data.json`);
      const json = await res.json();

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      const questionInfo = newQuestions[questionIndex];
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

      if (isCorrectUserAnswer) confetti();

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };

      set({ questions: newQuestions });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion });
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion });
      }
    },
  };
});
