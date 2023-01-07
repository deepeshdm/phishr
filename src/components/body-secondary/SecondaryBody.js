import "./SecondaryBody.css";
import BackgroundShape from "../../assets/BackgroundShape.svg";
import { UrlFeatures } from "./UrlFeatures";

export function SecondaryBody() {
  return (
    <>
      <div className="relative">
        <img src={BackgroundShape} alt="BackgroundImage" className="mt-1 max-sm:h-80 sm:max-lg:h-96" />
        <p className="text-white font-semibold text-roboto text-center absolute max-sm:top-14 top-16 lg:top-24 text-2xl
        min-[350px]:left-[27%] min-[400px]:left-[33%] min-[520px]:left-[38%] md:left-[40%] lg:left-[42%]
        min-[350px]:text-xl lg:text-3xl">
          How does it Work ?
        </p>
        <p className="absolute text-roboto text-white font-light text-center 
         max-sm:text-xs sm:text-sm md:text-base lg:text-lg max-sm:top-24 top-24 lg:top-36 max-md:mx-7 md:mx-14 lg:mx-20

        ">
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
