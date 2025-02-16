import { create } from "zustand";

export const useThemeStore = create((set) => ({
  // Get the theme from local storage or set it to 'Synthwave'
  theme: localStorage.getItem("chat-theme") || "Synthwave",

  // Set the theme in local storage and update the state
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
