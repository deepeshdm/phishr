
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import ReCAPTCHA from "react-google-recaptcha";
import { reportURLtoDatabase } from '../../db/db_utils';

const SingleURLreport = ({ setSnackbarState, setReportClicked, reportAnonymously }) => {

    const [singleURLInput, setSingleURLInput] = useState("");
    const [urlSource, setUrlSource] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');

    const handleRecaptchaChange = (value) => {
        setCaptchaVerified(true);
        console.log("Captcha is Verified !")
    }

    //---------------------------------------------------------------------------------------

    //  Handle single URL reporting
    const reportSingleURL = async () => {

        setReportClicked(true)

        if (singleURLInput.length < 5 || selectedCategory == "") {
            setReportClicked(false)
            setSnackbarState("Please enter a valid URL and select Category !", "warning", true)
            return;
        }

        if (captchaVerified == false) {
            setReportClicked(false)
            console.log("Captcha not verified !")
            setSnackbarState("Please Verify the CAPTCHA !", "warning", true)
            return;
        }

        // Save Reported URL to Database
        let reportedBy = savedEmail;
        if (reportAnonymously) { reportedBy = "Anonymous" }
        const isReported = await reportURLtoDatabase(singleURLInput, selectedCategory, reportedBy, urlSource ,additionalDetails);

        if (isReported) {
            setSnackbarState("URL Reported Sucessfully !", "success", true)
        } else {
            setSnackbarState("Failed to Report URL, try again !", "error", true)
        }

        console.log("Reporting single URL !")
        setReportClicked(false)

    }

    //---------------------------------------------------------------------------------------

    return (
        <>
            <div className="mt-3 mx-[30%] flex flex-col py-7 border-2 rounded-md border-slate-300">
                <div className='flex flex-row'>
                    <input type="text" placeholder="Enter URL of the site" value={singleURLInput} onChange={(e) => setSingleURLInput(e.target.value)}
                        className="w-2/3 text-start border border-slate-300 rounded-md px-3 py-2 ml-6" />
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-slate-300 rounded-md px-6 py-2 ml-8 mr-7">
                        <option value="" disabled defaultValue>Select category</option>
                        <option value="phishing">Phishing</option>
                        <option value="malware">Malware</option>
                        <option value="spam">Spam</option>
                        <option value="fraud">Fraud</option>
                        <option value="hate-speech">Hate Speech</option>
                        <option value="scam">Scam</option>
                        <option value="scam">Other</option>
                    </select>
                </div>
                <input type="text" placeholder="Source of URL (optional)" value={urlSource} onChange={(e) => setUrlSource(e.target.value)}
                    className=" text-start border border-slate-300 rounded-md mt-5 px-3 py-2 ml-6 mr-7" />
            </div>

            <div className="mt-6 mx-[30%] flex flex-col border-2 rounded-md border-slate-300">
                <p className="ml-7 mt-3"> Additional URL details (optional) :</p>
                <textarea maxLength={10000} onChange={(e) => setAdditionalDetails(e.target.value)}
                    className="h-48 border border-gray-300 rounded-md px-4 py-2 mx-7 mt-3 mb-7" />
            </div>

            <div className="flex justify-center mt-6">
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleRecaptchaChange} />
            </div>

            <div className="flex justify-center">
                <button onClick={reportSingleURL}
                    className="h-12 w-40 bg-red-600 text-white font-bold px-4 py-2 mt-6 mb-10 rounded-md 
          hover:bg-red-500 active:bg-red-400 disabled:cursor-not-allowed">
                    REPORT URL
                </button>
            </div>
        </>
    )
}


export default SingleURLreport;
