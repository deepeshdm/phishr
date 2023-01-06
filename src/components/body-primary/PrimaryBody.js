import { useState } from "react";
import "./PrimaryBody.css";
import PhishGif from "../../assets/Phishing-account.gif";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

//-------------------------------------------------------------------------

// Send post request and returns probability value
function get_Prediction(url, showProgress, navigate) {

  if (url.length <= 5) {
    console.log("URL provided is less than 5 characters !");
    return;
  }

  // Lowercase the string
  url = url.toLowerCase();

  // Make progressbar visible
  showProgress(true);

  const api_url = "https://phishr-api.up.railway.app/predict";

  // No need to convert to json string
  var data = { url: url };

  console.log("Sending post request !");

  axios
    .post(api_url, data)
    .then((response) => {
      // handle success
      const data = response.data;
      console.log("Request is Sucessful !");
      console.log(data);
      const proba = data["prediction"];
      if (proba > 60) {
        console.log("Proba > 60 !");
      }

      // Make progressbar invisible
      showProgress(false);

      // Navigate to /result
      navigate("/result", { state: { inputUrl: url, url_score: proba } });
    })
    .catch((error) => {
      // handle error
      console.log("Request is NOT Sucessful !");
      console.log(error);
      // Make progressbar invisible
      showProgress(false);
      window.alert("Network Error Occured ! Try again.");
    });
}

//-------------------------------------------------------------------------

export function PrimaryBody(props) {
  const [input_Url, setUrl] = useState("");
  const showProgress = props.showProgress;
  const navigate = useNavigate();

  return (
    <>
      <p className="font-light max-sm:mx-3 max-sm:text-xl sm:text-2xl md:text-4xl mt-8 text-center">
        Don't get Hooked by a Phish again ! 👮‍♂️
      </p>
      <p className="font-normal mt-1 text-center text-gray-500 text-sm sm:text-lg mx-7">
        Don't get caught in a phishing trap. Happens 2.6 million times a year,
        but with our app, you can protect yourself.
      </p>

      <img src={PhishGif} alt="Phishing Gif"
        className="max-sm:w-[50%] sm:w-[40%] md:w-[27%] max-md:ml-[30%] md:ml-[40%] lg:w-[24%] mt-3"
      />

      <div className="flex flex-row gap-x-10 mt-5">
        <input
          type="text"
          placeholder="Enter website domain address or URL (eg- www.Tesla.com)"
          onChange={(event) => setUrl(event.target.value)}
          className="ml-[25%] px-3 text-lg py-3 border-2 border-gray-600 rounded-sm w-[40%]"
        />
        <button
          onClick={() => get_Prediction(input_Url, showProgress, navigate)}
          className="px-5 py-4 text-center w-fit bg-amber-400 hover:bg-amber-500 active:bg-amber-300 text-white font-extrabold text-roboto rounded"
        >
          SCAN URL
        </button>
      </div>
    </>
  );
}
