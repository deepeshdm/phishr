

import React from 'react'
import SnackBar from '../SnackBar';
import { Header } from '../header/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaLock } from 'react-icons/fa'
import { isPasswordCorrect, changeUserPassword } from "../../db/db_utils";
import Cookies from 'js-cookie'
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import stringHash from 'string-hash';

export default function ChangePassword() {

    const navigate = useNavigate()
    const [OldPassword, setOldPassword] = useState()
    const [NewPassword, setNewPassword] = useState()
    const [ConfirmNewPassword, setConfirmNewPassword] = useState()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSeverity, setSnackSeverity] = useState('info')

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    useEffect(() => {
        if (savedEmail == null) {
            navigate('/');
        }
    }, []);

    //--------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    // Event handler, changes password account of given user.
    async function ChangePassword() {

        // Check for Null field values 
        if (!OldPassword || !ConfirmNewPassword || !NewPassword) {
            setSnackbarState("Please fill all values !", "warning", true)
            return;
        }

        // Check if both new password fields match
        if (NewPassword !== ConfirmNewPassword) {
            setSnackbarState("New Passwords Don't Match !", "warning", true)
            return;
        }

        // Check if given password matches account password
        const OldHashPassword = stringHash(OldPassword); // Hash Password
        const isValid = await isPasswordCorrect(savedEmail, OldHashPassword)
        if (!isValid) {
            setSnackbarState("Old Password is Incorrect !", "warning", true)
            return;
        }

        // Check if both new password fields match
        if (OldPassword == NewPassword) {
            setSnackbarState("New Password is same as Old Password !", "warning", true)
            return;
        }

        // Change the user password
        const NewHashPassword = stringHash(NewPassword); // Hash Password
        const isPassUpdated = await changeUserPassword(savedEmail, NewHashPassword);

        if (isPassUpdated) {
            setSnackbarState("Password Updated Sucessfully !", "success", true)
            setTimeout(() => {
                navigate("/home")
                return;
            }, 2000)
            return;
        } else {
            setSnackbarState("Password Updation Failed ! Try again later", "error", true)
            return;
        }

    }

    //-----------------------------------------------------------------------------------------

    return (
        <>
            <Header LoggedInUser={savedEmail} />

            <div className="bg-white min-h-screen pt-7 flex flex-col items-center">

                <FaLock className='text-black mb-3 max-[450px]:w-5 max-[450px]:h-5 w-7 h-7' />
                <p className='max-[450px]:text-xl text-2xl mb-8 font-semibold text-black'> Change Account Password </p>

                <div className="flex items-center  bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Enter Old Password" type={showOldPassword ? 'text' : 'password'}
                        onChange={(e) => setOldPassword(String(e.target.value))} maxLength={64}
                        className="bg-transparent max-[450px]:w-3/4 w-full pl-3 py-5 text-gray-800 font-medium focus:outline-none" />
                    {showOldPassword ?
                        (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowOldPassword(false)} />) :
                        (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowOldPassword(true)} />)
                    }
                </div>


                <div className="flex items-center  bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Enter New Password" type={showNewPassword ? 'text' : 'password'}
                        onChange={(e) => setNewPassword(String(e.target.value))} maxLength={64}
                        className="bg-transparent max-[450px]:w-3/4 w-full pl-3 py-5 text-gray-800 font-medium focus:outline-none" />
                    {showNewPassword ?
                        (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(false)} />) :
                        (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(true)} />)
                    }
                </div>


                <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Confirm New Password" type={showNewPassword ? 'text' : 'password'}
                        onChange={(e) => setConfirmNewPassword(String(e.target.value))} maxLength={64}
                        className="bg-transparent max-[450px]:w-3/4 w-full pl-3 py-5 text-gray-800 font-medium focus:outline-none" />
                    {showNewPassword ?
                        (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(false)} />) :
                        (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(true)} />)
                    }
                </div>


                <button onClick={ChangePassword}
                    className="bg-sky-500 text-white text-md font-bold max-[450px]:px-10 px-14 py-4 mt-3 rounded-md hover:bg-sky-600 active:bg-sky-700">
                    CHANGE PASSWORD </button>

            </div>

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={2000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    )
}