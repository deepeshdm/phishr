import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import SnackBar from '../SnackBar';
import LinearProgress from "@mui/material/LinearProgress";
import { IOSSwitch } from './ToggleButton';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import BulkURLreport from './BulkURLReport';
import SingleURLreport from './SingleURLReport';

const ReportURL = () => {

  const navigate = useNavigate();
  const [reportInBulk, setReportInBulk] = useState(false);
  const [reportAnonymously, setReportAnonymously] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);
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


  //--------------------------------------------------------------------------

  // Blur the screen if not loggedIn already
  if (savedEmail == null) {
    console.log("savedEmail is Null !");
    return (
      <>
        <Header />
        <div className="min-h-screen relative">

          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-blue-400 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="login-container p-8 rounded-lg shadow-lg bg-white">
              <h3 className="text-3xl font-bold mb-4 text-gray-800">Please Login 🔒</h3>
              <p className="text-gray-600 mb-8">
                To report URLs, you need to login first.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                LOGIN
              </button>
            </div>
          </div>

        </div>
        <Footer />
      </>
    );
  }

  //--------------------------------------------------------------------------

  return (
    <>
      <Header LoggedInUser={savedEmail}/>
      {reportClicked ? <LinearProgress color="primary" /> : null}
      <div className="bg-transparent min-h-screen">

        <div>
          <h2 className="text-3xl text-slate-600 font-bold font-sans mt-8 text-center">Report a suspicious site 👮🚨 </h2>
          <p className="mt-3 text-base opacity-70 text-center mx-[30%]">
            Report any suspicious URLs hosting phishing content, distributing malware, or engaging in other malicious activities for
            analysis by our classification system. Help us maintain a secure online environment by submitting them here.
          </p>
        </div>

        <div className="flex flex-row justify-between items-center mx-[30%] mt-7">
          <span>
            <IOSSwitch sx={{ mr: 1, fontWeight: 'light' }} onChange={(e) => setReportInBulk(e.target.checked)} /> Report in Bulk
          </span>
          <span>
            <IOSSwitch sx={{ mr: 1, fontWeight: 'light' }} onChange={(e) => setReportAnonymously(e.target.checked)} /> Report Anonymously
          </span>
        </div>

        {reportInBulk ?
          <BulkURLreport setSnackbarState={setSnackbarState} setReportClicked={setReportClicked} reportAnonymously={reportAnonymously} /> :
          <SingleURLreport setSnackbarState={setSnackbarState} setReportClicked={setReportClicked} reportAnonymously={reportAnonymously} />}


      </div>
      <Footer />

      <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
        snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={2000} position={{ vertical: "top", horizontal: "right" }} />

    </>

  );
};

export default ReportURL;




