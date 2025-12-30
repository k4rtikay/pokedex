import { useState, createContext, useContext } from "react";
import { usePokemon } from "../hooks/usePokemon";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
    const [selectedPokemon, setSelectedPokemon] = useState(0);
    const { data, pokemonList, loading } = usePokemon(selectedPokemon);

    const value = {
        selectedPokemon,
        setSelectedPokemon,
        data,
        pokemonList,
        loading,
    };

    return (
        <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
    );
}

export function usePokemonContext() {
    return useContext(PokemonContext);
}
