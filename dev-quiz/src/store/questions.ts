import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  fetchQuestions: (search: string, limit: number) => Promise<void>;
  reset: () => void;
}

const API_URL = import.meta.env.PROD
  ? "https://midu-react-13.surge.sh/"
  : "http://localhost:5173/";

export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    fetchQuestions: async (search: string, limit: number) => {
      const res = await fetch(`${API_URL}/data.json`);
      const json = await res.json();
      const questions = json
        .filter((element: Question) =>
          element.question.toLowerCase().includes(search)
        )
        .slice(0, limit);
      set({ questions }, false);
    },
    reset: () => {
      set({ questions: [] }, false);
    },
  };
});
