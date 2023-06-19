import "./SecondaryBody.css";
import BackgroundShape from "../../assets/BackgroundShape.svg";

export function SecondaryBody() {
  return (
    <>
      <div className="relative">
        <img src={BackgroundShape} alt="BackgroundImage" className="mt-1 w-full max-sm:h-72 sm:max-lg:h-80 lg:h-96" />
        <p className="text-white font-semibold text-roboto text-center absolute max-sm:top-12 top-16 lg:top-24 text-2xl
        min-[350px]:left-[27%] min-[400px]:left-[33%] min-[520px]:left-[38%] md:left-[40%] lg:left-[42%]
        min-[350px]:text-xl lg:text-3xl">
          How does it Work ?
        </p>
        <p className="absolute text-roboto text-white font-light text-center
         max-sm:text-xs sm:text-sm md:text-base lg:text-lg max-sm:top-20 top-24 lg:top-36 max-md:mx-7 md:mx-14 lg:mx-20">
          Phishing is a prevalent online scam where criminals impersonate legitimate sites. To combat this threat, we have implemented
          an advanced system that combines multiple techniques for efficient detection of malicious URLs. Our system employs an Artificial Neural
          Network trained on a dataset of 600,000 URLs and enhances its capabilities by extensively analyzing the top 1 million URLs on the World
          Wide Web. Furthermore, we cross-reference these URLs with blacklists from trusted sources like Google, Norton, URLVoid, and others.
          These comprehensive upgrades empower our system to identify and protect users from malicious websites, providing a robust defense against
          phishing scams.

          <br /> <br />
          <span className="font-bold sm:text-sm underline text-amber-400 hover:text-white mb-5">
            <a href="#" target="_blank" rel="noreferrer">
              LEARN MORE </a> </span>
        </p>
      </div>
    </>
  );
}
