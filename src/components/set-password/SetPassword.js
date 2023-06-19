import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../header/Header';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';
import SnackBar from '../SnackBar';
import { registerUser } from '../../db/db_utils';
import SignUpGif from "../../assets/SignUp.gif"
import stringHash from 'string-hash';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const SetPasswordPage = () => {

    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const location = useLocation();
    const [snackSeverity, setSnackSeverity] = useState('info')

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');

    useEffect(() => {

        // If user already loggedIn, redirect to Home
        if (savedEmail) {
            console.log("User Already LoggedIn !")
            navigate('/');
        }

        // If no data has been passed, redirect.
        if (location.state == null) {
            console.log("No data passed !")
            navigate("/")
        }

    }, []);

    //---------------------------------------------------------------

    const handlePasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }

    const handleSignup = () => {

        if (!password || !confirmPassword) {
            setSnackbarState("Please fill all values !", "warning", true)
            return;
        }

        // Check if both password fields match
        if (password !== confirmPassword) {
            setSnackbarState("Passwords Don't Match !", "error", true)
            return;
        }

        if (password.length < 8 || confirmPassword.length < 8) {
            setSnackbarState("Given Password is too short !", "warning", true)
            return;
        }

        // Register new user in database
        const { name, email, phone } = location.state;
        const AccountCreated = registerUser(name, '', phone, email, password);
        if (AccountCreated) {

            setSnackbarState("Account Created ! Login Now", "success", true);

            // save login info into cookies
            const hashPassword = stringHash(password);
            Cookies.set('email', email);
            Cookies.set('password', hashPassword);

            // redirect after 3 sec
            setTimeout(() => {
                navigate('/home')
            }, 1500)
        }

    };

    return (
        <>
            <Header />
            <div className="bg-white min-h-screen pt-10 flex flex-col items-center">

                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl text-center mb-5">
                    Finish Account Registration
                </h1>

                <img src={SignUpGif} className="w-[22%]" />

                <div className="grid grid-cols-2 gap-x-10 w-4/5 max-w-2xl">
                    <div>
                        {/* Password */}
                        <label className="text-gray-900 text-sm mb-2">Password</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                            <button
                                className="mr-7 text-slate-500 h-5 w-5 cursor-pointer"
                                onClick={handlePasswordToggle}>
                                {showPassword ? (
                                    <RiEyeOffLine />
                                ) : (
                                    <RiEyeLine />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        {/* Confirm Password */}
                        <label className="text-gray-900 text-sm mb-2">Confirm Password</label>
                        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                            <input
                                placeholder="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                maxLength={64}
                                className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                            />
                            <button
                                className="mr-7 text-slate-500 h-5 w-5 cursor-pointer"
                                onClick={handlePasswordToggle}>
                                {showPassword ? (
                                    <RiEyeOffLine />
                                ) : (
                                    <RiEyeLine />
                                )}
                            </button>
                        </div>
                    </div>

                </div>

                <button
                    onClick={handleSignup}
                    className="h-14 max-h-14 w-40 px-10 py-4 mt-3 bg-[#4d41e3] text-white font-bold rounded-md hover:bg-[#584fd8] active:bg-[#9c9bb3]"
                >
                    REGISTER
                </button>

            </div>

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={3000} position={{ vertical: "top", horizontal: "right" }} />

        </>
    );
};

export default SetPasswordPage;
