import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import SnackBar from '../SnackBar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import LinearProgress from "@mui/material/LinearProgress";
import { registerUser, userExists } from '../../db/db_utils'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import SignupDialogbox from './SignupDialogbox';
import { GoogleSignUpButton } from '../GoogleButtons';
import { auth, googleAuthProvider } from '../../db/firebase-config'
import { signInWithPopup } from 'firebase/auth';

const SignupPage = () => {

    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
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

    //-------------------------------------------------------------------------------------------------------


    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }

    // Event handler for Signup Confirm Button in Dialogbox
    const RegisterNewUser = async () => {

        setSignUpClicked(true)
        // Register new user in database
        const AccountCreated = await registerUser(firstname, lastname, phone, email, password);

        if (AccountCreated) {
            setSnackbarState("Account Created ! Login Now", "success", true);
            // redirect to login after 3 sec
            setTimeout(() => {
                setSignUpClicked(false)
                navigate('/login')
            }, 2500)
        }

        setSignUpClicked(false)
    }


    // Event handler for Signup button
    const SignupHandler = async () => {

        // Check for Null field values (SocialMedia Link field is optional)
        if (!firstname || !lastname || !email || !phone || !password || !confirmPassword) {
            setSnackbarState("Please fill all values !", "warning", true)
            return;
        }

        if (phone.length > 12) {
            setSnackbarState("Phone number should not exceed 12 numbers !", "error", true)
            return;
        }

        if (email.length < 8) {
            setSnackbarState("Email should be greater than 8 characters !", "warning", true)
            return;
        }

        if (password.length < 8) {
            setSnackbarState("Password is too short !", "warning", true)
            return;
        }


        // Check if both password fields match
        if (password !== confirmPassword) {
            setSnackbarState("Passwords Don't Match !", "error", true)
            return;
        }

        // check if email is registered or not
        const emailAlreadyRegistered = await userExists(email)
        if (emailAlreadyRegistered === true) {
            setSnackbarState("Provided Email Address is Already Registered !", "warning", true)
            return;
        }

        // Show confirmation dialogbox
        setSignUpClicked(true)

    }

    //-------------------------------------------------------------------------------------------------------

    // Handle Google SignUp button
    const handleSignUpWithGoogle = async () => {
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
            if (existsAlready) {
                setSnackbarState("Provided Email is Already Registered ! Login Now", "warning", true)
                return;
            } else {
                // Redirect to next page and also pass user data
                navigate("/signup/set_password", { state: { name, email, phone } })
            }



        } catch (error) {
            // Handle errors during sign-in
            console.error('Error signing in with Google:', error);
        }
    };

    //-------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header LoggedInUser={savedEmail} />
            {signUpClicked ? <LinearProgress color="error" /> : null}
            <div className="bg-white min-h-screen pt-10 flex flex-col items-center">
                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl text-center mb-5">
                    Register Account
                </h1>

                <div className="grid grid-cols-2 gap-x-10 w-4/5 max-w-2xl">
                    <div>
                        <label className="text-gray-900 text-sm mb-2">Name</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Name"
                                type="text"
                                onChange={(e) => setFirstname(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-900 text-sm mb-2">Lastname</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Lastname"
                                type="text"
                                onChange={(e) => setLastname(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-900 text-sm mb-2">Email Address</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Email Address"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-900 text-sm mb-2">Phone Number</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Phone Number"
                                type="number"
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={12}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-900 text-sm mb-2">Password</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                            {showPassword ?
                                (<RiEyeOffLine className="mr-7 text-slate-500 h-5 w-5 cursor-pointer" onClick={() => setShowPassword(false)} />) :
                                (<RiEyeLine className="mr-7 text-slate-500 h-5 w-5 cursor-pointer" onClick={() => setShowPassword(true)} />)
                            }
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-900 text-sm mb-2">Confirm Password</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                            {showPassword ?
                                (<RiEyeOffLine className="mr-7 text-slate-500 h-5 w-5 cursor-pointer" onClick={() => setShowPassword(false)} />) :
                                (<RiEyeLine className="mr-7 text-slate-500 h-5 w-5 cursor-pointer" onClick={() => setShowPassword(true)} />)
                            }
                        </div>
                    </div>
                </div>



                <button
                    onClick={SignupHandler}
                    className="h-14 max-h-14 w-40 px-10 py-4 mt-3 bg-[#4d41e3] text-white font-bold rounded-md hover:bg-[#584fd8] active:bg-[#9c9bb3]">
                    SIGNUP
                </button>

                <GoogleSignUpButton handleClick={handleSignUpWithGoogle} />

                <div className="mt-5">
                    <span className="text-gray-700 text-base font-medium">Already have an account?</span>
                    <Link to="/login" className="text-[#4d41e3] text-base font-bold underline cursor-pointer ml-2">
                        Login Now
                    </Link>
                </div>
            </div>
            <Footer />

            {/* Show DialogBox when SignUp Button Clicked */}
            {signUpClicked &&
                <SignupDialogbox email={email} RegisterNewUser={RegisterNewUser}
                    setSignUpClicked={setSignUpClicked} />
            }

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={3000} position={{ vertical: "top", horizontal: "right" }} />

        </>
    );
};


export default SignupPage;
