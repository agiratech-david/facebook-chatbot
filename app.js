'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1></div></body></html>";
var home1 =require('./db/home.json');
var programs =require('./db/programs.json');
var keynotes =require('./db/keynotes.json');
var david =require('./db/david.json');
var pamela =require('./db/pamela.json');
var sessions =require('./db/sessions.json');
var machine =require('./db/machine.json');
var schedule =require('./db/schedule.json');
var day1 =require('./db/day1.json');
var day2 =require('./db/day2.json');
var day3 =require('./db/day3.json');
var about =require('./db/about.json');
var sponsor =require('./db/sponsor.json');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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
app.get('/facebook', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(messengerButton);
    res.end();
});
app.post('/facebook/webhook', function (req, res) {
    var data = req.body;
    if (data.object === 'page') {
        data.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
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
            case 'home':
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
                break;sessions
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
       else{
        sendGenericMessage(senderID);
    }
}
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
        "message":home1.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage1(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": programs.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage2(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": keynotes.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage3(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": david.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage4(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": pamela.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage5(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": sessions.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage6(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": machine.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage7(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": schedule.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage8(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": day1.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage9(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": day2.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage10(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": day3.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage11(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": about.message
    };
    callSendAPI(messageData);
}
function sendGenericMessage12(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        "message": sponsor.message
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
var server = app.listen(process.env.PORT || 3005, function () {
    console.log("Listening on port %s", server.address().port);
});