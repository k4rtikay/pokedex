import './Header.scss'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PopupMenu from '../PopupMenu/PopupMenu'

export function Header({isSideMenuOpen,setIsSideMenuOpen}){
    const { globalUser,logout } = useAuth()
    const [isMenuActive, setIsMenuActive] = useState(false)

    return(
        // <div className="sideNavHeader">
        //     <button
        //     className='menu-button'
        //     onClick={()=>{setIsSideMenuOpen(!isSideMenuOpen)}}>{!isSideMenuOpen?<i className="fa-solid fa-bars"></i>:<i className="fa-solid fa-arrow-left"></i>}</button>
        //     <h1>Pokébook</h1>
        //     <div className="sideNavHeader-buttons">
        //         <button className="headerButton darkModeBtn"
        //         onClick={()=>{
        //             {document.querySelector('body').classList.toggle('darkmode')};
        //         }}><i className="fa-regular fa-lightbulb"></i>
        //         </button>

        //         <button className='headerButton'
        //         onClick={()=>{navigate('/app/saved-palettes')}}>Saved Palettes</button>
        //         <button className="headerButton">{globalUser?globalUser.displayName:'Guest'}</button>

        //         <button
        //         className='headerButton'
        //         onClick={async ()=>{
        //             if(globalUser){
        //                 console.log('logging out..')
        //                 await logout()
        //                 console.log('navigating..')
        //                 navigate('/')
        //             }else{
        //                 navigate('/app/auth?mode=signin')
        //             }
        //         }}>{globalUser?'Logout':'Sign in'}</button>
        //     </div>
        // </div>

        <div className="h-container">
            <div className='h-container--menu'>
                <PopupMenu></PopupMenu>
            </div>
            <h1 className="h-title">Pokebook</h1>
            <button className='h-search'><span className="h-icon material-symbols-rounded">search</span></button>
        </div>
    )
}