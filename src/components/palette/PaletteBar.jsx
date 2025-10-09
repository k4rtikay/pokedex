import './PaletteBar.scss'
import { useState } from 'react';
import { colorForIntensity } from '../../utils';
import useShadesGenerator from '../../hooks/useShades';
import tinycolor from 'tinycolor2';
import { Modal } from '../Modal/Modal';
import { usePokedex } from '../../Context/PokedexContext';

export function PaletteBar({ colorObject, onLock, onCopy, onShadeSelect }) {
  const { isDesktop } = usePokedex()
  const { color, isLocked, id } = colorObject;
  const rgbString = color ? `rgb(${color.join(', ')})` : 'rgb(128, 128, 128)';
  const [isShadesOn, setIsShadesOn] = useState(false)
  const num = isDesktop?10:8;

  const shadesArray = useShadesGenerator(rgbString,num)

  const handleCopy = () => {
    navigator.clipboard.writeText(rgbString);
    onCopy();
  };


  return (
    <div
      style={{
        backgroundColor: rgbString,
        color: color&&colorForIntensity(color[0], color[1], color[2]),
      }}
      className={`paletteBar ${isLocked ? "is-locked" : ""}`}
    >
        {/* {
            // isShadesOn ? */}
                <Modal onClose={()=>{setIsShadesOn(false)}} isModalOpen={isShadesOn}>
                  <div className="shadesContainer">
                      {
                          shadesArray.map((colorObj,colorObjIndex)=>{
                              const rgbObj = tinycolor(colorObj.color)
                              const rgbArray = Object.values(rgbObj).slice(1,4)
                              return(
                                  <button className="shade"
                                  style={{backgroundColor:colorObj.color, color: colorForIntensity(rgbArray[0], rgbArray[1], rgbArray[2])}}
                                  key={colorObjIndex}
                                  onClick={()=>{
                                      onShadeSelect(rgbArray,id)
                                      setIsShadesOn(false)}}>
                                      <span className='colorString'>{colorObj.color}</span>
                                      <span className='originalMarker'
                                      >{colorObj.isOriginal&&<span 
                                      style={{backgroundColor: colorForIntensity(rgbArray[0], rgbArray[1], rgbArray[2])}}></span>}</span>
                                  </button>
                              )
                          })
                      }
                      {/* <button
                      className='closeShades'
                      aria-label='button to close shades overlay'
                      onClick={()=>{setIsShadesOn(false)}}><span className="fa-solid fa-xmark"></span></button> */}
                  </div>
                </Modal>

                <div className="colorCopyBtn">
                    <p className="colorValue">{rgbString}</p>
                    <span className='paletteBar-actions'>
                      <button
                      aria-label="Copy color"
                      className="color-options"
                      onClick={handleCopy}
                      >
                      <span className="material-symbols-rounded">content_copy</span>
                      </button>
                      <button
                      className={`color-options lockButton ${isLocked ? 'lockedColor' : ''}`}
                      aria-label={isLocked ? 'Unlock color' : 'Lock color'}
                      onClick={() => onLock(id)} // Pass the unique ID up to the parent
                      >
                      {isLocked
                          ? <span className="material-symbols-rounded">lock</span>
                          : <span className="material-symbols-rounded">lock_open_right</span>
                      }
                      </button>
                      <button className='color-options' aria-label='show shades button'
                      onClick={()=>{setIsShadesOn(true)}}>
                          <span className="material-symbols-rounded">table_rows</span>
                      </button>
                    </span>
                </div>

                
        {/* } */}
        
    </div>
  );
}