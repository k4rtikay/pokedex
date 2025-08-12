import './SavedPaletteWindow.css'
import SavedPalette from "./SavedPalette"
import { useDatabase } from "../../Context/DatabaseContext"

export default function SavedPaletteWindow(){

    const { savePalette } = useDatabase()
    
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
                <div className="savedPalettesPane">
                    {
                        savePalette.map((ColPalette, colPaletteIndex)=>{
                            return(
                                <SavedPalette palette={ColPalette.palette} name={ColPalette.name} key={colPaletteIndex}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}