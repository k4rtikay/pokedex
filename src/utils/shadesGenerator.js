import tinycolor from "tinycolor2";

export default function shadesGenerator(inputColor, num) {
  const baseColor = tinycolor(inputColor);
  const { h, s, l } = baseColor.toHsl();
  const totalShades = num;

  const originalIndex = Math.round((1 - l) * (totalShades - 1));

  const shadesArray = [];

  for (let i = 0; i < totalShades; i++) {
    // If we are at the original color's index, push the real color.
    if (i === originalIndex) {
      shadesArray.push({
        color: baseColor.toRgbString(),
        isOriginal: true,
      });
    } else {
      // Otherwise, push the calculated gradient shade.
      const lightness = 1 - i / (totalShades - 1);
      const newHslColor = { h, s, l: lightness };
      shadesArray.push({
        color: tinycolor(newHslColor).toRgbString(),
        isOriginal: false,
      });
    }
  }

  return shadesArray;
}
