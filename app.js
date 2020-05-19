//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution: Use node.js to connect to Treehouse's API to get profile information to print out

// Require https module
const https = require('https');
// Require http module
const http = require('http');

//Print Error Messages
function printError(error){
    console.error(error.message);
}

//Function to print message to console
function printMessage(username, badgecount, points){
    const message = `${username} has ${badgecount} total badge(s) and ${points} points in JavaScript`
    console.log(message)
}

//connect to the API URL (https://teamtreehouse.com/username.json)

function getProfile(username){
    try{
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200){
                let body = "";    
                //Read the data
                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    try{
                        //Parse the data
                        const profile = JSON.parse(body);
                        //Print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error){
                        printError(error);
                    }
                });
            } else {
                    const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
                    const statusCodeError = new Error(message);
                    printError(statusCodeError);
            }

        });
        request.on('error', printError);
    } catch (error){
        printError(error);
    }
}

const users = process.argv.slice(2);
users.forEach(getProfile);