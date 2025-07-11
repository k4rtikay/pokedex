import { useSearchParams } from 'react-router-dom'
import './Auth.css'
import { motion } from 'framer-motion'

export default function Auth(){

    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode') ?? 'signin'

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
                        <label htmlFor="username">Username:</label>
                        <input id='username' name='username' type="text" placeholder='e.g, pokefan123'/>
                    </span>
                    {(mode==='signup')&&(
                        <span>
                        <label htmlFor="email">Email:</label>
                        <input id='email' name='email' type="text" placeholder='e.g, mymail@gmail.com' />
                        </span>
                    )}
                    <span>
                        <label htmlFor='password'>Password:</label>
                        <input id='password' name='password' type="password" placeholder='Enter password'/>
                    </span>
                    <button type='submit'>Enter<i className="fa-solid fa-caret-right"></i></button>
                </form>
            </div>
        </motion.div>
    )
}