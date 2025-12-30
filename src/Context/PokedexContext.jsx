import { createContext, useContext } from "react";
import { PokemonProvider, usePokemonContext } from "./PokemonContext";
import { ThemeProvider, useThemeContext } from "./ThemeContext";
import { UIProvider, useUIContext } from "./UIContext";
import { DeviceProvider, useDeviceContext } from "./DeviceContext";

const PokedexContext = createContext();

// Combined provider for backward compatibility
export function PokedexProvider({ children }) {
  return (
    <DeviceProvider>
      <PokemonProvider>
        <ThemeProvider>
          <UIProvider>{children}</UIProvider>
        </ThemeProvider>
      </PokemonProvider>
    </DeviceProvider>
  );
}

// Backward-compatible hook that aggregates all contexts
export function usePokedex() {
  const pokemon = usePokemonContext();
  const theme = useThemeContext();
  const ui = useUIContext();
  const device = useDeviceContext();

  return {
    ...pokemon,
    ...theme,
    ...ui,
    ...device,
  };
}

// Re-export individual hooks for granular access
export { usePokemonContext } from "./PokemonContext";
export { useThemeContext } from "./ThemeContext";
export { useUIContext } from "./UIContext";
export { useDeviceContext } from "./DeviceContext";
