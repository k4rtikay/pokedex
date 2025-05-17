import {  first151Pokemon, getFullPokedexNumber } from "../../utils"
import { useState } from "react"
import './Sidenav.css'

export function Sidenav({selectedPokemon,setSelectedPokemon}){
    const [searchPokemon,setSearchPokemon]=useState('');
    let searchedList = [];
    if(searchPokemon===''){
        searchedList=first151Pokemon;
    }
    else if(/^[0-9]+$/.test(searchPokemon)){
        let numIndex = Number(searchPokemon)
        if(numIndex>0&&numIndex<152){
            searchedList= [first151Pokemon[numIndex-1]]
        }else{
            searchedList=[]
        }  
    }else{
        searchedList=first151Pokemon.filter((poke)=>poke.toLowerCase().startsWith(searchPokemon.toLowerCase()))
    }


    return(
        <nav className="sidenav">
            <h1>Pokedex</h1>
            <input placeholder="E.g. 001 or Bulba.."
            onChange={(e)=>{
                setSearchPokemon(e.target.value)
            }}></input>
            <div className="scrollPoke">
                {searchedList.map((pokemon)=>{
                    const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                    return <button key={pokemon} className={`nav-button ${selectedPokemon===first151Pokemon.indexOf(pokemon)?'nav-button-selected':""}`}
                    onClick={()=>{
                        setSelectedPokemon(truePokedexNumber)
                    }}>
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{pokemon}</p>
                    </button>
            })}
            </div>
        </nav>
    )
}