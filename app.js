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
    let body = "";    
    //Read the data
    response.on('data', data => {
        body += data.toString();
    });

    response.on('end', ()=>{
        //Parse the data
        const profile = JSON.parse(body);
        //Print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript)
    });    
});