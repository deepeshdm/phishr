# PHISHr 🎣🕵️

### A Cybersecurity utility for detecting malicious phishing URLs using Machine Learning
**🔥 Official React Website :** https://phishr.vercel.app/

<div align="center">
<Img src="/src/assets/Phishing-Attacks.gif" width="60%"/>
</div>

## How does it work ?

The API takes a string URL as input and returns a probability value (0-100) of URL being malicious. We declare a URL malicious if it crosses a probability value of 70%. To determine if a URL is malicious or legitimate we use a Neural Network trained on 600,000 URLs. To see how exactly the model works,checkout the model training repository [here](https://github.com/deepeshdm/Phishing-Attack-Domain-Detection).

<div align="center">
<img src="/src/assets/phishr-demo.gif" width="80%"/>
</div>

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
- Model Training repository - [here](https://github.com/deepeshdm/Phishing-Attack-Domain-Detection)






