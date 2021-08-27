//.ENV
const dotenv = require("dotenv");
dotenv.config();

//FIREBASE
const firebase = require("firebase");
require("firebase/storage");
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const admin = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
//Fetch or AXOIS
const fetch = require("node-fetch");

//IMAGE TYPE
const imageType = require("image-type");

async function uploadImageToFirebase() {
  console.log("You call this function !!!");
  //URL
  let url =
    "https://www.khaosod.co.th/wpapp/uploads/2017/11/panda-story_650_121014094259.jpg";
  // console.log(url);
  const response = await fetch(url);
  //Buffer
  const buffer = await response.buffer();
  let filename = url.split("/").pop(); //panda-story_650_121014094259.jpg";
  // console.log(buffer);
  console.log(imageType(buffer).mime);
  console.log(filename);

  const imageRef = storage.ref().child(filename);
  // CONVERT BUFFER TO BASE 64
  let message =
    "data:" + imageType(buffer).mime + ";base64," + buffer.toString("base64");
  //SAVE TO FIREBASE
  imageRef.putString(message, "data_url").then((snapshot) => {
    console.log("Uploaded a data_url string!");
  });
}

uploadImageToFirebase();
