import "./Result.css";
import { Header } from "../header/Header";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import WarningGif from "../../assets/Warning.gif";
import SafeGif from "../../assets/Safe.gif";
import URLSafeGif from "../../assets/UrlSafe.gif";


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

  // Extract Data 
  const HIGHEST_URL_SCORE = 180
  const input_url = locationState["inputUrl"];
  const output = locationState["output"];
  console.log("OUTPUT : ", output)

  // Legitimate URLs have higher scores
  const url_score = output["SCORE"]
  let THREAT_LEVEL = null;
  if (url_score >= 120) {
    THREAT_LEVEL = "SAFE";
  } else if (url_score > 60 & url_score < 120) {
    THREAT_LEVEL = "POTENTIAL";
  } else {
    THREAT_LEVEL = "RISKY";
  }


  function OutputStatement(props) {

    if (props.THREAT_LEVEL == "SAFE") {
      return (
        <>
          <h1 className="font-light text-center mt-3 max-sm:text-lg sm:text-2xl md:text-3xl ">
            The given URL is <span className="font-extrabold"> SAFE </span> ! ✅ No Malicious activity detected.
          </h1>
        </>
      )
    }

    if (props.THREAT_LEVEL == "POTENTIAL") {
      return (
        <>
          <h1 className="font-light text-center mt-3 max-sm:text-lg sm:text-2xl md:text-3xl ">
            The given URL is <span className="font-extrabold"> Potentially Risky </span> ! ⚠️ Use Incognito Mode & VPN for safety.
          </h1>
        </>
      )
    }

    return (
      <>
        <h1 className="font-light text-center mt-3 max-sm:text-lg sm:text-2xl md:text-3xl ">
          The given URL is <span className="font-extrabold"> Highly Malicious </span> ! ❌ Please Don't Visit It.
        </h1>
      </>
    )

  }

  function GifOutput(props) {

    if (props.THREAT_LEVEL == "SAFE") {
      return (
        <>
          <img src={SafeGif} alt="URL Safe Gif" className="ml-[23%] w-[55%] sm:ml-[31%] sm:w-[38%] lg:ml-[37%] lg:w-[26%] mt-2" />
        </>
      )
    }

    return (
      <>
        <img src={WarningGif} alt="Warn Gif" className="ml-[23%] w-[55%] sm:ml-[33%] sm:w-[38%] lg:ml-[37%] lg:w-[26%] mt-2" />
      </>
    )

  }

  //----------------------------------------------------------

  return (
    <>
      <Header />

      <GifOutput THREAT_LEVEL={THREAT_LEVEL} />

      <h1 className="font-semibold text-center max-sm:text-xl sm:text-2xl">"{input_url}"</h1>

      <OutputStatement THREAT_LEVEL={THREAT_LEVEL} />

      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 max-w-2xl mt-8">
          <div className="text-center bg-gray-200 p-2 rounded">
            In Top Most Visited Sites: {output.InTop1Million ? '✅ Yes' : '❌ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            SSL certificate Detected : {output.hasSSLCertificate ? '✅ Yes' : '❌ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            Domain is Older Than 3 Months: {output.isOlderThan3Months ? '✅ Yes' : '❌ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            Uses Temporary Domain Registration (Vercel, Heroku etc): {output.isTemporaryDomain ? '❌ Yes' : '✅ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            Passed Google WebSafe Evaluation: {output.GoogleSafePassed ? '✅ Yes' : '❌ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            Passed Nortan WebSafe Evaluation: {output.NortanWebSafePassed ? '✅ Yes' : '❌ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            BlackListed in URLVoid sources: {output.InURLVoidBlackList ? '❌ Yes' : '✅ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            BlackListed in Mcaffe sources: {output.InMcaffeBlackList ? '❌ Yes' : '✅ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            BlackListed in Sucuri sources: {output.InSucuriBlacklist ? '❌ Yes' : '✅ No'}
          </div>
          <div className="text-center bg-gray-200 p-2 rounded">
            BlackListed in IpSet sources: {output.isBlackListedinIpSets ? '❌ Yes' : '✅ No'}
          </div>
        </div>
      </div>

      {output["target_urls"].length > 0 ? (
        <div className="flex flex-row justify-center">
          <div className="text-center bg-gray-200 p-4 rounded mt-5 font-semibold">
            <span role="img" aria-label="police" className="text-2xl">👮‍♂️</span> Possible Target Brands/URLs :
            <ul className="list-none ml-4">
              {output["target_urls"].slice(0, 5).map((url, index) => (
                <li key={index} className="text-blue-500 hover:underline mt-2">
                  <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">{url}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <button
        className="px-5 py-3 text-center mt-8 w-fit bg-amber-400 hover:bg-amber-500 
      active:bg-amber-300 text-white font-extrabold text-roboto rounded ml-[37%] sm:ml-[42%] md:ml-[44%] lg:ml-[46%] mb-16"
        onClick={() => navigate("/")}> Try again ? </button>
    </>

  );
}
