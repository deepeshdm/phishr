import "./Result.css";
import { Header } from "../header/Header";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import WarningGif from "../../assets/Warning.gif";
import SafeGif from "../../assets/Safe.gif";


export function Result(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;

  //----------------------------------------------------------

  // Runs at Initial Render. Redirects if State is null.
  useEffect(() => {
    if (locationState == null) {
      console.log("Redirecting to Home");
      navigate("/");
    }
  }, [locationState, navigate]);

  if (locationState == null) {
    console.log("LocationState is null");
    return null;
  }

  //----------------------------------------------------------

  const input_url = locationState["inputUrl"];
  const url_score = locationState["url_score"];

  return (
    <>
    <Header/>
    
    { url_score>60 ? <img src={WarningGif} alt="Warn Gif" className="ml-[23%] w-[55%] sm:ml-[33%] sm:w-[38%] lg:ml-[37%] lg:w-[26%] mt-2" /> : 
    <img src={SafeGif} alt="Safe Gif" className="ml-[23%] w-[55%] sm:ml-[31%] sm:w-[38%] lg:ml-[37%] lg:w-[26%] mt-2" /> }

    <h1 className="font-semibold text-center max-sm:text-xl sm:text-2xl "> "{input_url}" </h1>

      <h1 className="font-light text-center mt-3 max-sm:text-lg sm:text-2xl md:text-3xl ">
        There's is <span className="font-extrabold"> {url_score} % </span> chance URL is malicious !
      </h1>

      <button 
      className="px-5 py-3 text-center mt-8 w-fit bg-amber-400 hover:bg-amber-500 
      active:bg-amber-300 text-white font-extrabold text-roboto rounded ml-[37%] sm:ml-[42%] md:ml-[44%] lg:ml-[46%]"
      onClick={() => navigate("/")}> Try again ? </button>
    </>
  );
}
