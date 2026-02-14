
import { getFullPokedexNumber } from "../../utils";
import { useState, useMemo, useRef, useLayoutEffect } from "react";
import "./Sidenav.scss";
import { usePokedex } from "../../Context/PokedexContext";

export default function SearchList() {
  const { selectedPokemon, setSelectedPokemon, setIsGenerating, pokemonList } =
    usePokedex();
  const [searchPokemon, setSearchPokemon] = useState("");
  const inputRef = useRef(null);
  const activeItemRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    }
  }, [pokemonList, selectedPokemon]);

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const firstButton = document.querySelector(".sn-list button");
      firstButton?.focus();
    }
  };

  const handleButtonKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextSibling = e.currentTarget.nextElementSibling;
      if (nextSibling) {
        nextSibling.focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevSibling = e.currentTarget.previousElementSibling;
      if (prevSibling) {
        prevSibling.focus();
      } else {
        inputRef.current?.focus();
      }
    }
  };

  const searchedList = useMemo(() => {
    const indexedPokemonList = pokemonList.map((name, index) => ({
      name,
      index,
    }));

    if (searchPokemon === "") {
      return indexedPokemonList;
    }

    if (/^[0-9]+$/.test(searchPokemon)) {
      const numIndex = Number(searchPokemon);
      if (numIndex > 0 && numIndex <= indexedPokemonList.length) {
        return [indexedPokemonList[numIndex - 1]];
      } else {
        return [];
      }
    }

    return indexedPokemonList.filter((poke) =>
      poke.name.toLowerCase().startsWith(searchPokemon.toLowerCase())
    );
  }, [searchPokemon, pokemonList]);

  const handlePokemonSelect = (pokemonIndex) => {
    if (pokemonIndex !== selectedPokemon) {
      setIsGenerating(true);
      setSelectedPokemon(pokemonIndex);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        placeholder="E.g. 001 or Bulba.."
        onChange={(e) => {
          setSearchPokemon(e.target.value);
        }}
        onKeyDown={handleInputKeyDown}
      />

      <div className="sn-list">
        {searchedList.map(({ name, index }) => {
          return (
            <button
              key={index}
              ref={selectedPokemon === index ? activeItemRef : null}
              className={`sn-button ${selectedPokemon === index ? "sn-button--selected" : ""}`}
              onClick={() => handlePokemonSelect(index)}
              onKeyDown={(e) => handleButtonKeyDown(e, index)}
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
