
import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import DragNDrop from './DragNDrop';
import Cookies from 'js-cookie';
import { reportBulkURLsToDatabase } from '../../db/db_utils';

const BulkURLreport = ({ setSnackbarState, setReportClicked, reportAnonymously }) => {

    const [bulkURLInput, setBulkURLInput] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');

    const handleRecaptchaChange = (value) => {
        setCaptchaVerified(true);
        console.log("Captcha is Verified !")
    }

    // Takes a text with either 'comma seperated' urls or only 'space seperated' urls
    // and returns an array of those urls inside the text.
    function extractURLs(text) {
        // Split the text by commas or spaces
        const urlList = text.split(/[, ]+/);
        // Filter out empty values and trim whitespace from URLs
        const urls = urlList
            .filter(url => url.trim() !== '')
            .map(url => url.trim());
        return urls;
    }

    //---------------------------------------------------------------------------------------

    //  Handle Bulk URLs reporting
    const reportBulkURL = async () => {

        setReportClicked(true)

        if (bulkURLInput.length < 5) {
            setReportClicked(false)
            setSnackbarState("Please enter valid URLs !", "warning", true)
            return;
        }

        if (captchaVerified == false) {
            setReportClicked(false)
            console.log("Captcha not verified !")
            setSnackbarState("Please Verify the CAPTCHA !", "warning", true)
            return;
        }

        let reportedBy = savedEmail;
        if (reportAnonymously) { reportedBy = "Anonymous" }

        // Extract URLs from text
        const Urls = extractURLs(bulkURLInput);
        console.log("Total Input URLS : ", Urls.length)
        console.log("Extracted URLS : ", Urls);

        const MAX_URLS = 1000;
        if (Urls.length > MAX_URLS) {
            // Show warning if Urls above limit
            setReportClicked(false)
            setSnackbarState("Max Input Limit is 1000 URLs ! Reduce No. of Urls", "warning", true)
            return;
        }

        const isReported = await reportBulkURLsToDatabase(Urls, "Other", reportedBy, additionalDetails);
        if (isReported) {
            setSnackbarState("URLs Reported Sucessfully !", "success", true)
        } else {
            setSnackbarState("Failed to Report URLs, try again !", "error", true)
        }

        console.log("Reporting single URL !")
        setReportClicked(false)

    }

    //---------------------------------------------------------------------------------------

    return (
        <>
            <div className="mt-3 mx-[30%] flex flex-col py-4 border-2 rounded-md border-slate-300">
                <>
                    <p className="ml-7"> The URLs : (Max 1000 Urls) </p>
                    <textarea onChange={(e) => setBulkURLInput(e.target.value)}
                        className="h-48 border border-gray-300 rounded-md px-4 py-2 mx-7 mt-3 mb-7" />
                </>
            </div>

            {/* <DragNDrop /> */}

            <div className="mt-6 mx-[30%] flex flex-col border-2 rounded-md border-slate-300">
                <p className="ml-7 mt-3"> Additional URL details (optional) :</p>
                <textarea maxLength={10000} onChange={(e) => setAdditionalDetails(e.target.value)}
                    className="h-48 border border-gray-300 rounded-md px-4 py-2 mx-7 mt-3 mb-7" />
            </div>

            <div className="flex justify-center mt-6">
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleRecaptchaChange} />
            </div>

            <div className="flex justify-center">
                <button onClick={reportBulkURL}
                    className="h-12 w-40 bg-red-600 text-white font-bold px-4 py-2 mt-6 mb-10 rounded-md 
          hover:bg-red-500 active:bg-red-400 disabled:cursor-not-allowed">
                    REPORT URL
                </button>
            </div>

        </>
    )
}


export default BulkURLreport;

