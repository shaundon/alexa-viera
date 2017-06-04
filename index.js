const Alexa = require('alexa-sdk');
const request = require('request');
const {apiKey, appId, serverAddress} = require('./config.json');

const skillName = 'TV Remote';

const makeRequest = (command) => {
  return new Promise((fulfill, reject) => {
    request({
      method: 'GET',
      uri: `${serverAddress}?command=${command}`,
      headers: {
        'Authorization': apiKey
      }
    }, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(err);
        return;
      }
      fulfill(body);
    })
  });
};

var handlers = {

    "TVIntent": function () {
      makeRequest('power').then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "NetflixIntent": function () {
      makeRequest('netflix').then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "MuteIntent": function () {
      makeRequest('mute').then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "VolUpIntent": function () {
      makeRequest('volup').then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "VolDownIntent": function () {
      makeRequest('voldown').then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "PlayPauseIntent": function () {
      makeRequest('enter').then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "AboutIntent": function () {
        const speechOutput = `
        TV remote was developed by Shaun Donnelly because he's too lazy
        to look for the remote.`;
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "AMAZON.HelpIntent": function () {
        const speechOutput = `
        Here are some things you can say:
        Turn on the TV.
        Turn on Netflix.
        You can also say 'stop' if you're done.
        So how can I help?`;
        this.emit(':ask', speechOutput, speechOutput);
    },

    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "LaunchRequest": function () {
      const speechText = `
      Welcome to ${skillName}. For instructions on what you
      to ask, say 'help me'.`;
      const repromptText = `For instructions, say 'help me'.`
      this.emit(':ask', speechText, repromptText);
    }

};

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
