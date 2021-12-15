import React from "react";
import "./Component2.scss";
import img from "../assets/Phishing-Attacks.gif";

const Component2 = () => {
  return (
    <div className="component2">
      <img className="phishing-img" src={img} alt="Phishing Gif" />
      <p className="phishing-description">
        "Phishing is a type of online scam where criminals impersonate
        legitimate organizations via email, text message, advertisement or other
        means in order to steal sensitive information. This is usually done by
        including a link that will appear to take you to the company’s website
        to fill in your information – but the website is a clever fake and the
        information you provide goes straight to the crooks behind the scam"
      </p>
    </div>
  );
};

export default Component2;
