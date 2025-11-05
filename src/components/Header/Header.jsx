import './Header.scss'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PopupMenu from '../PopupMenu/PopupMenu'
import { usePokedex } from '../../Context/PokedexContext'
import { Sidenav } from '../Sidenav/Sidenav'

export function Header({isSideMenuOpen,setIsSideMenuOpen}){
    const { globalUser,logout } = useAuth()
    const {selectedPokemon, setSelectedPokemon} = usePokedex()
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)

    return(

        <div className="h-container">
            <div className='h-container--menu'>
                <PopupMenu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive}></PopupMenu>
            </div>
            <h1 className="h-title">Pokebook</h1>
            <button className='h-search'
            onClick={()=>{setIsSearchActive(!isSearchActive)}}><span className="h-icon material-symbols-rounded">search</span></button>
                <Sidenav isSearchActive={isSearchActive} setSelectedPokemon={setSelectedPokemon} setIsSearchActive={setIsSearchActive}/>
        </div>
    )
}