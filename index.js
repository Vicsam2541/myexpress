const express = require('express');
//LINE CONFIG
const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: 'WCDyyRmDiSkiCxvXIeGlgt/thVgXl1StYeYrHqkkRUuIg0/7A+Z2tTCwaEZ4MvbhTGafzTU5SxDj5o6qyfYTPRPYKjxRteJyWcw2NLAlP/nqb3LPfatScCRQ0ha9ViXfUQUjMd+BzjAWFQjhue/dHwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '7070d44f654fab9e98dcd5670e71deee'
};
const client = new line.Client(config);

//FIREBASE
const firebase = require('firebase');
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyDgsgqo4AEnwbnSnikW4l3quj27OpRVKiI",
    authDomain: "lineoa-8a08d.firebaseapp.com",
    projectId: "lineoa-8a08d",
    storageBucket: "lineoa-8a08d.appspot.com",
    messagingSenderId: "740424667419",
    appId: "1:740424667419:web:a5f0cf2aff8c42587b03be",
    measurementId: "G-C00KZS1WTZ"
} 
const admin = firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

//WEB
const app = express();
const port = 3000

app.post('/webhook', line.middleware(config), (req, res) => {
    //console.log(req);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    //console.log(event);
    //console.log(event.message);
    //console.log(event.message.text);
    
    // SAVE TO FIREBASE
    let chat = await db.collection('chats').add(event);
    console.log('Added document with ID: ', chat.id); 

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text,
    });
}


// Respond with Hello World! on the homepage:
app.get('/', function (req, res) {
    res.send('Hello Worl5555!')
})

app.get('/test-firebase', async function (req, res) {
    let data = {
        name: 'Tokyo',
        country: 'Japan'
    }
    const result = await db.collection('cities').add(data);
    console.log('Added document with ID: ', result.id);
    res.send('Test firebase successfully, check your firestore for a new record !!!')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Respond to POST request on the root route (/), the application’s home page:
app.post('/', function (req, res) {
    res.send('Got a POST request')
})
// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})
// Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})


