import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  idQuestion: string;
  currentQuestion: number;
  fetchQuestion: (id: string) => Promise<Question>;
  fetchQuestions: (search: string, limit?: number) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
  editQuestion: boolean;
  edit: (id: string) => void;
  add: () => void;
}

const API_URL = "http://localhost:3005";

export const useQuestionsStore = create<State>((set, get) => {
  return {
    editQuestion: false,
    questions: [],
    idQuestion: "",
    currentQuestion: 0,
    fetchQuestion: async (id: string) => {
      const url = `${API_URL}/quiz/getQuestionById/${id}`;
      const response = await fetch(url);
      if (!response.ok) return null;
      const question = await response.json();
      return question;
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

    edit: (id: string) => {
      set({ idQuestion: id, editQuestion: true }, false);
    },

    add: () => {
      set({ editQuestion: true }, false);
    },
  };
});
