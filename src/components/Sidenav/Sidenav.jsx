import {  first151Pokemon, getFullPokedexNumber } from "../../utils"
import { useState,useEffect } from "react"
import './Sidenav.css'
import { usePokedex } from "../../Context/PokedexContext";

export function Sidenav({isSideMenuOpen}){
    const { selectedPokemon, setSelectedPokemon } = usePokedex();

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


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    }, []);



    return(
        <nav className={`sidenav ${isMobile && !isSideMenuOpen ? 'hidden' : ''}`}>
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

