import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (id: string) => Promise<void>;
  fetchQuestions: (search: string, limit?: number) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
  editQuestion: boolean;
  edit: (id: number) => void;
  add: () => void;
}

const API_URL = import.meta.env.PROD
  ? "https://midu-react-13.surge.sh/"
  : "http://localhost:5173/";

export const useQuestionsStore = create<State>((set, get) => {
  return {
    editQuestion: false,
    questions: [],
    currentQuestion: 0,
    fetchQuestion: async (id: string) => {
      const res = await fetch(`${API_URL}/data.json`);
      const json = await res.json();
      const questions = json.filter((element: Question) => element.id === id);
      set({ questions }, false);
    },
    fetchQuestions: async (search: string, limit: number = 10) => {
      const res = await fetch(`${API_URL}/data.json`);
      const json = await res.json();
      const questions = json
        .filter((element: Question) =>
          element.question.toLowerCase().includes(search)
        )
        .slice(0, limit);
      set({ questions }, false);
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false);
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion }, false);
      }
    },

    reset: () => {
      set({ questions: [], editQuestion: false }, false);
    },

    edit: (id: number) => {
      set({ currentQuestion: id, editQuestion: true }, false);
    },

    add: () => {
      set({ editQuestion: true }, false);
    },
  };
});
