import { usePokedex } from "../../Context/PokedexContext"
import { Header } from "../Header/Header"
import './SavedPaletteWindow.css'

export default function SavedPaletteWindow(){

    const { savePalette, setSavePalette } = usePokedex()
    
    return(
        <div className="savedPaletteWindow">
            <div className="savedPaletteContainer">
                <div className="savedPaletteHeader">
                    <h1>Saved Palettes</h1>
                    <input type="text" placeholder="Search a palette by name..." />
                </div>
                {/* <div className="guestPaletteWindow">
                    <div className="frame">
                        <span className="frameContent">   
                            <h1><i className="fa-solid fa-lock"></i> Login to save your palettes</h1>
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}