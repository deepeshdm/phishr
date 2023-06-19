import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import SnackBar from '../SnackBar';
import Cookies from 'js-cookie';
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { updateUserFields, getUserDocument } from '../../db/db_utils';
import UserFields from './UserFields';
import ActionButtons from './ActionButtons';

const Profile = () => {

    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [disableUpdateButton, setDisableUpdateButton] = useState(true)
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSeverity, setSnackSeverity] = useState('info')

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    useEffect(async () => {

        if (savedEmail == null) {
            // If user not already loggedIn, redirect to Home page
            navigate('/');
            return;
        } else {

            console.log("Fetching User Data !")
            // Fetch user data from database and update profile fields
            const userDoc = await getUserDocument(savedEmail);
            console.log("DATA : ", userDoc)
            if (userDoc != null) {
                setFirstname(userDoc.Firstname);
                setLastname(userDoc.Lastname);
                setPhone(userDoc.Phone);
                setEmail(userDoc.Email);
            }

        }

    }, []);

    //-------------------------------------------------------------------------------------------------------


    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }

    // Collection of state methods
    const handleInputChange = (event, field) => {
        switch (field) {
            case 'firstname':
                setFirstname(event.target.value)
                break
            case 'lastname':
                setLastname(event.target.value)
                break
            case 'phone':
                setPhone(event.target.value)
                break
            default:
                break
        }

        // Enable Button since Input has changed, allow user to update data.
        setDisableUpdateButton(false)
    }


    // Update Button handler, Updates current fields in database
    const UpdateInputFields = async () => {

        if(phone.length > 12){
            setSnackbarState("Phone number should not exceed 12 numbers !", "error", true)
            return;
        }

        const fieldsToUpdate = {
            Firstname: firstname,
            Lastname: lastname,
            Phone: phone
        }

        const isUpdated = await updateUserFields(savedEmail, fieldsToUpdate)
        if (isUpdated) {
            setSnackbarState("Fields Updated Successfully !", "success", true)
            setDisableUpdateButton(true)
        } else {
            setSnackbarState("Fields Updation Failed !", "error", true)
        }
    }

    //-------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header LoggedInUser={savedEmail} />
            <div className="bg-white min-h-screen pt-10 flex flex-col items-center">
            <FaUser className='text-black mb-3 max-[450px]:w-5 max-[450px]:h-5 w-7 h-7' />
                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl text-center mb-5">
                    Account Details
                </h1>

                <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-4/5 max-w-2xl">
                    <UserFields Firstname={firstname} Lastname={lastname} Phone={phone} Email={email} OnChangeHandler={handleInputChange} />

                    <button disabled={disableUpdateButton} onClick={UpdateInputFields}
                        className="bg-sky-500 text-white font-bold px-14 py-4 mt-3 rounded-md hover:bg-sky-600 active:bg-sky-700 
                       disabled:opacity-60 disabled:cursor-not-allowed">
                        UPDATE
                    </button>

                    <ActionButtons />

                </div>
            </div>
            <Footer />

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={3000} position={{ vertical: "top", horizontal: "right" }} />

        </>
    );
};


export default Profile;
