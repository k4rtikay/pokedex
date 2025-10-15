import tinycolor from "tinycolor2";
import { useEffect, useState } from 'react';
import { usePokedex } from "../Context/PokedexContext";

export default function useTheme(domColor){
    const [themeStyles, setThemeStyles] = useState({})
    const { isDarkMode } = usePokedex()

    useEffect(()=>{
        if(domColor) {
            const color = tinycolor(domColor)

            const val1 = isDarkMode ? 30 : 25
            const val2 = isDarkMode ? 35 : 70

            const darkShade = color.clone().darken(val1).toString();
            const lightShade = color.clone().lighten(val2).toString();

            setThemeStyles({
                '--accent-dark': isDarkMode ? lightShade : darkShade,
                '--accent-light': isDarkMode ? darkShade : lightShade,
            });
        }
    },[domColor, isDarkMode])

    // console.log(themeStyles)

    return themeStyles
}
