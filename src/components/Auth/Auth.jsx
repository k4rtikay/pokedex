import { useNavigate, useSearchParams } from 'react-router-dom'
import './Auth.scss'
import { motion } from 'framer-motion'
import { useAuth } from '../../Context/AuthContext'
import { useState } from 'react'
import { auth } from '../../../firebase'

export default function Auth(){

    const navigate = useNavigate()
    const [isSignIn, setIsSignIn] = useState(true)

    function redirect(){
        setTimeout(() => {
            navigate('/app')
        }, 1000);
    }

    const variants = {
        signin:{
            x: '0%',
            transition: {duration: 0.3, ease: [0.68, -0.6, 0.32, 1.35]}
        },
        signout:{
            x: '100%',
            transition: {duration: 0.3, ease: [0.68, -0.6, 0.32, 1.35]}
        }
    }


    const { login, signup } = useAuth();
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode') ?? 'signin'
    const [isAuthenticating, setIsAuthenticating]= useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    async function handleAuthenticate(email,password) {
        try{
            setIsSuccess(false)
            setIsAuthenticating(true)
            setError(null)
            if(mode=='signin'){
                await login(auth,email, password)
                redirect()
                setIsSuccess(true)
            }
            else{
                await signup(auth,email, password, username)
                redirect()
                setIsSuccess(true)
            }        
        }catch(err){
            console.error(err.message)
            setError(err.message)
        }finally{
            setIsAuthenticating(false)
        }
    }

    return(
        <div className="auth-container">
            <form action="" className="auth-form">
            {/* <h1>{mode=='signup'? 'Register' : 'Sign in'}</h1> */}
            <h1>Pokebook</h1>
            <div className="auth-mode--toggle">
                <label style={{fontFamily: isSignIn&&'Pixelify Sans,Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                    <input type="radio" name='auth-mode' value={"signIn"}
                    onChange={()=>{setIsSignIn(true)}}
                    checked={isSignIn}></input>
                Sign In</label>
                <label style={{fontFamily: !isSignIn&&'Pixelify Sans,Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                    <input type="radio" name='auth-mode' value={"signUp"}
                    onChange={()=>{setIsSignIn(false)}}
                    checked={!isSignIn}></input>
                Sign Up</label>
                <motion.span 
                className='auth-mode--indicator'
                variants={variants}
                initial={isSignIn?'signin':'signout'}
                animate={isSignIn?'signin':'signout'}></motion.span>
            </div>
                <span>
                    <label htmlFor="email">Email:</label>
                    <input id='email' name='email' type="text" placeholder='e.g, mymail@gmail.com' onChange={(e)=>{{
                        setEmail(e.target.value)
                    }}} />
                </span>
                {(mode==='signup')&&(
                    <span>
                    <label htmlFor="username">Username:</label>
                    <input id='username' name='username' type="text" placeholder='e.g, pokefan123' onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>                            
                    </span>
                )}
                <span>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type="password" placeholder='Enter password' onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                </span>
                <button type='submit'
                onClick={(e)=>{
                    e.preventDefault()
                    !isAuthenticating&&handleAuthenticate(email,password,username)
                }}>Enter<i className="fa-solid fa-caret-right"></i></button>
                {error && (<p className='error'>{error}</p>)}
                { isSuccess && <p>Success!</p>} 
            </form>
        </div>
    )
}