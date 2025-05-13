import {  first151Pokemon, getFullPokedexNumber } from "../../utils"
import './Sidenav.css'

export function Sidenav({selectedPokemon,setSelectedPokemon}){
    //const pokemonList = first151Pokemon
    return(
        <nav className="sidenav">
            <h1>Pokedex</h1>
            <input placeholder="E.g. 001 or Bulba.."></input>
            <div className="scrollPoke">
                {first151Pokemon.map((pokemon,pokemonIndex)=>{
                    const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                    return <button key={pokemonIndex} className={`nav-button ${selectedPokemon===pokemonIndex?'nav-button-selected':""}`}
                    onClick={()=>{
                        setSelectedPokemon(truePokedexNumber)
                    }}>
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{first151Pokemon[pokemonIndex]}</p>
                    </button>
            })}
            </div>
        </nav>
    )
}