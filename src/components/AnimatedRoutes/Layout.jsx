import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { usePokedex } from "../../Context/PokedexContext";
import './Layout.scss'

export default function Layout(){
    const {isSideMenuOpen, setIsSideMenuOpen} = usePokedex();

    return(
        <div className="app-layout">
        <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen}/>
        <main className="app-content">
            <Outlet/>
        </main>
        </div>
    )
}