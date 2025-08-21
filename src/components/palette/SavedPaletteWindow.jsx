import './SavedPaletteWindow.css'
import SavedPalette from "./SavedPalette"
import { useDatabase } from "../../Context/DatabaseContext"
import { useAuth } from '../../Context/AuthContext'

export default function SavedPaletteWindow(){

    const { savePalette,loading } = useDatabase()
    const {globalUser} = useAuth()

    if(loading){
        console.log('loading palettes')
        return(
            <div>
                <p>Palettes are loading...</p>
            </div>
        )
    }

    console.log(savePalette)    
    
    return(
        <div className="savedPaletteWindow">
            <div className="savedPaletteContainer">
                <div className="savedPaletteHeader">
                    <h1>Saved Palettes</h1>
                    <input type="text" placeholder="Search a palette by name..." />
                </div>

                {(globalUser && savePalette.length!=0)?(

                    <div className="savedPalettesPane">
                        {
                            savePalette.map((ColPalette, colPaletteIndex)=>{
                                return(

                                    <SavedPalette palette={ColPalette.palette} name={ColPalette.name} key={colPaletteIndex}/>

                                )

                            })
                        }
                    </div>

                ):(globalUser && savePalette.length==0)?(

                    <div className="noPalettesSaved">
                        <p>No palettes saved yet. Search up your favourite Pokemon and get inspired!!</p>
                        <p>ϞϞ(๑⚈ ․̫ ⚈๑)∩</p>
                    </div>

                ):(
                    
                    <div className="guestPaletteWindow">
                        <div className="frame">
                            <span className="frameContent">   
                                <h1><i className="fa-solid fa-lock"></i> Login to save your palettes</h1>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}