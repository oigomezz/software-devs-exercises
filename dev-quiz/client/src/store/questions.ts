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
  edit: () => void;
  add: () => void;
}

const API_URL = "http://localhost:3005";

export const useQuestionsStore = create<State>((set, get) => {
  return {
    editQuestion: false,
    questions: [],
    currentQuestion: 0,
    fetchQuestion: async (id: string) => {
      const url = `${API_URL}/quiz/getQuestionById/${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const questions = await response.json();
        console.log([questions]);
        set({ questions }, false);
      }
    },
    fetchQuestions: async (search: string) => {
      const res = await fetch(`${API_URL}/quiz/getQuestions/${search}`);
      const json = await res.json();
      const questions = json.filter((element: Question) =>
        element.description.toLowerCase().includes(search)
      );
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

    edit: () => {
      set({ editQuestion: true }, false);
    },

    add: () => {
      set({ editQuestion: true }, false);
    },
  };
});
