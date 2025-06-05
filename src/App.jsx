import { useState, useRef } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { Sidenav } from './components/Sidenav/Sidenav'
import { Pokecard } from './components/Pokecard/Pokecard'

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);  

  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false); 

  const [frontSprite, setFrontSprite] = useState(null);


  return (
    <div className='App'>
    <div className="sidePane">
      <Header/>
      <Sidenav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}/>
    </div>
    <Pokecard selectedPokemon={selectedPokemon} 
    setIsModalOpen={setIsModalOpen} 
    isModalOpen={isModalOpen} 
    isPaletteModalOpen={isPaletteModalOpen} 
    setIsPaletteModalOpen={setIsPaletteModalOpen}
    frontSprite={frontSprite}
    setFrontSprite={setFrontSprite} />
    </div>
  )
}

export default App
