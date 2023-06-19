import React from 'react';

export default function SignupDialogbox({ email, RegisterNewUser,  setSignUpClicked }) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-5 rounded-md shadow-lg max-[340px]:m-5 m-10 min-[500px]:m-7">
                    <p className="text-lg font-semibold mb-4"> Register Account for <span className="font-bold">"{email}"</span> ? 👤</p>

                    <div className="flex items-center bg-red-200 rounded-md px-5 py-3">
                        <p className="text-normal text-red-400 font-medium">⚠️WARNING : Given email address cannot be changed later !</p>
                    </div>

                    <div className="mt-7">
                        <button className="bg-sky-500 hover:bg-sky-600 text-white max-[400px]:text-sm max-[400px]:px-2 px-4 py-2 rounded-md mr-3"
                            onClick={RegisterNewUser}> CREATE ACCOUNT </button>
                        <button className="float-right bg-gray-300 hover:bg-gray-400 text-gray-800 max-[400px]:text-sm max-[400px]:px-2 px-4 py-2 rounded-md"
                            onClick={() =>  setSignUpClicked(false)}> CANCEL 
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
