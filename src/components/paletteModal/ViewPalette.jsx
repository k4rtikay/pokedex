import { useState, useEffect, useRef } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.css'
import { colorForIntensity } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";

export default function ViewPalette({frontSprite,isPaletteModalOpen}){

    const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const imgRef = useRef(null)

    useEffect(()=>{
        const img = imgRef.current
        const colorThief = new ColorThief()

        function handleLoad(){
            try{
                const colors = colorThief.getPalette(img,6)
                setPalette(colors)
            }catch(err){
                console.log(err)
            }
        }

        if(img?.complete){
            handleLoad()
        }else{
            img?.addEventListener('load',handleLoad)
            return (()=>{img?.removeEventListener('load',handleLoad)})
        }
    },[isPaletteModalOpen])


    return (
        <div className="viewPalette">

            <div className="paletteBarContainer">
                {palette?.map((domColor, domColorIndex)=>{
                console.log(domColor[0])
                return(
                    <div
                    style={{backgroundColor:`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`}}
                    key={domColorIndex}
                    className="paletteBar">
                        <button className="colorCopyBtn"
                        style={{color:colorForIntensity(domColor[0],domColor[1],domColor[2])}}
                        onClick={async (e)=>{
                            const text = e.currentTarget.innerText;
                            try{
                                await navigator.clipboard.writeText(text)
                                setCopied(true)
                                setTimeout(() => {
                                    setCopied(false)
                                }, 2000);
                            } catch(err){
                                console.log(err)
                            }
                        }}>
                            <p>{`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`}</p>
                            <p><i class="fa-regular fa-copy"></i></p>
                        </button>
                    </div>
                )
            })}
            </div>

            <img src={frontSprite}
            alt="Image of selected pokemon"
            ref={imgRef}
            crossOrigin="anonymous"
            className="paletteSprite" />

            {copied&&
                <ColorTooltip/>
            }
            

        </div>
    )

}