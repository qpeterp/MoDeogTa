import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState("lightning");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [alpha, setAlpha] = useState(0.5);

  const [typingStyle, setTypingStyle] = useState("basic");

  useEffect(() => {
    const root = document.documentElement;

    // 기존 클래스 전부 삭제
    root.className = "";

    switch (themeColor) {
      case "lightning":
        root.classList.add("theme-lightning");
        break;
      case "rain":
        root.classList.add("theme-rain");
        break;
      case "fire":
        root.classList.add("theme-fire");
        break;
      case "nature":
        root.classList.add("theme-nature");
        break;
      case "night":
        root.classList.add("theme-night");
        break;
      default:
        break;
    }
  }, [themeColor]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,

        backgroundUrl,
        setBackgroundUrl,

        alpha,
        setAlpha,

        typingStyle,
        setTypingStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
