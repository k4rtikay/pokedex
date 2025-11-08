import { useNavigate } from 'react-router-dom'
import './Auth.scss'
import './google-sign-in.css'
import { motion } from 'framer-motion'
import { useAuth } from '../../Context/AuthContext'
import { useState, useEffect } from 'react'
import { auth } from '../../../firebase'
import { Link } from 'react-router-dom'

export default function Auth({ onClose }){

    const navigate = useNavigate()
    const [isSignIn, setIsSignIn] = useState(true)
    const { googleSignIn, globalUser } = useAuth()

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
    const [isAuthenticating, setIsAuthenticating]= useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    // error message handler
    function getFirebaseErrorMessage(errorCode) {
        const errorMessages = {
            'auth/invalid-email': 'Invalid email address format.',
            'auth/user-disabled': 'This account has been disabled.',
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password.',
            'auth/email-already-in-use': 'An account with this email already exists.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/operation-not-allowed': 'Operation not allowed. Please contact support.',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
            'auth/invalid-credential': 'Invalid email or password.',
            'auth/missing-password': 'Please enter a password.',
            'auth/missing-email': 'Please enter an email address.',
            'auth/invalid-login-credentials': 'Invalid email or password.',
            'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
            'auth/cancelled-popup-request': 'Sign-in was cancelled.',
        };

        return errorMessages[errorCode] || 'An error occurred. Please try again.';
    }

    async function handleAuthenticate(email, password) {
        try {
            setIsSuccess(false)
            setIsAuthenticating(true)
            setError(null)
            
            if (isSignIn) {
                await login(auth, email, password)
                setIsSuccess(true)
            } else {
                await signup(auth, email, password, username)
                setIsSuccess(true)
            }        
        } catch (err) {
            console.error('Auth error:', err)
            
            // Extract error code from Firebase error
            const errorCode = err.code || err.message
            const userFriendlyMessage = getFirebaseErrorMessage(errorCode)
            setError(userFriendlyMessage)
        } finally {
            setIsAuthenticating(false)
        }
    }

    async function handleGoogleSignIn() {
        try {
            setError(null)
            setIsAuthenticating(true)
            await googleSignIn()
            setIsSuccess(true)
        } catch (err) {
            console.error('Google sign-in error:', err)
            const errorCode = err.code || err.message
            const userFriendlyMessage = getFirebaseErrorMessage(errorCode)
            setError(userFriendlyMessage)
        } finally {
            setIsAuthenticating(false)
        }
    }

    useEffect(() => {
        if (globalUser) {
            // Close modal on success
            if (onClose) {
                onClose()
            }
            // Navigate to app
            navigate('/app')
        }
    }, [globalUser, navigate, onClose])

    // Auto-clear success message
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess])

    return(
        <motion.div className="auth-container" layout
        transition = {{duration: 0.2, ease: [0.33, 1, 0.68, 1]}}
        >
            <form action="" className="auth-form">
                <h1>HueDex</h1>
                <div className="auth-mode--toggle">
                    <label style={{fontFamily: isSignIn&&'Pixelify Sans,Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                        <input 
                            type="radio" 
                            name='auth-mode' 
                            value={"signIn"}
                            onChange={()=>{setIsSignIn(true); setError(null)}}
                            checked={isSignIn}
                            disabled={isAuthenticating}
                        />
                        Sign In
                    </label>
                    <label style={{fontFamily: !isSignIn&&'Pixelify Sans,Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                        <input 
                            type="radio" 
                            name='auth-mode' 
                            value={"signUp"}
                            onChange={()=>{setIsSignIn(false); setError(null)}}
                            checked={!isSignIn}
                            disabled={isAuthenticating}
                        />
                        Sign Up
                    </label>
                    <motion.span 
                        className='auth-mode--indicator'
                        variants={variants}
                        initial={isSignIn?'signin':'signout'}
                        animate={isSignIn?'signin':'signout'}
                    />
                </div>

                <button 
                    className="gsi-material-button auth-OAuth"
                    type='button'
                    onClick={handleGoogleSignIn}
                    disabled={isAuthenticating}
                    style={{ opacity: isAuthenticating ? 0.6 : 1, cursor: isAuthenticating ? 'not-allowed' : 'pointer' }}
                >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents">
                            {isAuthenticating ? 'Signing in...' : 'Sign in with Google'}
                        </span>
                    </div>
                </button>

                <div className="auth-form--input">
                    <span>
                        <label htmlFor="email">
                            Email:
                            <input 
                                id='email' 
                                name='email' 
                                type="email" 
                                placeholder='e.g, mymail@gmail.com' 
                                onChange={(e)=>{ setEmail(e.target.value) }}
                                disabled={isAuthenticating}
                            />
                        </label>
                    </span>
                    {(!isSignIn)&&(
                        <span>
                            <label htmlFor="username">
                                Username:
                                <input 
                                    id='username' 
                                    name='username' 
                                    type="text" 
                                    placeholder='e.g, pokefan123' 
                                    onChange={(e)=>{ setUsername(e.target.value) }}
                                    disabled={isAuthenticating}
                                />
                            </label>
                        </span>
                    )}
                    <span>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            id='password' 
                            name='password' 
                            type="password" 
                            placeholder='Enter password' 
                            onChange={(e)=>{ setPassword(e.target.value) }}
                            disabled={isAuthenticating}
                        />
                    </span>
                </div>
                
                <button 
                    type='submit'
                    onClick={(e)=>{
                        e.preventDefault()
                        if (!isAuthenticating) {
                            handleAuthenticate(email, password, username)
                        }
                    }}
                    disabled={isAuthenticating}
                    style={{ opacity: isAuthenticating ? 0.6 : 1, cursor: isAuthenticating ? 'not-allowed' : 'pointer' }}
                >
                    {isAuthenticating ? '...' : (isSignIn ? 'Login' : 'Register')}
                </button>
                
                {error && (<p className='error'>{error}</p>)}
                {isSuccess && <p className='success'>Success! Redirecting...</p>}

                <footer>Don't wanna sign in? Continue as <Link to={'/app'}>GUEST</Link></footer>
            </form>
        </motion.div>
    )
}