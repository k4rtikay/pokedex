import { useState, useEffect, useRef } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.css'
import { colorForIntensity, randomPokemonNumber } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";
import { usePokedex } from "../../Context/PokedexContext";

export function ViewPalette(){

    const {frontSprite, setSelectedPokemon} = usePokedex()

    const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const imgRef = useRef(null)

    const handleImageLoad = () => {
        const img = imgRef.current;
        const colorThief = new ColorThief();
        try {

            const newColors = colorThief.getPalette(img, 6);
            console.log('newcolors' + newColors)
            
            if(!palette){
                const initialPalette = newColors.map(colorVal => ({color: colorVal, isLocked: false}))
                setPalette(initialPalette)
                return
            }

            const updatedPalette = palette.map((oldColorObject, index)=>{
                if(oldColorObject.isLocked){
                    return oldColorObject
                }

                return {
                    color: newColors[index],
                    isLocked: false
                }
            })

            setPalette(updatedPalette)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        const handleSpacebar = (event) => {
            if(event.key==' '){
                setSelectedPokemon(randomPokemonNumber())
                event.preventDefault()
            }
        }

        window.addEventListener('keydown',handleSpacebar)

        return ()=>{
            window.removeEventListener('keydown',handleSpacebar)
        }
    },[])

    console.log(palette)


    return (
        <div className="viewPalette">

            <div className="paletteBarContainer">
                {palette?.map((domColors, domColorIndex)=>{
                    const domColor = domColors.color
                return(
                    <div
                    style={{backgroundColor:`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`}}
                    key={domColorIndex}
                    className="paletteBar">
                        <div className="colorCopyBtn"
                        style={{color:colorForIntensity(domColor[0],domColor[1],domColor[2])}}
                        >
                            <p>{`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`}</p>
                            <button
                            onClick={async (e)=>{
                                const text = e.currentTarget.parentElement.innerText;
                                try{
                                    await navigator.clipboard.writeText(text)
                                    setCopied(true)
                                    setTimeout(() => {
                                        setCopied(false)
                                    }, 2000);
                                } catch(err){
                                    console.log(err)
                                }
                            }}><i className="fa-regular fa-copy"></i></button>
                            <button
                            onClick={()=>{domColors.isLocked = !domColors.isLocked}}><i className="fa-solid fa-lock"></i></button>
                        </div>
                    </div>
                )
            })}
            </div>

            <img src={frontSprite}
            alt="Image of selected pokemon"
            ref={imgRef}
            crossOrigin="anonymous"
            className="paletteSprite"
            loading="lazy"
            onLoad={handleImageLoad} />

            {copied&&
                <ColorTooltip text={'Color Copied!'}/>
            }
            

        </div>
    )

}