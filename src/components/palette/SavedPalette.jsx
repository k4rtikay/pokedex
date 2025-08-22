import { useDatabase } from '../../Context/DatabaseContext';
import './SavedPalette.css'

export default function SavedPalette(props){

    const { id,palette, name } = props;
    const { deletePalette } = useDatabase()
    const uniqueSprites = [...new Set(palette.map(p => p.sourceSprite))];

    console.log(id)

    return(
        <div>
            <div className="paletteCard">
                <div className="palette-color-stripes">
                    {palette.map((paletteObj,paletteObjIndex)=>{
                        const stripeBg = `rgb(${paletteObj.color.join(', ')})`
                        return(
                            <div key={paletteObjIndex} style={{backgroundColor:stripeBg}} className='savedColorStripe'></div>
                        )
                    })}
                </div>
                <div className="palette-content">
                    <p>{name}</p>
                    <div className='saved-palette-options'>
                        <button><span className="fa-solid fa-file-export"></span></button>
                        <button><span className="fa-solid fa-pen-to-square"></span></button>
                        <button
                        onClick={()=>{deletePalette(id)}}><span className="fa-regular fa-trash-can"></span></button>
                    </div>
                    <div className="palette-sprites-container">
                    {
                        uniqueSprites.map((image, imageIndex) => {
                            return (
                                <img
                                src={image}
                                key={imageIndex}
                                alt='Sprite of a source Pokémon for the palette'
                                loading='lazy'
                                ></img>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}