import { useState, createContext, useContext } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
    const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);

    const value = {
        isPaletteModalOpen,
        setIsPaletteModalOpen,
        isSideMenuOpen,
        setIsSideMenuOpen,
        isLibraryOpen,
        setIsLibraryOpen,
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext() {
    return useContext(UIContext);
}
