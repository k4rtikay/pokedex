import { useNavigate, useSearchParams } from 'react-router-dom'
import './Auth.css'
import { motion } from 'framer-motion'
import { useAuth } from '../../Context/AuthContext'
import { useState } from 'react'
import { auth } from '../../../firebase'

export default function Auth(){

    const navigate = useNavigate()

    function redirect(){
        setTimeout(() => {
            navigate('/home')
        }, 1000);
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
        <motion.div
        initial={{
            opacity: 0.3,
            filter: "blur(10px)"
        }}
        animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition:{
                type: 'spring',
                stiffness: 120,
                damping: 25
            }
        }
        }
        exit={{
            opacity: 0.3,
            filter: "blur(5px)",            
        }}
        >
            <div className="LoginContainer">
                <form action="" className="Loginform">
                <h1>{mode=='signup'? 'Register' : 'Sign in'}</h1>
                <h4>To save your favorite palettes and more!</h4>
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
        </motion.div>
    )
}