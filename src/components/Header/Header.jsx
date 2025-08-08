import './Header.css'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Header({isSideMenuOpen,setIsSideMenuOpen}){
    const { globalUser,logout } = useAuth()
    const navigate = useNavigate();

    return(
        <div className="sideNavHeader">
            <button
            className='menu-button'
            onClick={()=>{setIsSideMenuOpen(!isSideMenuOpen)}}>{!isSideMenuOpen?<i className="fa-solid fa-bars"></i>:<i className="fa-solid fa-arrow-left"></i>}</button>
            <h1>Pokébook</h1>
            <div className="sideNavHeader-buttons">
                <button className="headerButton darkModeBtn"
                onClick={()=>{
                    {document.querySelector('body').classList.toggle('darkmode')};
                }}><i className="fa-regular fa-lightbulb"></i>
                </button>

                <button className='headerButton'
                onClick={()=>{navigate('/app/saved-palettes')}}>Saved Palettes</button>
                <button className="headerButton">{globalUser?globalUser.displayName:'Guest'}</button>

                <button
                className='headerButton'
                onClick={async ()=>{
                    if(globalUser){
                        await logout()
                        navigate('/')
                    }else{
                        navigate('/app/auth?mode=signin')
                    }
                }}>{globalUser?'Logout':'Sign in'}</button>
            </div>
        </div>
    )
}