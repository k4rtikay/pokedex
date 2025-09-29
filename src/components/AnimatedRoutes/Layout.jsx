import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { usePokedex } from "../../Context/PokedexContext";
import HeaderDesktop from "../Header/HeaderDesktop";
import './Layout.scss'
import useTheme from "../../hooks/usePokemonTheme";

export default function Layout(){
    const {isSideMenuOpen, setIsSideMenuOpen, isDesktop, themeColor} = usePokedex();

    const themeStyles = useTheme(themeColor)

    return(
        <div className="app-layout" style={themeStyles}>
        {isDesktop? <HeaderDesktop/> : <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/>}
        <main className="app-content">
            <Outlet/>
        </main>
        </div>
    )
}