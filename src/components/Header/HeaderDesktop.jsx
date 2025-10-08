import { usePokedex } from "../../Context/PokedexContext"
import PopupMenu from "../PopupMenu/PopupMenu"
import './HeaderDesktop.scss'

export default function HeaderDesktop(){
    const { islibraryOpen,setIsLibraryOpen } = usePokedex()
    return(
        <>
        <div className="hd-container">
            <h1 className="hd-title">Pokebook</h1>
            <nav className='hd-container--nav'>
                <a href="">About</a>
                <a href=''>Feedback</a>
                <button className="hd-library"
                onClick={()=>{setIsLibraryOpen(!islibraryOpen)}}>Library</button>
                <span>
                    <PopupMenu></PopupMenu>
                </span>
            </nav>
        </div>
        </>
    )
}