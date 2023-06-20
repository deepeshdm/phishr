<h1 align="center"> PHISHr 🎣🕵️ </h1>

### A Cybersecurity utility for detecting malicious phishing URLs using Machine Learning.
 - 🔒 <b> URL Scanning </b>: Instantly analyze URLs for potential threats and stay one step ahead of phishing attacks.
 - 🚨 <b> Suspicious URL Reporting </b>: Contribute to a safer online community by reporting suspicious URLs and helping others stay protected.
 - 🔍 <b> Typosquatting Detection </b>: Uncover those sneaky imposters with our clever feature that identifies similar-looking domains.

<div align="center">
<img src="/src/assets/phishr-demo3.gif" width="80%"/>
</div>

## How does it work? 🤷‍♂️

This web app takes a URL as an input and detects potentially malicious URLs by performing thorough checks such as blacklist verification, SSL certificate presence, HTTPS usage, and AI prediction. It provides a score and flags for various checks conducted.  The detection process involves several steps:
 - It checks if the URL is present in the top 1 million valid sites database.
 - It verifies if the URL is blacklisted in any of the 40 sources checked.
 - The app checks for the presence of an SSL certificate, ensuring secure communication.
 - The app validates against Google Safe Browsing and Norton Web Safe databases.
 - It checks if the URL is blacklisted in McAfee and Sucuri blacklists.
 - The app identifies temporary domains registered from unsecure sources.
 - It verifies if the URL is older than 3 months.
 - The app checks if the URL is blacklisted in local blacklists and IP sets.
 - It utilizes an AI model to predict the maliciousness of the URL.
 - The app checks if the URL is present in the URL reporting database.

## To Run (Locally)

1. Git clone the project repository on your local system
```javascript
git clone https://github.com/deepeshdm/phishr.git
```

2. Install dependencies in package.json
```javascript
npm install
```

3. Create a new Firebase project with Firestore and Google Authentication enabled. Replace the config in "src/db/firebase-config.js" with your own.
```
// ADD YOUR OWN FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxx"
};
```

4. Deploy project on the local server
```javascript
npm start
```


- Checkout the REST API - [here](https://github.com/deepeshdm/Phishr-API) 
- Model Training Notebooks - [here](https://github.com/deepeshdm/Phishr-API/tree/main/notebooks)






