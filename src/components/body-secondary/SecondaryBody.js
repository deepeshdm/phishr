import "./SecondaryBody.css";
import BackgroundShape from "../../assets/BackgroundShape.svg";
import { UrlFeatures } from "./UrlFeatures";

export function SecondaryBody() {
  return (
    <>
      <div className="relative">
        <img src={BackgroundShape} alt="BackgroundImage" className="mt-1" />
        <p className="absolute top-28 left-[42%] text-white font-semibold text-3xl text-roboto text-center">
          {" "}
          How does it Work ?{" "}
        </p>
        <p className="absolute top-40 text-roboto text-white font-light text-lg mx-24 text-center">
          Phishing is a type of online scam where criminals impersonate
          legitimate organizations via email, text message, advertisement or
          other means in order to steal sensitive information. This is usually
          done by including a link that will appear to take you to the company’s
          website to fill in your information – but the website is a clever fake
          and the information you provide goes straight to the crooks behind the
          scam. To detect the malicious websites in the most efficient way, we
          use a Machine Learning method called Artificial Neural Network which
          was trained on a dataset of 600,000 legitimate and malicious URLs.
          Below are some of the features we analyze in a given URL.
        </p>

        {/* <UrlFeatures /> */}
      </div>
    </>
  );
}
