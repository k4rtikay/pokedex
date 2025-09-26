import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { usePokedex } from "../../Context/PokedexContext";
import HeaderDesktop from "../Header/HeaderDesktop";
import './Layout.scss'

export default function Layout(){
    const {isSideMenuOpen, setIsSideMenuOpen, isDesktop} = usePokedex();

    return(
        <div className="app-layout">
        {isDesktop? <HeaderDesktop/> : <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/>}
        <main className="app-content">
            <Outlet/>
        </main>
        </div>
    )
}