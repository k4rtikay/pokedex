import { usePokedex } from "../../Context/PokedexContext"
import PopupMenu from "../PopupMenu/PopupMenu"
import './HeaderDesktop.scss'
import { useState } from "react"

export default function HeaderDesktop(){
    const { islibraryOpen,setIsLibraryOpen } = usePokedex()
    const [isMenuActive, setIsMenuActive] = useState(false)
    
    return(
        <>
        <div className="hd-container">
            <h1 className="hd-title">HueDex</h1>
            <nav className='hd-container--nav'>
                {/* <a href="">About</a>
                <a href=''>Feedback</a> */}
                <button className="hd-library"
                onClick={()=>{setIsLibraryOpen(!islibraryOpen)}}>Library</button>
                <span>
                    <PopupMenu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive}></PopupMenu>
                </span>
            </nav>
        </div>
        </>
    )
}