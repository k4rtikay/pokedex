import tinycolor from "tinycolor2";

const useShadesGenerator = (inputColor, num) => {
  const baseColor = tinycolor(inputColor)
  const { h, s, l } = baseColor.toHsl()
  const totalShades = num
  const shadesArray = []

  //Generate the full gradient
  for (let i = 0; i < totalShades; i++) {
    const lightness = 1 - (i / (totalShades - 1))
    const newHslColor = { h, s, l: lightness }
    shadesArray.push({
      color: tinycolor(newHslColor).toRgbString(),
      isOriginal: false
    })
  }

  
  let closestIndex = 0;
  let minDiff = 1;
  for (let i = 0; i < shadesArray.length; i++) {
    const currentLightness = 1 - (i / (totalShades - 1))
    const diff = Math.abs(currentLightness - l)
    if (diff < minDiff) {
      minDiff = diff
      closestIndex = i
    }
  }

  //Replace the closest approximation with the true original color
  shadesArray[closestIndex] = {
    color: baseColor.toRgbString(),
    isOriginal: true
  }

  return shadesArray
}

export default useShadesGenerator