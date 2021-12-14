import React from "react";
import "./Component1.scss";
import phishinglogo from "../assets/Phishr.png";
import Loading from "./Loader";
import { useState } from "react";
const axios = require("axios");



const Component1 = () => {

  const [input_Url, setUrl] = useState("");
  const [result, setResult] = useState(0);
  const [isFetchingData,setFetchingData] = useState(false);
  // glows result RED if probability > 70%
  const [resultStyle,setResultStyle] = useState("result-text")


  // Renders the loader when fetching data
  const ConditionalRender = ()=>{

    if(isFetchingData){
      return (<Loading className="loader" type={"bars"} color={"#fff"} width={"80px"} height={"80px"} />)
    }else{
      return(
        <p className="display">
        There is <text className={resultStyle}> {result}% </text> 
        chance the website or the URL provided is malicious.
      </p>
      )
    }

  }


  // Send post request and returns probability value
  function get_Prediction(url) {

    setFetchingData(true)

    if (url.length <= 5) {
      console.log("URL provided is less than 5 characters !")
      setResult(0)
      setFetchingData(false)  
      setResultStyle("result-text")
      return;
    }

    const api_url = "https://phishhr.herokuapp.com/predict";

    // No need to convert to json string
    var data = { url: url };

    console.log("Sending post request !")

    axios
      .post(api_url, data)
      .then((response) => {
        // handle success
        const data = response.data;
        console.log("Request is Sucessful !");
        console.log(data);
        const proba = data["prediction"];
        setResult(proba);
        if(proba>70){
          console.log("Proba > 70 ,glow red !")
          setResultStyle("result-text-malicious")
        }
        setFetchingData(false)
      })
      .catch((error) => {
        // handle error
        console.log("Request is NOT Sucessful !");
        console.log(error);
        setFetchingData(false)
        setResultStyle("result-text")
      });
  }

  return (
    <div className="component1" align="center">
      <img className="phishrImg" src={phishinglogo} alt="Phishing Logo"/>
      <ConditionalRender/>
      <div>
        <input
          autoFocus={true}
          className="url-input"
          placeholder="Enter website domain address or URL (eg - www.Tesla.com)"
          onChange={(event) => setUrl(event.target.value)}
        />
        <br />
        <button
          className="detect-button"
          onClick={() => get_Prediction(input_Url)}
        >
          {" "}
          SCAN URL{" "}
        </button>
      </div>
    </div>
  );
};

export default Component1;
