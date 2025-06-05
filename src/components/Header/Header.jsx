import './Header.css'

export function Header(){
    return(
        <div className="sideNavHeader">
                <h1>Pokédex</h1>
                <div className="sideNavHeader-buttons">
                    <button className="darkModeBtn"
                    onClick={()=>{
                        {document.querySelector('body').classList.toggle('darkmode')};
                    }}><i class="fa-regular fa-lightbulb"></i>
                    </button>
                    <button className="userButton">Login</button>
                </div>
        </div>
    )
}