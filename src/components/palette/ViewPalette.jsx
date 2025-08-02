import { useState, useEffect, useRef } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.css'
import { colorForIntensity, randomPokemonNumber } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";
import { usePokedex } from "../../Context/PokedexContext";

export function ViewPalette(){

    const {frontSprite, selectedPokemon, setSelectedPokemon} = usePokedex()

    const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const imgRef = useRef(null)

    const handleImageLoad = () => {
        const img = imgRef.current;
        const colorThief = new ColorThief();
        try {
            // This will now run on the correct, fully loaded image
            const colors = colorThief.getPalette(img, 6);
            setPalette(colors);
            console.log(palette)
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


    return (
        <div className="viewPalette">

            <div className="paletteBarContainer">
                {palette?.map((domColor, domColorIndex)=>{
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
                            <button><i className="fa-solid fa-lock"></i></button>
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