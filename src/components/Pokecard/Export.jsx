import { usePokedex } from '../../Context/PokedexContext'
import './Export.scss'
import tinycolor from 'tinycolor2'

export default function Export(){

    const {palette} = usePokedex()
    console.log(palette)

    const colorArray =  palette.map((obj, objIndex)=>{
        // return `rgb(${obj.color.join(', ')})`
        return obj.color
    })

    // const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')

    return(
        <div className='export'>
            <header>
                <p>Export as Code</p>
                {/* <button><span className="material-symbols-rounded">close</span></button> */}
            </header>
           <div className="code-container">
                <pre>
                    <code>
                        /* CSS HEX */
                        <ul>
                            {colorArray.map((color, colorId)=>{
                                const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                                console.log(tinyColorInstance)
                                return <li key={colorId}>{`--color${colorId+1} : ${tinyColorInstance.toHexString()}`}</li>
                            })}
                        </ul>
                        <br />

                        /* CSS HSL */
                        <ul>
                            {colorArray.map((color, colorId)=>{
                                const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                                console.log(tinyColorInstance)
                                return <li key={colorId}>{`--color${colorId+1} : ${tinyColorInstance.toHslString()}`}</li>
                            })}
                        </ul>

                        <br />
                        
                        /* SCSS HEX */
                        <ul>
                            {colorArray.map((color, colorId)=>{
                                const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                                console.log(tinyColorInstance)
                                return <li key={colorId}>{`$color${colorId+1} : ${tinyColorInstance.toHexString()}`}</li>
                            })}
                        </ul>
                        <br />

                        <br />

                        /* SCSS HSL */
                        <ul>
                            {colorArray.map((color, colorId)=>{
                                const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                                console.log(tinyColorInstance)
                                return <li key={colorId}>{`$color${colorId+1} : ${tinyColorInstance.toHslString()}`}</li>
                            })}
                        </ul>

                    </code>
                </pre>
           </div>
           
           <span className="export-actions">
                <button className="export-actions-btn">Copy</button>
                <button className="export-actions-btn download">Download</button>
           </span>

        </div>
    )
}