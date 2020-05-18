//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution: Use node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');
const username = 'williamallen4';

//Function to print message to console
function printMessage(username, badgecount, points){
    const message = `${username} has ${badgecount} total badge(s) and ${points} points in JavaScript`
    console.log(message)
}

//connect to the API URL (https://teamtreehouse.com/username.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`, response =>{
    //Read the data
    console.log(response.statusCode);
    //Parse the data
    //Print the data
});