import { create } from "zustand";
import { type Question } from "../types";

type Page = "home" | "results" | "add" | "edit";

interface State {
  loading: boolean;
  page: Page;
  title: string;
  questions: Question[];
  idQuestion: string;
  currentQuestion: number;
  getLastQuestions: (limit: number) => Promise<void>;
  getQuestions: (search: string) => Promise<void>;
  getQuestionById: (id: string) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  goToPage: (page: "home" | "results" | "add" | "edit") => void;
  setTitle: (title: string) => void;
  reset: () => void;
  edit: (id: string) => void;
  add: () => void;
}

const API_URL = "http://localhost:3005";

export const useQuestionsStore = create<State>((set, get) => {
  return {
    loading: false,
    page: "home",
    title: "",
    questions: [],
    idQuestion: "",
    currentQuestion: 0,
    getQuestions: async (search: string) => {
      set({ loading: true }, false);
      const url = `${API_URL}/quiz/getQuestions/${search}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const questions = await response.json();
      set({ loading: false, questions }, false);
    },

    getQuestionById: async (id: string) => {
      set({ loading: true }, false);
      const url = `${API_URL}/quiz/getQuestionById/${id}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const question = await response.json();
      set({ loading: false, questions: [question] }, false);
    },

    getLastQuestions: async (limit: number) => {
      set({ loading: true }, false);
      const url = `${API_URL}/quiz/getLastQuestions/${limit}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const questions = await response.json();
      set({ loading: false, questions }, false);
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

    setTitle: (title: string) => {
      set({ title }, false);
    },

    goToPage: (page: Page) => {
      set({ page }, false);
    },

    reset: () => {
      set(
        {
          page: "home",
          questions: [],
          idQuestion: "",
          currentQuestion: 0,
        },
        false
      );
    },

    edit: (id: string) => {
      set(
        {
          page: "edit",
          idQuestion: id,
          currentQuestion: 0,
        },
        false
      );
    },

    add: () => {
      set(
        {
          page: "add",
          idQuestion: "",
          currentQuestion: 0,
        },
        false
      );
    },
  };
});
