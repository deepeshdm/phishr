import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Header } from '../header/Header';
import { Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from 'react-router-dom';
import { isPasswordCorrect, userExists, getUserDocument } from '../../db/db_utils';
import SnackBar from '../SnackBar';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import AuthenticationGif from "../../assets/Authentication.gif"
import { GoogleLoginButton } from '../GoogleButtons';
import { auth, googleAuthProvider } from '../../db/firebase-config'
import { signInWithPopup } from 'firebase/auth';
const stringHash = require("string-hash");

const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmailInput] = useState('');
    const [password, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSeverity, setSnackSeverity] = useState('info')

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    useEffect(() => {
        if (savedEmail) {
            navigate('/');
        }
    }, []);


    //------------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    // Event handler for Login Button
    const loginHandler = async () => {

        setLoginClicked(true)

        // check if fields are null
        if (!email || !password) {
            setSnackbarState("Please fill all values !", "warning", true);
            setLoginClicked(false)
            return
        }

        // Verify if user account exists & match passwords
        const hashPassword = stringHash(password)
        const userValid = await isPasswordCorrect(email, hashPassword)

        if (userValid) {

            setSnackbarState("Account Verified !", "success", true)

            // save login info into cookies
            Cookies.set('email', email);
            Cookies.set('password', hashPassword);

            // redirect to /home after 100 milisecs
            setTimeout(() => {
                setLoginClicked(false)
                navigate('/home')
            }, 500)
            return
        }

        setLoginClicked(false)
        setSnackbarState("Email or Password Incorrect ! Try again", "error", true)
        return;

    }

    //-------------------------------------------------------------------------------------------------------

    // Handle Google SignIn button
    const handleSignInWithGoogle = async () => {
        try {
            // Sign in with Google provider
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            console.log('Signed in with Google:', user);

            // Access the user information from the result
            const name = user.displayName;
            const email = user.email;
            const phone = user.phoneNumber;

            const existsAlready = await userExists(email);
            if (!existsAlready) {
                setSnackbarState("Provided Email is Not Registered ! SignUp Now", "warning", true)
                return;
            } else {

                // Fetch User Document
                const userDoc = await getUserDocument(email);
                // save login info into cookies
                Cookies.set('email', userDoc.Email);
                Cookies.set('password', userDoc.Password);

                // Redirect to next page
                navigate("/")
            }

        } catch (error) {
            // Handle errors during sign-in
            console.error('Error signing in with Google:', error);
        }
    };

    //------------------------------------------------------------------------------------

    return (
        <>

            <Header LoggedInUser={savedEmail} />
            {loginClicked ? <LinearProgress color="error" /> : null}

            <div className="bg-transparent min-h-screen pt-6 flex flex-col items-center">

                <h1 className="text-gray-800 font-bold text-3xl text-center mb-2">
                    Account Login
                </h1>

                <img src={AuthenticationGif} alt="Phishing Gif"
                    className="w-[18%]" />

                <div className="w-3/4 max-w-md">
                    <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                        <input
                            placeholder="Registered Email Address"
                            type="text"
                            onChange={(e) => setEmailInput(e.target.value)}
                            maxLength={64}
                            className="bg-transparent w-full py-4 text-gray-900 font-medium focus:outline-none pl-4"
                        />
                    </div>
                </div>

                <div className="w-3/4 max-w-md">
                    <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md">
                        <input
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            maxLength={64}
                            className="bg-transparent w-full py-4 text-gray-900 font-medium focus:outline-none pl-4"
                        />
                        {showPassword ?
                            (<RiEyeOffLine className="mr-7 text-slate-500 h-5 w-5 cursor-pointer" onClick={() => setShowPassword(false)} />) :
                            (<RiEyeLine className="mr-7 text-slate-500 h-5 w-5 cursor-pointer" onClick={() => setShowPassword(true)} />)
                        }
                    </div>
                </div>

                <div className='flex flex-row gap-x-14 mt-3'>
                    <GoogleLoginButton handleClick={handleSignInWithGoogle} />
                    <button
                        onClick={loginHandler}
                        className="h-12 w-40 bg-[#4d41e3] text-white font-bold px-4 py-2 mt-6 rounded-md hover:bg-[#584fd8] active:bg-[#9c9bb3]">
                        LOGIN
                    </button>
                </div>

                <div className="mt-5">
                    <span className="text-gray-700 text-base font-medium">Don't have an account?</span>
                    <Link to="/signup" className="text-[#4d41e3] text-base font-bold underline cursor-pointer ml-2">
                        Create Account
                    </Link>
                </div>

            </div>
            <Footer />

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "right" }} />

        </>
    );
};

export default LoginPage;
