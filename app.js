//
// This is main file containing code implementing the Express server and functionality for the Express echo bot.
//
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1></div></body></html>";
var produrl = 'https://chatbot.agiratech.com/facebook'
// The rest of the code implements the routes for our Express server.


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Webhook validation
app.get('/facebook/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === 'EAAcMxumO3cEBAOiXYIHZAX2BtEs8yhTZAClIGAoYv838oD0tLiLShIrDsDoAwz8ZBBdfNaKjQuKJD2VGRXjKKpXl39fLzK1PR0PZBSSZBH4OquzWGnBLy1WMQuuNgNQp2ZAJzXsEYZCsmaWc3QnV8qQbnOZATpZAbpjPh0VWrMFOYPbRqcOmEtgnHOERZA51aCte8ZD') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

// Display the web page
app.get('/facebook', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(messengerButton);
    res.end();
});


app.post('/facebook/webhook', function (req, res) {

    var data = req.body;

    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;

            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {

                if (event.message) {


                    receivedMessage(event);
                }


                else if (event.postback) {
                    receivedPostback(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        res.sendStatus(200);
    }
});

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        switch (messageText) {
            case 'template':
                sendGenericMessage(senderID);
                break;
            case 'hi':
            case 'Hi':
            case 'hello':
            case 'Hello':
                sendGenericMessage(senderID);
                break;
            case 'programs':
            case 'Programs':
                sendGenericMessage1(senderID);
                break;
            case 'keynotes':
            case 'keynotes':
                sendGenericMessage2(senderID);
                break;
            case 'David':
            case 'david':
                sendGenericMessage3(senderID);
                break;
            case 'Pamela':
            case 'pamela':
                sendGenericMessage4(senderID);
                break;
            case 'sessions':
                sendGenericMessage5(senderID);
                break;
            case 'machine':
            case 'opensource':
                sendGenericMessage6(senderID);
                break;
            case 'schedule':
            case 'Schedule':
                sendGenericMessage7(senderID);
                break;
            case 'day1':
                sendGenericMessage8(senderID);
                break;
            case 'day2':
                sendGenericMessage9(senderID);
                break;
            case 'day3':
                sendGenericMessage10(senderID);
                break;
            case 'about':
                sendGenericMessage11(senderID);
                break;
            case 'sponsor':
                sendGenericMessage12(senderID);
                break;
            case 'location':
                sendGenericMessage13(senderID);
                break;


            default:
                sendTextMessage(senderID, messageText);
        }
    }
    else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}

function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;
    var payload = event.postback.payload;
    if (payload) {


        switch (payload) {

            case 'home':
                sendGenericMessage(senderID);
                break;
            case 'programs':
                sendGenericMessage1(senderID);
                break;

            case 'keynotes':
                sendGenericMessage2(senderID);
                break;

            case 'david':
                sendGenericMessage3(senderID);
                break;
            case 'pamela':
                sendGenericMessage4(senderID);
                break;
            case 'sessions':
                sendGenericMessage5(senderID);
                break;
            case 'machine':
            case 'opensource':
                sendGenericMessage6(senderID);
                break;
            case 'schedule':
                sendGenericMessage7(senderID);
                break;
            case 'day1':
                sendGenericMessage8(senderID);
                break;
            case 'day2':
                sendGenericMessage9(senderID);
                break;
            case 'day3':
                sendGenericMessage10(senderID);
                break;
            case 'about':
                sendGenericMessage11(senderID);
                break;
            case 'sponsor':
                sendGenericMessage12(senderID);
                break;
            case 'location':
                sendGenericMessage13(senderID);
                break;

            default:
                sendTextMessage(senderID, messageText);
        }
    }
    // When a postback is called, we'll send a message back to the sender to
    // let them know it was successful
    //sendTextMessage(senderID, "Postback called");
    else{
        sendGenericMessage(senderID);
    }

}

//////////////////////////
// Sending helpers
//////////////////////////
function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    callSendAPI(messageData);
}

function sendGenericMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "RailsConf 2017 is coming to beautiful Phoenix, Arizona! We’ll be at the Phoenix Convention Center this Spring, so come join us to talk all things Rails with other developers and enthusiasts.",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Programs",
                                    "payload": "programs"
                                },
                                {
                                    "type": "postback",
                                    "title": "Schedule",
                                    "payload": "schedule"
                                },
                                {
                                    "type": "postback",
                                    "title": "Location",
                                    "payload": "location"
                                }
                            ]
                        },
                        {
                            "title": "RailsConf 2017 is coming to beautiful Phoenix, Arizona! We’ll be at the Phoenix Convention Center this Spring, so come join us to talk all things Rails with other developers and enthusiasts.",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Sponsor",
                                    "payload": "sponsor"
                                },
                                {
                                    "type": "postback",
                                    "title": "About",
                                    "payload": "about"
                                }
                            ]
                        }
                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage1(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },

        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Sharing Knoledge is always Fun. Let us know what Program details you looking for",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "KeyNotes",
                                    "payload": "keynotes"
                                },
                                {
                                    "type": "postback",
                                    "title": "Sessions",
                                    "payload": "sessions"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },
                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}

