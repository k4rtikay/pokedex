import { getFullPokedexNumber } from "../../utils";
import { useState, useMemo } from "react";
import "./Sidenav.scss";
import { usePokedex } from "../../Context/PokedexContext";

export default function SearchList() {
  const { selectedPokemon, setSelectedPokemon, setIsGenerating, pokemonList } =
    usePokedex();
  const [searchPokemon, setSearchPokemon] = useState("");

  // --- Performance Refactor ---
  // useMemo to prevent re-filtering the entire list on every render.
  // This logic now ONLY runs if `searchPokemon` or `pokemonList` changes.
  const searchedList = useMemo(() => {
    //mapping the list to include the original index.
    // This avoids calling the slow `indexOf` inside our render loop.
    const indexedPokemonList = pokemonList.map((name, index) => ({
      name,
      index,
    }));

    if (searchPokemon === "") {
      return indexedPokemonList;
    }

    //search by pokedex number
    if (/^[0-9]+$/.test(searchPokemon)) {
      const numIndex = Number(searchPokemon);
      if (numIndex > 0 && numIndex <= indexedPokemonList.length) {
        return [indexedPokemonList[numIndex - 1]];
      } else {
        return [];
      }
    }

    // Search by name (string)
    return indexedPokemonList.filter((poke) =>
      poke.name.toLowerCase().startsWith(searchPokemon.toLowerCase())
    );
  }, [searchPokemon, pokemonList]);

  const handlePokemonSelect = (pokemonIndex) => {
    // fix:
    // ONLY update state if the new index is different from the current one.
    if (pokemonIndex !== selectedPokemon) {
      setIsGenerating(true);
      setSelectedPokemon(pokemonIndex);
    }
  };

  return (
    <>
      <input
        placeholder="E.g. 001 or Bulba.."
        onChange={(e) => {
          setSearchPokemon(e.target.value);
        }}
      />

      <div className="sn-list">
        {searchedList.map(({ name, index }) => {
          return (
            <button
              key={index}
              className={`sn-button ${selectedPokemon === index ? "sn-button--selected" : ""}`}
              onClick={() => handlePokemonSelect(index)}
            >
              <p>{getFullPokedexNumber(index)}</p>
              <p>{name}</p>
            </button>
          );
        })}
      </div>
    </>
  );
}
