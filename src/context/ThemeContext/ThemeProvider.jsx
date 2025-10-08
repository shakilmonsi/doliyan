import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark-mode");

  // System theme detection on first load
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = prefersDark ? "dark-mode" : "light-mode";
      setTheme(defaultTheme);
      document.documentElement.classList.add(defaultTheme);
    }
  }, []);

  // Apply theme on change
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-mode", "dark-mode", "red-mode");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light-mode" ? "dark-mode" : "light-mode"));
  };

  const setRedMode = () => setTheme("red-mode");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setRedMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
