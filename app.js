//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution: Use node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');

//Function to print message to console
function printMessage(username, badgecount, points){
    const message = `${username} has ${badgecount} total badge(s) and ${points} points in JavaScript`
    console.log(message)
}

//connect to the API URL (https://teamtreehouse.com/username.json)

function getProfile(username){
    try{
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            let body = "";    
            //Read the data
            response.on('data', data => {
                body += data.toString();
            });

            response.on('end', () => {
                //Parse the data
                const profile = JSON.parse(body);
                //Print the data
                printMessage(username, profile.badges.length, profile.points.JavaScript);
            });    
        });
        request.on('error', error =>
            console.error(`Problem with request: ${error.message}`));
    } catch (error){
        console.error(error.message)
    }
}

const users = ["chalkers", "alenaholligan", "davemcfarland", "williamallen4"]

users.forEach(getProfile);