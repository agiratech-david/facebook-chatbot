'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
var messengerButton = "<html>\n" +
    "  <head>\n" +
   "<script >\n" +
    "\t\t\t\twindow.tcAsyncInit = function(a){\n" +
    "\t\t\t\t\ta.init({ appUISetting:\"%7B%22minimisedScreen%22%3A%7B%22minText%22%3A%22Talk%20to%20Bot%22%2C%22width%22%3A%22300%22%2C%22textColor%22%3A%22%23565656%22%7D%2C%22chatScreen%22%3A%7B%22maxText%22%3A%22Support%22%2C%22imageDisplayType%22%3A%22rectangular%22%2C%22textColor%22%3A%22%23565656%22%7D%2C%22loginScreen%22%3A%7B%22height%22%3A%22410%22%2C%22formHeading%22%3A%22Please%20tell%20us%20about%20yourself.%22%2C%22nameLabel%22%3A%22Add%20Name%22%2C%22emailLabel%22%3A%22Add%20Email%22%2C%22phoneLabel%22%3A%22Add%20Phone%20No%22%2C%22messageLabel%22%3A%22Add%20Message%22%2C%22submitBtnText%22%3A%22Start%20Chatting%22%7D%2C%22contentScreen%22%3A%7B%22customfontSize%22%3A%2216%22%2C%22fontFamily%22%3A%22sans-serif%22%2C%22botBgColor%22%3A%22%23eeeeee%22%2C%22botColor%22%3A%22%23444%22%2C%22userBgColor%22%3A%22%233498db%22%2C%22userColor%22%3A%22%23fff%22%7D%2C%22commonWidget%22%3A%7B%22width%22%3A%22350%22%2C%22height%22%3A%22450%22%2C%22bgColor%22%3A%22%23eeeeee%22%2C%22bgImage%22%3A%22%22%2C%22perMenuImg%22%3A%22https%3A//scontent.fmaa1-1.fna.fbcdn.net/v/t1.0-1/p32x32/21558709_1141680925961799_5219631436538227452_n.png%3Foh%3D8b78176d92d59a708abbd3f9d360bb25%26oe%3D5A5DBCEF%22%2C%22borderColor%22%3A%22%23d4d4d4%22%2C%22textColor%22%3A%22%23ff4400%22%2C%22titleTextFont%22%3A%2216%22%2C%22titleWinHeight%22%3A%2245%22%2C%22RDStatus%22%3A%22No%22%2C%22webView%22%3A%22Yes%22%2C%22isResponsive%22%3A%22No%22%2C%22msgEncryption%22%3A%22No%22%2C%22allowHtmlFromBot%22%3A%22No%22%2C%22widgetType%22%3A%22Normal%22%2C%22persistenceMenu%22%3A%22%7B%5C%22disableinput%5C%22%3Afalse%2C%5C%22menu%5C%22%3A%5B%7B%5C%22title%5C%22%3A%5C%22Level1%20-%20Element1%5C%22%2C%5C%22type%5C%22%3A%5C%22nested%5C%22%2C%5C%22menu%5C%22%3A%5B%7B%5C%22title%5C%22%3A%5C%22Level2%20-%20Element1%5C%22%2C%5C%22type%5C%22%3A%5C%22text%5C%22%7D%2C%7B%5C%22title%5C%22%3A%5C%22Level2%20-%20Element2%5C%22%2C%5C%22type%5C%22%3A%5C%22nested%5C%22%2C%5C%22menu%5C%22%3A%5B%7B%5C%22title%5C%22%3A%5C%22Level3%20-%20Element1%5C%22%2C%5C%22type%5C%22%3A%5C%22text%5C%22%7D%5D%7D%2C%7B%5C%22title%5C%22%3A%5C%22Level2%20-%20Element4%5C%22%2C%5C%22type%5C%22%3A%5C%22nested%5C%22%2C%5C%22menu%5C%22%3A%5B%7B%5C%22title%5C%22%3A%5C%22Level3%20-%20Element1%5C%22%2C%5C%22type%5C%22%3A%5C%22text%5C%22%7D%5D%7D%2C%7B%5C%22title%5C%22%3A%5C%22Level2%20-%20Element5%5C%22%2C%5C%22type%5C%22%3A%5C%22text%5C%22%7D%5D%7D%2C%7B%5C%22title%5C%22%3A%5C%22Level2%20-%20Element4.1%5C%22%2C%5C%22type%5C%22%3A%5C%22text%5C%22%7D%5D%7D%22%2C%22logo%22%3A%22data%3Aimage/png%3Bbase64%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%3D%22%2C%22user%22%3A%22https%3A//www.gupshup.io/images/botwidget/ic_user.png%22%2C%22bot%22%3A%22data%3Aimage/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAALwAAABSCAYAAADuB75ZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADKBJREFUeNrsXb1TIzkWF5SDy7An3io83B8AWzM53qqZ8ApfMJu6J2FCvBFkNBkbYUJI6E2H4ExduFRtO19qzR9wHrvq4jHONmP1mCdWCEkt9Ydxt9+r6mqQu6XX0k+/fu/po1fu7+/ZMsk//nUU/Pnfw4iRLKWsLuEzb1GzE+CXhd2b/HRHzU6AXxYJ+DGkZifALxPgY/jj/Lv1OjU/Ab7K5kwbzBnusN6RLU+AXwbp8iOS/m9R8xPgq8ruAO5tfvSlZDJpCPCVlZAft9ycGUtpZNIQ4CvN7pHy0zY1PwG+itLDc5+am6TSgIdpBPy0yY8r2Zw5/26dzBkCfOXAXpfYvaf8TA4rAb6SpswaOqsxAZ6ksoBHR7VjYHcQMmkI8JUyZYSDOjFMBSaGJ8BXRiI0ZUBCwzXE8AT4SrA7TB/YSWB3kCY1PQG+7GAH1j6RkgLL5evU9AT4qtjtIANNZOZBKAZPgK+CxApr29idzBkCfKnZHez0TSnpSJkk9iIOK3+TNPkREsQWS2olBzvE2DtS0oTp4+6ytPB8WxTQ2bfo0B0zR4lICPDeYAezZU9JDqQVTUkMf1cQ0KFDBbv/n8QELwJ8nmC/UJKvTI6qAsq1nIEOSwchHArTjU+hQ3Gw084IBPhCwT5JcFRztd9xAXiAQAdnecCP7znQaUcEAnzhYHc1ZWT7HWSYAujA5m3Jb4CO9m8OdJprT4CfG9hPk0wZA8PfOYJ8C9k8kMyhGTjHHOjklBLg5wp2mPrb9chq2xPkbfY0vv8AdAQ72ekE+ELADoA+0fw0Q0C6miMtJWmo2OQtzK9tcGzBIQ0J6AT4IsEesadxdtVuH3tkp3YOMTAE6ZuGe6BTRcjoY4ILAb4ooNcRaDuGS8Bud3YUMRypMvyJ5RYyXSoqK4u2Pzzu8Nu3sC5MDGsl2N9NdFBbeHaNvYuR2oiATgw/D7ADOGMLQG+FaSLFwoX9Xbd0kiQZIMgjggQBfl5gB/BeJJgZD/F2BHucAeBCfkGzhQaMCPBztdd7Fuf00enkYBfA7GUEOzB6m8wWAvxLmDCRA3g/isElzu6RQ+dIkjgr2FF3Y1iU6xuWDQz8mXQ6R57RMAK8xYTpOTiUR2JtagqwX6EDq3aoPBoQdN+2PN+4hB9PO9SRQ071tRCy+gJAr/Ojj/Z6Eth/EUzpAXZwbD/yo8FZvM30W3KMMz5DiyWP2oZorpEsK8MjUAC4LouoAeyBI9iByftoqjyCGUOUurKyOqku5gqU22W0CGT5AI9MBw2/5+pUJoB9JgAOZ4s9HmjSZlnsd0d2F9KFVVmOMzkXQQaatDsCvD9AfKIqcqxdBvtAYnFXhm4XwO6RRW/1GdfKxPK2AT0CfP6sLkDTwlh7G23tH9Isl8P7czVn0NFeN+mN+qp+ySHMCapSpIMAn81WfwZ2+AcXVWRZWGEKGWYBnompu6A3Lio/NNwXENxeXnKdS+Mw6csJ7FkFR2Knhp9TvTEsI8GPc3vw+YeGjv46C8vjHCMoZ4vZlyqOUYc+lId6N9VrdCFTnzi84doYbf42M89jupX06zs+cxPzcol6CR1iaaAyf8DjvPWQ+S+SzhXsCHgTOOHNsZKyI5uA/IO84srSMWCReTtF2VssIeaf4IQ2NXprJ+Dxsu6Tni/h2onnWx30ezbN22P0PUkeJgPy/B+3blnNAegtfgAYThYB7MLEsJSXNr91A7vHiuMXYUWrsoOmnu9b5Q+W/gNs22y++2iup9Avlscr8O84B7ALfU5wXUU2Gx5fN2EGxQoBO8beTRGhYYrnrFs6UGhJvzCktzzq9yKBHe+UZ2risQhfKLxSdKuz50smBSgD9vcGWoGl/SbMPvLbMjx7h9cnmDhRLQMAuiz9Hi9FMbuN3dNGaEzPadywFSoWbVy1cbeB5R0XnZs608NSw6S6syyNLFoewsoGfwXGJWINKNsS4HVm3wzzjB3wCff/x9CO0aon2AMEzWEGsMMI6lYRYEdntZMX4FOye9LvkWPxHUMn67rUHdqtR3MG+wyJbJzgVPpK5LozhcUR3nS24SU7/SKjTfg4XaAgse5gkCI6E/qyu2LL60Yu15E4rPVt+Mk3TBvNGfD9HIhsiPUmH75v5ivTDzWHig9zsgmLBnsS4AcpfBTToFng0WF+M6TbwLiVxxsKw5LzBLwLodQ1bTGUdO4aCLeF96p1MxY2vURCcN7R5VOzNHaP+cfTTfKx6KmyGIpcy/FVGlo67tgRcBCBGGgIA1i+K4fLNKDQSRr2HMzRiR071EnXkWwCZt9RQnef8CGMxLCqFoQhnC9lArujTR17VFzT4guEOenlPX1YN5BSNVH8xDSr2jZtftyqBuidnHQHB+b7eYAd2X09R/s9M7vLLG8wp9aSfI5lEykUmxQQmUj2/cSnjJr0+hjn7NX358hISTb1wKPSW5ZOD/HcTo56e00fhrZKMT2hTItQQosTGibhSVp2aQyZ17ACw7KyAm6hl2Sj5sHuRcga+kquTnCT+U9+2yxRc7YM6T0X8sRrhhz4QCAniTZ8ScUFoE7hPM/FHXlJB9+yLtGYpqeJULYvFmqnXnvsDp1Uf+X+xhPOeU8C6MxjwYip85yybFOVhYC+e4ZyA4cGgw4ZeZZXdtkE594zvl+vJOBZ8gfM8mD3GXMYyncsY8ie7jMvs/zjaxvj57qZhx1cTBI7lLVVQqf41mCCBY5tLZ47rBzgXSIzPoC3VGhua1ITFon0FBs2ZPrJY7/xPMTErFjDbGK+/E4Jm9W0p2iIZt/Y8PZr4pEYt6+VFOx1D+fShQ0DQ0XNXJnF862kiyI8mViGE9CgA+iiQjt4HLIKCWzJgpO/dGuD9/Ioo6xOa9eR3a8cdygwdZ5u3pPcML+eix44FeM0Y5GzkoEe3k6FzYcoHeBxr3dX2zTRnLEszJ4UNWiGm0vpBky21YllOBT/mh8/sW/jCS4AHiBoXrPsuzS8CNPzUwOf+Yq5DS6B/Q+b437E+7SycPvDOwA+Yu6jwY2qbpiKNm1TShob1p7GGmd8UMYtOXAqxpbSOWKfPGolA3vLA+xXZQY7LiBRbfRbfOUzBPeYLZGgORhnyaNsJo2PAxlVsM03Uwwm6a5fqo5SSsDjB8hch8lnFfhYsAmUgcdbImL6OSXxsgK+FDY8OqpfPG455YAv9UxEtFdNe+vIC6Rjhc3raNu3LM54c1kBXxYb3tc86ZW9YXCQ6ojpY+0iDs+YXyze69u2ZNK8DLt3md+ErkFVvqmK4bkjlk8sHUKVrWVYRFJakwb3mImZ+w4JEIcNq/YRYTRvxPZ1TUcCEPvWQP31aTPXcgB+6OCo5vYRYV7er/x0yfM5N/x+D1v1iXOGcvbhzPP4eUHq2Vsffs87ftrn97wvusysZZXChucPmbSn/It9LTsL2BcF6HKnXZSOZ9Hvmp+uK+u04gDT3hwYHYavgdXfYBJERS55+htMb4hLeVmf5MbgJ2CbY57+FtO+8hMAZ1+9j//2P0xr4DVy9GWXHxv49zWwGL8e0s4knaY8/Z8KOx5LeYAuN8qz3GD6Z8xflHHAj3fSc4g0cc+ZdO0I83gn6QPyCX9T6xPK/l1KOoDOxNPP8DmFvDUxPep0rej3Huv1R+UZR5iX7hnPUZcndbu6gGAHG7VvADo4cE2ueJgTq0NDwvSDFWQTAcQPCFaR/gE7h8zS0CgNnr6BDT1CQJvuA5C8Uhr+AWTS9W8gP7zmE6YdaPTeQDCtIAj2BYilvEYiTeiE4NgVpoF0rSqvMP0G8wB9fpTzMNTnGzQJV/BZj/H5d6U8Dyz3i7o16ad7xg+6ZxQEI10LbfVuERm+rzipRZouDYWpRlL6rmAfKU2VS6zwBv69YbkPgA0d6pXy+43091Sj10hTLoDmDJmT4VtjAzuM7JRdK2VMHepkhHqq+nzmeTOLTgDEc+j8kl4H4vk1eaZtr6mmvZ49Iy9vxPU4kHQBhr+uLRi7R5LdDjPkooJt9Kn0ymPS35D+My/3QNFPB/gzbIj3yCwu9/notaEB1hSZXZgRnxFcN8LEksr+4GDSXTroAwx/qTiSOtDLpt9XyTxpoN4NA5Cf5anRT71/QyGMZx1Qygs67G5tgcAesG8TwyYYWozmUCw0xlRixakE5F8lJh7JdqdUoTfYKFNkFKf7XKpDYvCpyoo8/RjNGPl6eJZ9heFtZYOuX22AUfKXGf4S05imc31WWHeE136V7n8rmVtynY0M+gnTSn3GkfSWVXXZQBu+IZPYQoQlcTF2b45AL40g6x2rzE1S8igNb9AmNYcxCnNAtZKPlG4BCAlJFvlLgAEAUxLRvwSoGKkAAAAASUVORK5CYII%3D%22%7D%2C%22config%22%3A%7B%22attachment%22%3A%22Yes%22%2C%22callback%22%3A%22tcAsyncInit%22%7D%7D\" });\n" +
    "\t\t\t\t}\n" +
    "\t\t\t</script>\n" +
    "\t\t\t<script id=\"gs-sdk\" src='//www.buildquickbots.com/botwidget/v2/demo/static/js/sdk.js' key=\"982adf50-52d1-4a6e-8fe1-5ed8eec61c76\" callback=\"tcAsyncInit\" ></script>\n" +
    "\t\t\t"
     "  </head>\n" +
    "  <body>\n" +
    "<h2> Agira Technologies! </h2>\n" +
    "  </body>\n" +
    "</html>";
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