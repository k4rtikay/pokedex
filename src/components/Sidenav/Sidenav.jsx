import {  first151Pokemon, getFullPokedexNumber } from "../../utils"
import { useState,useEffect } from "react"
import './Sidenav.scss'
import { usePokedex } from "../../Context/PokedexContext";

export function Sidenav({setIsSearchActive, isSearchActive}){
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

    // useEffect(() => {
    // const handleResize = () => setIsMobile(window.innerWidth <= 768);
    // window.addEventListener('resize', handleResize);
    // handleResize();
    // return () => window.removeEventListener('resize', handleResize);
    // }, []);

    // In your SideNav component
    useEffect(() => {
        if (isSearchActive) {
            document.body.classList.add('sidenav-open')
        } else {
            document.body.classList.remove('sidenav-open')
        }
        return () => document.body.classList.remove('sidenav-open')
    }, [isSearchActive])



    return(
        <nav className={`sidenav`}>
            <div className="sn-header">
                <p>Search</p>
                <button aria-label="button to close the search sidemenu"
                onClick={()=>{setIsSearchActive(false)}}><span class="material-symbols-rounded">close</span></button></div>
            <input placeholder="E.g. 001 or Bulba.."
            onChange={(e)=>{
                setSearchPokemon(e.target.value)
            }}></input>
            <div className="sn-list">
                {searchedList.map((pokemon)=>{
                    const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                    return <button key={pokemon} className={`sn-button ${selectedPokemon===first151Pokemon.indexOf(pokemon)?'sn-button--selected':""}`}
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

// ${isMobile && !isSideMenuOpen ? 'hidden' : ''}`

