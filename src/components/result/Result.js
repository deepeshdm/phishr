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
    { url_score>60 ? <img src={WarningGif} alt="Warn Gif" className="ml-[37%] w-[24%] mt-5" /> : <img src={SafeGif} alt="Safe Gif" className="ml-[37%] w-[24%] mt-5" /> }
    <h1 className="text-2xl font-bold text-center">
    "{input_url}"
    </h1>
      <h1 className="text-3xl font-light text-center mt-3">
        There's is <span className="font-bold"> {url_score} % </span> chance the URL is malicious !!!
      </h1>
      <button 
      className="px-5 py-3 text-center ml-[46%] mt-10 w-fit bg-amber-400 hover:bg-amber-500 active:bg-amber-300 text-white font-extrabold text-roboto rounded"
      onClick={() => navigate("/")}> Try again ? </button>
    </>
  );
}
