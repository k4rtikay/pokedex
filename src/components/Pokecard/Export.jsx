import { usePokedex } from '../../Context/PokedexContext'
import './Export.scss'
import tinycolor from 'tinycolor2'
import { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxDark,materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ColorTooltip } from '../palette/Toast'


export default function Export(){

    const [copied, setCopied] = useState(false)

    const {palette, isDarkMode, data} = usePokedex()
    const { name } = data
    console.log(palette)

    const colorArray =  palette.map((obj, objIndex)=>{
        // return `rgb(${obj.color.join(', ')})`
        return obj.color
    })

    const hexLinesCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        // console.log(tinyColorInstance)
                        return `--color${colorId+1} : ${tinyColorInstance.toHexString()};`
    }).join('\n')

    const hslLinesCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        return `--color${colorId+1} : ${tinyColorInstance.toHslString()};`
    }).join('\n')

    const hexLinesSCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        return `$color${colorId+1} : ${tinyColorInstance.toHexString()};`
    }).join('\n')

    const hslLinesSCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        return `$color${colorId+1} : ${tinyColorInstance.toHslString()};`
    }).join('\n')

    const cssHexString =`/* CSS HEX */\n${hexLinesCSS}\n`

    const cssHslString =`/* CSS HSL */\n${hslLinesCSS}\n`

    const scssHexString =`/* SCSS HEX */\n${hexLinesSCSS}\n`

    const scssHslString =`/* SCSS HSL */\n${hslLinesSCSS}\n`

    const fullCodeString = cssHexString + '\n' + cssHslString + '\n' + scssHexString + '\n' + scssHslString

    const codeRef = useRef()

    const handleCodeCopy = () =>{
        if(codeRef.current){
            setCopied(true);
            const codeString = codeRef.current.innerText
            navigator.clipboard.writeText(codeString)
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
    }

    const handleDownload = (code, name) =>{
        const blob = new Blob([code], {type: 'text/x-scss'})

        //create temp. URL
        const url = URL.createObjectURL(blob)

        //fire a click on download link then cleanup
        const link = document.createElement('a')
        link.href = url
        link.download = name + '.scss'
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }



    console.log(copied)

    return(
        <div className='export'>
            <header>
                <p>Export as Code</p>
                {/* <button><span className="material-symbols-rounded">close</span></button> */}
            </header>
           <div className="code-container">
                    {/* <code ref={codeRef}>
                       {cssHexString + '\n' + cssHslString + '\n' + scssHexString + '\n' + scssHslString}
                    </code> */}
                    <SyntaxHighlighter language="javascript" style={isDarkMode?gruvboxDark:materialLight} customStyle={{margin: 0}} ref={codeRef}>
                        {fullCodeString}
                    </SyntaxHighlighter>
           </div>
           
           <span className="export-actions">
                <button className="export-actions-btn"
                onClick={handleCodeCopy}>Copy</button>
                <button className="export-actions-btn download"
                onClick={()=>handleDownload(fullCodeString, name)}>Download</button>
           </span>

            {copied&&
                <ColorTooltip text={<div style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'center'}}><span class="material-symbols-rounded">check_circle</span> Copied to clipboard!</div>}/>
            }

        </div>
    )
}