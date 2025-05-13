import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { Sidenav } from './components/Sidenav/Sidenav'
import { Pokecard } from './components/Pokecard/Pokecard'

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return (
    <div className='App'>
    <Header/>
    <Sidenav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}/>
    <Pokecard selectedPokemon={selectedPokemon}/>
    </div>
  )
}

export default App
