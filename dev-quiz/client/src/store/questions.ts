import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  idQuestion: string;
  editQuestion: boolean;
  currentQuestion: number;
  fetchQuestion: (id: string) => Promise<void>;
  fetchQuestions: (search: string, limit?: number) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
  edit: (id: string) => void;
  add: () => void;
}

const API_URL = "http://localhost:3005";

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    idQuestion: "",
    editQuestion: false,
    currentQuestion: 0,
    fetchQuestion: async (id: string) => {
      const url = `${API_URL}/quiz/getQuestionById/${id}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const question = await response.json();
      set({ questions: [question] }, false);
    },

    fetchQuestions: async (search: string) => {
      const url = `${API_URL}/quiz/getQuestions/${search}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const questions = await response.json();
      set({ questions }, false);
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length)
        set({ currentQuestion: nextQuestion }, false);
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;
      if (previousQuestion >= 0)
        set({ currentQuestion: previousQuestion }, false);
    },

    reset: () => {
      set(
        {
          questions: [],
          idQuestion: "",
          editQuestion: false,
          currentQuestion: 0,
        },
        false
      );
    },

    edit: (id: string) => {
      set(
        {
          idQuestion: id,
          editQuestion: true,
          currentQuestion: 0,
        },
        false
      );
    },

    add: () => {
      set(
        {
          idQuestion: "",
          editQuestion: true,
          currentQuestion: 0,
        },
        false
      );
    },
  };
});