function sendGenericMessage2(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },

        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Sharing Knoledge is always Fun. Let us know what Program details you looking for",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "David Heinemeier Hansson",
                                    "payload": "david"
                                },
                                {
                                    "type": "postback",
                                    "title": "Pamela Pavliscak",
                                    "payload": "pamela"
                                },
                                {
                                    "type": "postback",
                                    "title": "Programs",
                                    "payload": "programs"
                                }
                            ]
                        },

                        {
                            "title": ".",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        }

                    ]
                }
            },

        }
    };
    callSendAPI(messageData);
}
function sendGenericMessage3(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "David Heinemeier Hansson",
                            item_url: "https://railsconf.com/assets/speakers/DHH-2362286c66f1263cd08c874383c404612f612bd6431152fb53f6ed42b8d4ba89.jpg",
                            image_url: "https://railsconf.com/assets/speakers/DHH-2362286c66f1263cd08c874383c404612f612bd6431152fb53f6ed42b8d4ba89.jpg",


                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "KeyNotes",
                                    "payload": "keynotes"
                                },
                                {
                                    "type": "postback",
                                    "title": "Programs",
                                    "payload": "programs"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },



                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage4(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },

        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {


                            item_url: "https://railsconf.com/assets/speakers/PamelaPavliscak-049ef12ebefa3d7e997af6cf02ef7fdfa403a474bb42dc4a065e6afd513140f2.jpg",
                            image_url: "https://railsconf.com/assets/speakers/PamelaPavliscak-049ef12ebefa3d7e997af6cf02ef7fdfa403a474bb42dc4a065e6afd513140f2.jpg",
                            "title": "Pamela Pavliscak",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "KeyNotes",
                                    "payload": "keynotes"
                                },
                                {
                                    "type": "postback",
                                    "title": "Programs",
                                    "payload": "programs"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },

                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage5(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Sessions",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Machine Learning",
                                    "payload": "machine"
                                },
                                {
                                    "type": "postback",
                                    "title": "Open Source Deep Dive",
                                    "payload": "opensource"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },



                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage6(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Sessions",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Sessions",
                                    "payload": "sessions"
                                },
                                {
                                    "type": "postback",
                                    "title": "Programs",
                                    "payload": "programs"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },



                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage7(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Sessions",

                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Day 1",
                                    "payload": "day1"
                                },
                                {
                                    "type": "postback",
                                    "title": "Day 2",
                                    "payload": "day2"
                                },
                                {
                                    "type": "postback",
                                    "title": "Day 3",
                                    "payload": "day3"
                                }
                            ]
                        },

                        {
                            "title": "RailsConf 2017 is coming to beautiful Phoenix, Arizona! We’ll be at the Phoenix Convention Center this Spring, so come join us to talk all things Rails with other developers and enthusiasts.",

                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                },

                            ]
                        }




                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage8(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {

                            "title": "Day1",

                            item_url: produrl+"/images/day1.png",
                            image_url: produrl+"/images/day1.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Schedule",
                                    "payload": "schedule"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },





                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage9(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {

                            "title": "Day 2",

                            item_url: produrl+"/images/day2.png",
                            image_url: produrl+"/images/day2.png",
                            "buttons": [


                                {
                                    "type": "postback",
                                    "title": "Schedule",
                                    "payload": "schedule"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },





                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage10(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {

                            "title": "Day 3",

                            item_url: produrl+"/images/day3.png",
                            image_url: produrl+"/images/day3.png",
                            "buttons": [


                                {
                                    "type": "postback",
                                    "title": "Schedule",
                                    "payload": "schedule"
                                },
                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }
                            ]
                        },





                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage11(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {


                            "title": "RailsConf is brought to you by the team at Ruby Central, as well as a small but dedicated corps of volunteers. While we depend on the awesomeness of the whole Ruby community to contribute to a terrific experience every year, there are a few individuals that work especially hard to produce RailsConf.",
                            "buttons": [

                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }

                            ]
                        },





                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage12(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {

                            item_url: produrl+"/images/sponsor1.png",
                            image_url: produrl+"/images/sponsor1.png",
                            "title": "Sponsor.",
                            "buttons": [

                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }

                            ]
                        },





                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}
function sendGenericMessage13(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },




        "message": {
            "attachment": {
                "type": "template",

                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {

                            item_url: "https://www.google.co.in/maps/place/Phoenix+Convention+Center/@33.449759,-112.0731617,17z/data=!3m1!4b1!4m5!3m4!1s0x872b121f37d37a0f:0xf35f15fd49dfcb38!8m2!3d33.449759!4d-112.070973?dcr=0",
                            image_url: "https://www.google.co.in/maps/place/Phoenix+Convention+Center/@33.449759,-112.0731617,17z/data=!3m1!4b1!4m5!3m4!1s0x872b121f37d37a0f:0xf35f15fd49dfcb38!8m2!3d33.449759!4d-112.070973?dcr=0",
                            "title": "Phoenix Convention Center\n" +
                            "100 N. 3rd Street \n" +
                            "Phoenix, AZ 85004 \n" +
                            "(602) 262-6225.",
                            "buttons": [

                                {
                                    "type": "postback",
                                    "title": "Home",
                                    "payload": "home"
                                }

                            ]
                        },





                    ]
                }
            },

        }
    };

    callSendAPI(messageData);
}




function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: 'EAAcMxumO3cEBAOiXYIHZAX2BtEs8yhTZAClIGAoYv838oD0tLiLShIrDsDoAwz8ZBBdfNaKjQuKJD2VGRXjKKpXl39fLzK1PR0PZBSSZBH4OquzWGnBLy1WMQuuNgNQp2ZAJzXsEYZCsmaWc3QnV8qQbnOZATpZAbpjPh0VWrMFOYPbRqcOmEtgnHOERZA51aCte8ZD'},
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3005, function () {
    console.log("Listening on port %s", server.address().port);
});