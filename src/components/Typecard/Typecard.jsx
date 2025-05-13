import { pokemonTypeColors } from "../../utils"
import './Typecard.css'

export function Typecard({type}){
    console.log(pokemonTypeColors[type])
    const {color, background} = pokemonTypeColors[type];
    return (
        <div className="type-tile" style={{backgroundColor:background, color:color}}>
            {type}
        </div>
    )
}