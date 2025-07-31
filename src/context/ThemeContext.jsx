import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext('light');

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );


    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.getElementById("main-doc").setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.getElementById("main-doc").setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useDarkMode = () => useContext(ThemeContext);
