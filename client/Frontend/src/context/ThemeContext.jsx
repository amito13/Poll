import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {

    localStorage.setItem("theme", theme);

    document.body.className =
      theme === "dark"
        ? "bg-black text-white"
        : "bg-white text-black";

  }, [theme]);

  const toggleTheme = () => {

    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );

  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);