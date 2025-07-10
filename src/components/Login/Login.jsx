import './Login.css'

export default function Login(){
    return(
        <div className="LoginContainer">
            <form action="" className="Loginform">
            <h1>Sign In</h1>
            <h4>To save your favorite palettes and more!</h4>
                <span>
                    <label htmlFor="username">Username:</label>
                    <input id='username' name='username' type="text" placeholder='e.g, pokefan123'/>
                </span>
                <span>
                    <label htmlFor="email">Email:</label>
                    <input id='email' name='email' type="text" placeholder='e.g, mymail@gmail.com' />
                </span>
                <span>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type="password" placeholder='Enter password'/>
                </span>
                <button type='submit'>Enter<i className="fa-solid fa-caret-right"></i></button>
            </form>
        </div>
    )
}