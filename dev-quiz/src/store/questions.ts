import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  fetchQuestions: (limit: number) => Promise<void>;
  reset: () => void;
}

const API_URL = import.meta.env.PROD
  ? "https://midu-react-13.surge.sh/"
  : "http://localhost:5173/";

export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    fetchQuestions: async () => {
      const res = await fetch(`${API_URL}/data.json`);
      const questions = await res.json();
      set({ questions }, false);
    },
    reset: () => {
      set({ questions: [] }, false);
    },
  };
});
