import './PaletteBar.css'
import { colorForIntensity } from '../../utils';

export function PaletteBar({ colorObject, onLock, onCopy }) {
  const { color, isLocked, id } = colorObject;
  const rgbString = `rgb(${color.join(', ')})`;

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
      </div>
    </div>
  );
}