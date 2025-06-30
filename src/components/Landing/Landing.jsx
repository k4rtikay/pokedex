import './Landing.css'

export function Landing(){
    return(
        <div className="landingPageContent">
            <div className="mainLandingContent">
                <h1>PokéBook</h1>
                <ul>
                    <li>-Get <span>Pokédex</span> data</li>
                    <li>-Get the <span>color palette</span> from your favorite pocket monsters</li>
                    <li>-<span>Build a team</span> around your favorite mons.</li>
                </ul>
                <button className="loginOptions" style={{backgroundColor:'var(--button-secondary-bg)'}}>Sign in</button>
                <button className="loginOptions" style={{backgroundColor:'var(--button-secondary-bg)'}}>Sign in</button>
                <button className="loginOptions" style={{backgroundColor:'var(--button-primary-bg)'}}>Guest &gt;&gt;</button>
                <p>Not a registered user? <u>Sign Up</u>!</p>
            </div>
            <footer>Made with ❤️ by <a href="https://github.com/k4rtikay" class="underline">Kartik</a></footer>
        </div>
    )
}