import tinycolor from 'tinycolor2'

export const first151Pokemon = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise",
    "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
    "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash",
    "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix",
    "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect",
    "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape",
    "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke",
    "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem",
    "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio",
    "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
    "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee",
    "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
    "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz",
    "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon",
    "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
    "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
]


export const pokemonTypeColors = {
    normal: {
        color: "#fdf9f9ff",
        background: "#A8A77A"
    },
    fire: {
        color: "#FFFFFF",
        background: "#EE8130"
    },
    water: {
        color: "#FFFFFF",
        background: "#6390F0"
    },
    electric: {
        color: "#000000",
        background: "#F7D02C"
    },
    grass: {
        color: "#FFFFFF",
        background: "#7AC74C"
    },
    ice: {
        color: "#000000",
        background: "#96D9D6"
    },
    fighting: {
        color: "#FFFFFF",
        background: "#C22E28"
    },
    poison: {
        color: "#FFFFFF",
        background: "#A33EA1"
    },
    ground: {
        color: "#FFFFFF",
        background: "#E2BF65"
    },
    flying: {
        color: "#000000",
        background: "#A98FF3"
    },
    psychic: {
        color: "#FFFFFF",
        background: "#F95587"
    },
    bug: {
        color: "#000000",
        background: "#A6B91A"
    },
    rock: {
        color: "#FFFFFF",
        background: "#B6A136"
    },
    ghost: {
        color: "#FFFFFF",
        background: "#735797"
    },
    dragon: {
        color: "#FFFFFF",
        background: "#6F35FC"
    },
    dark: {
        color: "#FFFFFF",
        background: "#705746"
    },
    steel: {
        color: "#000000",
        background: "#B7B7CE"
    },
    fairy: {
        color: "#000000",
        background: "#D685AD"
    }
}


export function getPokedexNumber(index) {
    return index + 1
}

export function getFullPokedexNumber(index) {
    return `${index + 1 > 99 ? index + 1 : index + 1 > 9 ? `0${index + 1}` : `00${index + 1}`}`
}

export function colorForIntensity(red,green,blue){
    const intensity = red*0.299 + green*0.587 + blue*0.114;

    if(intensity>186){
        return '#000000'
    }else{
        return '#ffffff'
    }
}

export function randomPokemonNumber(){
    return Math.floor(Math.random()*649)
}

export function formatPokemonName(name){
    const exceptionMap = {
        'nidoran-f': 'Nidoran ♀',
        'nidoran-m': 'Nidoran ♂',
        'porygon-z': 'Porygon-Z',
        'ho-oh': 'Ho-Oh',
        'basculin-red-striped': 'Basculin',
        'mr-mime': 'Mr. Mime',
        'deoxys-normal' : 'Deoxys',
        'wormadam-plant' : 'Wormadam',
        'landorus-incarnate' : 'Landorus',
        'thundurus-incarnate' : 'Thundurus',
        'tornadus-incarnate' : 'Tornadus',
        'meloetta-aria' : 'Meloetta',
        'keldeo-ordinary' : 'Keldeo',
        'mime-jr' : 'Mime Jr.',
        'giratina-altered' : 'Giratina',
        'darmanitan-standard' : 'Darmanitan',    
    }

    if(exceptionMap[name]){
        return exceptionMap[name]
    }else{
        let formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, char=>char.toUpperCase())

        return formattedName
    }
}

export const handleDownload = (code, name) =>{
    const blob = new Blob([code], {type: 'text/x-scss'})

    //create temp. URL
    const url = URL.createObjectURL(blob)

    //fire a click on download link then cleanup
    const link = document.createElement('a')
    link.href = url
    link.download = name + '.scss'
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

export const handleCodeFormatting = (colorArray) =>{
    const hexLinesCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        // console.log(tinyColorInstance)
                        return `--color${colorId+1} : ${tinyColorInstance.toHexString()};`
    }).join('\n')

    const hslLinesCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        return `--color${colorId+1} : ${tinyColorInstance.toHslString()};`
    }).join('\n')

    const hexLinesSCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        return `$color${colorId+1} : ${tinyColorInstance.toHexString()};`
    }).join('\n')

    const hslLinesSCSS = colorArray.map((color, colorId)=>{
                        const tinyColorInstance = color ? tinycolor({ r: color[0], g: color[1], b: color[2] }) : tinycolor('grey')
                        return `$color${colorId+1} : ${tinyColorInstance.toHslString()};`
    }).join('\n')

    const cssHexString =`/* CSS HEX */\n${hexLinesCSS}\n`

    const cssHslString =`/* CSS HSL */\n${hslLinesCSS}\n`

    const scssHexString =`/* SCSS HEX */\n${hexLinesSCSS}\n`

    const scssHslString =`/* SCSS HSL */\n${hslLinesSCSS}\n`

    const fullCodeString = cssHexString + '\n' + cssHslString + '\n' + scssHexString + '\n' + scssHslString

    return fullCodeString
}