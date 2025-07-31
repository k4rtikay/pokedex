
import './savedPalette.css'

export default function SavedPalette(props){

    const { name, sprite, colorsArr } = props;

    return(
        <div>
            <div className="paletteCard">
                <div className="palette-color-stripes">
                    {colorsArr.map((color,colorKey)=>{
                        return(
                            <div key={colorKey} style={{backgroundColor:color}} className='savedColorStripe'></div>
                        )
                    })}
                </div>
                <div className="palette-content">
                    <p>{name}</p>
                    <div>
                        <i class="fa-light fa-file-export"></i>
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                    <div className="palette-sprites-container">
                        {sprite}
                    </div>
                </div>
            </div>
        </div>
    )
}