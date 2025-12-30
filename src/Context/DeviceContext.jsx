import { useState, useEffect, createContext, useContext } from "react";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const value = {
        isDesktop,
    };

    return (
        <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
    );
}

export function useDeviceContext() {
    return useContext(DeviceContext);
}
