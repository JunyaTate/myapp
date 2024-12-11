import { createContext, useState } from 'react';

export const selectedTabContext = createContext({});
export const modeContext = createContext({});
export const themeContext = createContext({});
export const fontSizeContext = createContext({});
export const tabSizeContext = createContext({});

export const SelectedTabProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("問題");

    return (
        <selectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </selectedTabContext.Provider>
    );
}

export const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState("python");

    return (
        <modeContext.Provider value={{ mode, setMode }}>
            {children}
        </modeContext.Provider>
    );
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("monokai");

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    );
}

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(14);

    return (
        <fontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </fontSizeContext.Provider>
    );
}

export const TabSizeProvider = ({ children }) => {
    const [tabSize, setTabSize] = useState(4);

    return (
        <tabSizeContext.Provider value={{ tabSize, setTabSize }}>
            {children}
        </tabSizeContext.Provider>
    );
}
