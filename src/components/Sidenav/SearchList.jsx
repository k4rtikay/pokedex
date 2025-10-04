import {  first151Pokemon, getFullPokedexNumber } from "../../utils"
import { useState,useEffect,useRef } from "react"
import './Sidenav.scss'
import { usePokedex } from "../../Context/PokedexContext";

export default function SearchList(){
    const { selectedPokemon, setSelectedPokemon, setIsGenerating, pokemonList } = usePokedex();

    const [searchPokemon,setSearchPokemon]=useState('');
    let searchedList = [];
    if(searchPokemon===''){
        searchedList=pokemonList;
    }
    else if(/^[0-9]+$/.test(searchPokemon)){
        let numIndex = Number(searchPokemon)
        if(numIndex>0&&numIndex<650){
            searchedList= [pokemonList[numIndex-1]]
        }else{
            searchedList=[]
        }  
    }else{
        searchedList=pokemonList.filter((poke)=>poke.toLowerCase().startsWith(searchPokemon.toLowerCase()))
    }

    return(
        <>
            <input placeholder="E.g. 001 or Bulba.."
            onChange={(e)=>{
                setSearchPokemon(e.target.value)
            }}></input>

            <div className="sn-list">
                {searchedList.map((pokemon)=>{
                    const truePokedexNumber = pokemonList.indexOf(pokemon)
                    return <button key={truePokedexNumber} className={`sn-button ${selectedPokemon===pokemonList.indexOf(pokemon)?'sn-button--selected':""}`}
                    onClick={()=>{
                        setIsGenerating(true)
                        setSelectedPokemon(truePokedexNumber)
                    }}>
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{pokemon}</p>
                    </button>
            })}
            </div>
        </>
    )
}