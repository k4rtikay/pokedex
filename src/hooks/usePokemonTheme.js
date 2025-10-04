import tinycolor from "tinycolor2";
import { useEffect, useState } from 'react';

export default function useTheme(domColor){
    const [themeStyles, setThemeStyles] = useState({})

    useEffect(()=>{
        if(domColor) {
            const color = tinycolor(domColor)
            setThemeStyles({
                '--accent-dark': color.darken(30).toString(),
                '--accent-light': color.lighten(70).toString(),
            })
        }
    },[domColor])

    // console.log(themeStyles)

    return themeStyles
}
