import { useState, useEffect, useRef } from "react"
import ColorThief from 'colorthief';
import './ViewPalette.css'
import { colorForIntensity, randomPokemonNumber } from "../../utils";
import { ColorTooltip } from "./ColorTooltip";
import { usePokedex } from "../../Context/PokedexContext";
import { Modal } from "../Modal/Modal";


export function ViewPalette(){

    const {frontSprite, setSelectedPokemon, savePalette, setSavePalette} = usePokedex()

    const [palette, setPalette] = useState(null)
    const [copied, setCopied] = useState(false)
    const imgRef = useRef(null)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [paletteName, setPaletteName] = useState('')

    const handleImageLoad = () => {
        const img = imgRef.current;
        const colorThief = new ColorThief();
        try {

            const newColors = colorThief.getPalette(img, 6);
            // console.log('newcolors' + newColors)
            
            if(!palette){
                const initialPalette = newColors.map(colorVal => ({color: colorVal, isLocked: false, sourceSprite: frontSprite}))
                setPalette(initialPalette)
                return
            }

            const updatedPalette = palette.map((oldColorObject, index)=>{
                if(oldColorObject.isLocked){
                    return oldColorObject
                }

                return {
                    color: newColors[index],
                    isLocked: false,
                    sourceSprite: frontSprite
                }
            })

            setPalette(updatedPalette)
        } catch (err) {
            console.error(err);
        }
    }

    const handleColorLocking = (lockedIndex)=>{
        const newPalette = palette.map((colorObj, colorIndex)=>{
            if(colorIndex!==lockedIndex){
                return colorObj
            }else{
                return {
                    ...colorObj,
                    isLocked: !colorObj.isLocked,
                }
            }
        })

        setPalette(newPalette)
    }

    const handleSavingPalettes = (name) => {
    if (!name.trim()) {
        alert("Please enter a palette name.");
        return;
    }

    const newSavedPalette = {
        name: name,
        palette: palette
    };

    setSavePalette(prevSavedPalettes => [...prevSavedPalettes, newSavedPalette]);

    // Close the modal and reset the input field
    setIsSaveModalOpen(false);
    setPaletteName('');
    }

    //console.log(palette)

    useEffect(()=>{
        const handleSpacebar = (event) => {
            if(event.key==' ' && isSaveModalOpen==false ){
                setSelectedPokemon(randomPokemonNumber())
                console.log('randomizing......')
                event.preventDefault()
            }
        }

        window.addEventListener('keydown',handleSpacebar)

        return ()=>{
            window.removeEventListener('keydown',handleSpacebar)
        }
    },[setSelectedPokemon, isSaveModalOpen])

    console.log(savePalette)


    return (
        <div className="viewPalette">
            <Modal onClose={()=>{setIsSaveModalOpen(false)}} isModalOpen={isSaveModalOpen}>
                <p><b>Save Palette</b></p>
                <p>Enter a name for the palette:</p>
                <input placeholder="Sample Palette" onChange={(e)=>setPaletteName(e.target.value)} required></input>
                <button type="submit"onClick={()=>{handleSavingPalettes(paletteName)}}>Save</button>
            </Modal>

            <button className="palette-window-button save-palette-button"
            onClick={()=>{
                setIsSaveModalOpen(true)
            }}><i className="fa-regular fa-heart"></i> Save</button>
            <button className="palette-window-button close-palette-modal">✕ Close</button>

            <div className="paletteBarContainer">
                {palette?.map((domColors, domColorIndex)=>{
                    const domColor = domColors.color
                    return(
                        <div
                        style={{backgroundColor:`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`,color:colorForIntensity(domColor[0],domColor[1],domColor[2])}}
                        key={domColorIndex}
                        className={"paletteBar " + (domColors.isLocked?"is-locked":"")}>
                            <div className="colorCopyBtn">
                                <p className="colorValue">{`rgb(${domColor[0]},${domColor[1]},${domColor[2]})`}</p>
                                <button
                                className="color-options"
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
                                    className={'color-options lockButton ' + (domColors.isLocked?'lockedColor':'')}
                                    onClick={()=>{handleColorLocking(domColorIndex)}}>
                                        <i className="fa-solid fa-lock"></i>
                                        <i className="fa-solid fa-unlock"></i>
                                </button>
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