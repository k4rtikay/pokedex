import './PaletteBar.css'
import { useState } from 'react';
import { colorForIntensity } from '../../utils';
import useShadesGenerator from '../../hooks/useShades';

export function PaletteBar({ colorObject, onLock, onCopy }) {
  const { color, isLocked, id } = colorObject;
  const rgbString = `rgb(${color.join(', ')})`;
  const [isShadesOn, setIsShadesOn] = useState(false)

  const shadesArray = useShadesGenerator(rgbString)

  const handleCopy = () => {
    navigator.clipboard.writeText(rgbString);
    onCopy();
  };


  return (
    <div
      style={{
        backgroundColor: rgbString,
        color: colorForIntensity(color[0], color[1], color[2]),
      }}
      className={`paletteBar ${isLocked ? "is-locked" : ""}`}
    >
        {
            isShadesOn ?
                <div className="shadesContainer">
                    {
                        shadesArray.map((colorObj,colorObjIndex)=>{
                            return(
                                <button className="shade"
                                style={{backgroundColor:colorObj.color}}
                                key={colorObjIndex}
                                onClick={()=>{setIsShadesOn(false)}}>
                                    {colorObj.isOriginal&&'o'}
                                </button>
                            )
                        })
                    }

                    <button
                    className='closeShades'
                    aria-label='button to close shades overlay'
                    onClick={()=>{setIsShadesOn(false)}}><span className="fa-solid fa-xmark"></span></button>
                </div> :

                <div className="colorCopyBtn">
                    <p className="colorValue">{rgbString}</p>
                    <button
                    aria-label="Copy color"
                    className="color-options"
                    onClick={handleCopy}
                    >
                    <span className="fa-regular fa-copy"></span>
                    </button>
                    <button
                    className={`color-options lockButton ${isLocked ? 'lockedColor' : ''}`}
                    aria-label={isLocked ? 'Unlock color' : 'Lock color'}
                    onClick={() => onLock(id)} // Pass the unique ID up to the parent
                    >
                    {isLocked 
                        ? <span className="fa-solid fa-lock"></span>
                        : <span className="fa-solid fa-unlock"></span>
                    }
                    </button>
                    <button className='color-options' aria-label='show shades button'
                    onClick={()=>{setIsShadesOn(true)}}>
                        <span className="fa-solid fa-layer-group"></span>
                    </button>
                </div>

                
        }
        
    </div>
  );
}