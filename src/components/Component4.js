import React from "react";
import "./Component4.scss";
import githubImg from "../assets/github.svg";
import twitterImg from "../assets/twitter.svg";
import linkedinImg from "../assets/linkedin.svg";

const github_link =
  "https://github.com/deepeshdm/Phishing-Attack-Domain-Detection";
const twitter_link = "https://twitter.com/Deepeshmhatredm";
const linkedin_link = "https://www.linkedin.com/in/deepeshdm/";

const Component4 = () => {
  return (
    <div className="component4" align="center">
      <p className="developerInfo"> Developed by Deepesh Mhatre </p>
      <div className="socials">
        <a href={github_link}>
          <img
            width="30px"
            src={githubImg}
            style={{ padding: "10px", fill: "white" }}
            alt="github logo"
          />{" "}
        </a>
        <a href={twitter_link}>
          {" "}
          <img
            width="30px"
            src={twitterImg}
            style={{ padding: "10px" }}
            alt="twitter logo"
          />{" "}
        </a>
        <a href={linkedin_link}>
          {" "}
          <img
            width="30px"
            src={linkedinImg}
            style={{ padding: "10px" }}
            alt="linkedin logo"
          />{" "}
        </a>
      </div>
    </div>
  );
};

export default Component4;
