import { usePokedex } from '../../Context/PokedexContext'
import './Export.scss'

export default function Export(){

    const {palette} = usePokedex()
    console.log(palette)

    const colorArray =  palette.map((obj, objIndex)=>{
        return `rgb(${obj.color.join(', ')})`
    })

    // const code = `${colorArray.map((color)=>{return color})}`

    return(
        <div className='export'>
            <header>
                <p>Export as code.</p>
                {/* <button><span className="material-symbols-rounded">close</span></button> */}
            </header>
           <div className="code-container">
                <code>
                    {colorArray.map((color, colorId)=>`--color${colorId+1} : ${color}`)}
                </code>
           </div>
           <span className="export-actions">
            <button className="export-actions-btn">Copy</button>
            <button className="export-actions-btn">Download</button>
           </span>
        </div>
    )
}