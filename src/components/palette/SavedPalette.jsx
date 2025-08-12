import './SavedPalette.css'

export default function SavedPalette(props){

    const { palette, name } = props;
    const uniqueSprites = [...new Set(palette.map(p => p.sourceSprite))];
    return(
        <div>
            <div className="paletteCard">
                <div className="palette-color-stripes">
                    {palette.map((paletteObj,paletteObjIndex)=>{
                        const stripeBg = `rgb(${paletteObj.color.join(', ')})`
                        console.log(stripeBg)
                        return(
                            <div key={paletteObjIndex} style={{backgroundColor:stripeBg}} className='savedColorStripe'></div>
                        )
                    })}
                </div>
                <div className="palette-content">
                    <p>{name}</p>
                    <div className='saved-palette-options'>
                        <i className="fa-solid fa-file-export"></i>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <i className="fa-regular fa-trash-can"></i>
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