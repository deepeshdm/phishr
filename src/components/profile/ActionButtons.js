import React, { useState } from 'react';
import { IoLogOut } from 'react-icons/io5';
import { FaKey } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const LogoutDialogBox = ({ setButtonActive }) => {

    const navigate = useNavigate();

    // Removes the cookies
    const clearSession = () => {
        Cookies.remove('email');
        Cookies.remove('password');
        setButtonActive(false);
        navigate("/")
    };

    return (
        <>
            <div
                onClick={() => setButtonActive(false)}
                className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="bg-white w-96 p-5 rounded-md shadow-lg">
                    <p className="text-lg font-semibold mb-4">Are you sure you want to logout ? 🙋‍♂️</p>
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-3"
                            onClick={clearSession}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                            onClick={() => setButtonActive(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const ActionButtons = () => {

    const navigate = useNavigate();
    const [buttonActive, setButtonActive] = useState(false);

    return (
        <>
            <div
                onClick={() => navigate("/change_password")}
                className="flex items-end justify-center py-4 px-5 mt-3 rounded-md bg-sky-500 hover:bg-sky-600 active:bg-sky-700 cursor-pointer select-none whitespace-nowrap"
            >
                <span className="text-white text-base font-semibold max-[400px]:text-sm">CHANGE PASSWORD</span>
                <span className="ml-3">
                    <FaKey className="max-[400px] max-[400px] w-6 h-6 text-white" />
                </span>
            </div>

            <div
                onClick={() => navigate("/delete_account")}
                className="flex items-end justify-center py-4 px-5 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 cursor-pointer select-none whitespace-nowrap"
            >
                <span className="text-white text-base font-semibold max-[400px]:text-sm">DELETE ACCOUNT</span>
                <span className="ml-3">
                    <MdDelete className="max-[400px] max-[400px] w-6 h-6 text-white" />
                </span>
            </div>

            <div
                onClick={() => setButtonActive(true)}
                className={`flex items-end justify-center py-4 px-5 rounded-md bg-indigo-500 hover:bg-indigo-600 ${buttonActive ? 'bg-red-700' : 'active:bg-indigo-700'
                    } cursor-pointer select-none whitespace-nowrap`}
            >
                <span className="text-white text-base font-semibold max-[400px]:text-sm">LOGOUT</span>
                <span className="ml-3">
                    <IoLogOut className="max-[400px] max-[400px] w-6 h-6 text-white" />
                </span>
            </div>

            {buttonActive && <LogoutDialogBox setButtonActive={setButtonActive} />}
        </>
    );
};

export default ActionButtons;
