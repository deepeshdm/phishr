
import React from 'react'
import SnackBar from '../SnackBar';
import { MdDelete } from 'react-icons/md'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Header } from '../header/Header';
import { useNavigate } from 'react-router';
import DeleteAccountDialogBox from './DeleteAccountDialogBox';
import { isPasswordCorrect, deleteUserAccount } from "../../db/db_utils"
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import InboxCleanUpGif from "../../assets/inbox_cleanup.svg"
import stringHash from 'string-hash';

const DeleteAccountMain = () => {

    const navigate = useNavigate();
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)
    const [password, setPasswordInput] = useState('')
    const [confirmPassword, setCPasswordInput] = useState('')
    const [confirmationText, setConfirmationText] = useState('')
    const [showPassword, setshowPassword] = useState(false);
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

    //---------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    // Event handler for Dialogbox, Delete the account of given user.
    async function deleteAccountHandler() {

        // Check for Null field values 
        if (!password || !confirmPassword) {
            setSnackbarState("Please fill all values !", "warning", true)
            return;
        }

        // Check if both password fields match
        if (password !== confirmPassword) {
            setSnackbarState("Passwords Don't Match !", "warning", true)
            return;
        }

        // Hash the input password
        const HashPassword = stringHash(password);

        // Check if given password matches account password
        const isValid = await isPasswordCorrect(savedEmail, HashPassword)
        if (!isValid) {
            setSnackbarState("Password is Incorrect !", "error", true)
            return;
        }

        // Show Confirmation Dialogbox
        setDeleteButtonClicked(true)

    }


    async function deleteAccount() {

        // Delete user account
        const isDeleted = await deleteUserAccount(savedEmail)

        if (isDeleted) {
            setDeleteButtonClicked(false)
            // Clear the cookies
            Cookies.remove('email')
            Cookies.remove('password')
            navigate("/login")
            return;
        } else {
            setDeleteButtonClicked(false)
            setSnackbarState("Account Deletion Failed !", "error", true)
            return;
        }
    }

    //---------------------------------------------------------------------------------

    return (
        <>
            <Header LoggedInUser={savedEmail} />
            <div className="bg-white min-h-screen flex flex-col pt-8 items-center">

                <p className="text-gray-800 font-bold max-sm:text-xl text-2xl mb-1 max-lg:mt-5"> Delete Account Permanently ! 🤯❌ </p>
                <p className="text-gray-800 text-center  max-sm:text-xs text-sm sm:text-base mx-5 min-[500px]:mx-14 lg:mx-44 min-[1100px]:mx-72">
                    Before proceeding, please ensure that you have exported or saved any important data that you wish to keep.
                    Deleting your account will also delete all data associated with it and it cannot be recovered.
                </p>

                <img src={InboxCleanUpGif} alt=" " width={300} height={300} />

                <div className='flex flex-col sm:flex-row items-center gap-x-10 gap-y-5'>

                    <div className="flex items-center  bg-gray-200 hover:bg-gray-300 rounded-md">
                        <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                        <input placeholder="Password" type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPasswordInput(String(e.target.value))} maxLength={64}
                            className="bg-transparent w-full pl-3 py-5 text-gray-800 focus:outline-none" />
                        {
                            showPassword ?
                                (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                                (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                        }
                    </div>

                    <div className="flex items-center  bg-gray-200 hover:bg-gray-300 rounded-md">
                        <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                        <input placeholder="Confirm Password" type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setCPasswordInput(String(e.target.value))} maxLength={64}
                            className="bg-transparent w-full pl-3 py-5 text-gray-800 focus:outline-none" />
                        {
                            showPassword ?
                                (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                                (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                        }
                    </div>

                </div>

                <div onClick={deleteAccountHandler}
                    className="flex items-end py-4 px-5 mt-6 mb-20 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 cursor-pointer select-none">
                    <span className='text-white text-base font-semibold'> DELETE ACCOUNT </span>
                    <span className="ml-3"> <MdDelete className='w-6 h-6 text-white' /> </span>
                </div>

            </div>


            {deleteButtonClicked &&
                <DeleteAccountDialogBox confirmationText={confirmationText} setDeleteButtonClicked={setDeleteButtonClicked}
                    deleteAccount={deleteAccount} setConfirmationText={setConfirmationText} />
            }

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    )

}


export default DeleteAccountMain;
