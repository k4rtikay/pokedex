import { useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [palette, setPalette] = useState(null);
    const [themeColor, setThemeColor] = useState([0, 0, 0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isShiny, setIsShiny] = useState(false);
    const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

    const value = {
        palette,
        setPalette,
        themeColor,
        setThemeColor,
        isGenerating,
        setIsGenerating,
        isShiny,
        setIsShiny,
        isDarkMode,
        setIsDarkMode,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(ThemeContext);
}
