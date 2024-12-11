import { createContext, useState } from 'react';

export const selectedTabContext = createContext({});
export const modeContext = createContext({});

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