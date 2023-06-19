
import React, { useState } from 'react'
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import Cookies from 'js-cookie';
import SnackBar from '../SnackBar';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
const axios = require("axios");


function TypoSquatGenerator() {

    const [input_Url, setUrl] = useState("");
    const [output, setOutput] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSeverity, setSnackSeverity] = useState('info')

    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');

    // set snackbar state
    function setSnackbarState(message, severity, open) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }

    //--------------------------------------------------------------------------------------

    // Fetches Domain Details from API
    async function requestDomainDetails(input_Url) {

        setShowProgress(true); // Make progressbar visible

        const MAX_DOMAINS = 50; // Number of registered domains to retrieve
        const api_url = "https://phishr-api.up.railway.app/get_typesquatted_urls";

        var data = {
            url: input_Url.toLocaleLowerCase(),
            max_num: MAX_DOMAINS,
        };

        console.log("Sending post request !");

        try {
            const response = await axios.post(api_url, data);
            const responseData = response.data;
            console.log("Request is Successful !");
            console.log(responseData);

            // Make progressbar invisible
            setShowProgress(false);

            // Return the output
            const output = responseData.output;
            return output;
        } catch (error) {
            console.log("Request is NOT Successful !");
            console.log(error);

            // Make progressbar invisible
            setShowProgress(false);
            window.alert("Network Error Occurred! Try again.");
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------

    const Result = () => {

        if (output === null) {
            return null; // Return null if the output is null
        }

        const columns = [
            { field: 'domain_name', headerName: 'DOMAIN 🔽', width: 250 },
            { field: 'country', headerName: 'Country 🌐', width: 100 },
            { field: 'creation_date', headerName: 'Creation Date 📅', width: 250 },
            { field: 'registrar', headerName: 'Registrar 👤', width: 200 },
            { field: 'name_servers', headerName: 'Name Servers ', width: 400 },
            { field: 'status', headerName: 'Status 🕵️', width: 200 },
        ];

        const rows = output.map((item, index) => ({
            id: index + 1,
            domain_name: item.domain_name,
            country: item.country,
            creation_date: item.creation_date,
            registrar: item.registrar,
            name_servers: item.name_servers,
            status: item.status
        }));


        return (
            <>
                <div className="mt-10 mx-[5%] mb-5">
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pageSize={50}
                    />
                </div>
            </>
        );
    };

    //--------------------------------------------------------------------------------------

    const handleClick = async () => {

        if (input_Url.length <= 4) {
            console.log("URL provided is <= 4 characters !");
            setSnackbarState("Please provide a valid domain address!", "warning", true);
            return;
        }

        try {

            setButtonClicked(true)
            const output = await requestDomainDetails(input_Url);

            if (output == false) {
                setButtonClicked(false)
                setSnackbarState("Provided URL must be valid and active!", "warning", true);
                return;
            }

            if (output) {
                const allDomainDetails = output.allDomains;
                console.log("Setting Output as State!");
                setOutput(allDomainDetails);
            }

            setButtonClicked(false)

        } catch (error) {
            setButtonClicked(false)
            console.error(error);
        }
    };


    return (
        <>
            <Header LoggedInUser={savedEmail} />

            <div className="bg-transparent flex flex-col ">

                <div>
                    <h2 className="text-3xl text-slate-600 font-bold font-sans mt-12 text-center">
                        DomainDoppelganger ⚠️🕵️
                    </h2>
                    <p className="mt-3 text-base opacity-70 text-center mx-[28%]">
                        Identify potential typesquatting threats and find lookalike domains that adversaries can use to attack you.
                        Discover similar looking registered URLs and take proactive measures to protect your brand and stay one step
                        ahead in the digital landscape.
                    </p>
                </div>


                <div className="flex max-md:flex-col md:flex-row mt-10">
                    <input type="text" placeholder="Enter valid domain address or URL" onChange={(event) => setUrl(event.target.value)}
                        className="border-2 border-gray-600 rounded-sm text-xs min-[550px]:text-sm  md:text-lg 
                px-1 py-3 md:px-3 md:py-3 mx-10 md:mx-3 min-[550px]:mx-20 md:w-[60%] lg:w-[50%] md:ml-[12%] lg:ml-[20%]"/>


                    <button onClick={() => handleClick()} disabled={buttonClicked}
                        className="px-8 py-3 text-center w-fit bg-sky-400 hover:bg-sky-500 active:bg-sky-300 max-sm:ml-[38%] sm:max-md:ml-[40%]
                         text-white font-extrabold text-roboto rounded disabled:bg-sky-700 disabled:cursor-not-allowed">
                        SCAN
                    </button>
                </div>

                {showProgress ?
                    <div className="mt-8 flex flex-col items-center">
                        <p className="mb-3 font-light"> Scanning, this will takes 1-2 minutes.....</p>
                        <CircularProgress color="error" size={60} />
                    </div>
                    : null}

            </div>

            <Result />

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "right" }} />
        </>
    )
}

export default TypoSquatGenerator
