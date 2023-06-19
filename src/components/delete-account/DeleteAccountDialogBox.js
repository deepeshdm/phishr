import React from 'react';

export default function DeleteAccountDialogBox({ setConfirmationText, setDeleteButtonClicked, confirmationText, deleteAccount }) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-5 rounded-md shadow-lg max-[340px] m-5 min-[340px] m-7 min-[450px] m-16 min-[550px] m-20 sm:max-md m-36 md:m-48 min-[800px] m-56 min-[900px] m-64 lg:m-72 min-[1200px] m-96">
                    <p className="max-[400px] text-base text-lg font-semibold mb-4"> Permanently Delete your Account ?! 🤯 </p>

                    <div className="mb-4">
                        <label className="block max-[400px] text-base text-sm text-slate-600 font-bold mb-2"> Enter "DELETEMYACCOUNT" to Confirm Deletion </label>
                        <div className="flex items-center bg-neutral-300 hover:bg-neutral-200 rounded-md">
                            <input
                                placeholder="DELETEMYACCOUNT"
                                onChange={(e) => setConfirmationText(String(e.target.value))}
                                maxLength={15}
                                className="bg-transparent pl-3 py-5 text-black focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-7">
                        <button
                            disabled={confirmationText !== "DELETEMYACCOUNT"}
                            className="bg-red-500 hover:bg-red-600 text-white max-[400px] text-sm max-[400px] px-4 py-4 rounded-md mr-3 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={deleteAccount}
                        >
                            DELETE NOW
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 max-[400px] text-sm max-[400px] px-4 py-4 rounded-md float-right"
                            onClick={() => setDeleteButtonClicked(false)}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
