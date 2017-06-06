const Alexa = require('alexa-sdk');
const request = require('request');
const {apiKey, appId, serverAddress} = require('./config.json');

const skillName = 'TV Remote';

const CODES = {
  POWER: 'power',
  NETFLIX: 'netflix',
  APPS: 'apps',
  MUTE: 'mute',
  VOLUME_UP: 'volup,volup,volup,volup,volup',
  VOLUME_DOWN: 'voldown,voldown,voldown,voldown,voldown',
  VOLUME_UP_HIGH: 'volup,volup,volup,volup,volup,volup,volup,volup,volup,volup',
  VOLUME_DOWN_HIGH: 'voldown,voldown,voldown,voldown,voldown,voldown,voldown,voldown,voldown,voldown',
  PLAY_PAUSE: 'play'
};

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

    "TVIntent"() {
      makeRequest(CODES.POWER).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "NetflixIntent"() {
      makeRequest(CODES.NETFLIX).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "AppsIntent"() {
      makeRequest(CODES.APPS).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "MuteIntent"() {
      makeRequest(CODES.MUTE).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "VolUpIntent"() {
      makeRequest(CODES.VOLUME_UP).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "VolDownIntent"() {
      makeRequest(CODES.VOLUME_DOWN).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "VolUpHighIntent"() {
      makeRequest(CODES.VOLUME_UP_HIGH).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "VolDownHighIntent"() {
      makeRequest(CODES.VOLUME_DOWN_HIGH).then(
        (success) => {
          this.emit(':tellWithCard', 'Ok', skillName, 'Ok');
        },
        (error) => {
          this.emit(':tellWithCard', 'No', skillName, 'No');
          console.log(error);
        }
      );
    },

    "PlayPauseIntent"() {
      makeRequest(CODES.PLAY_PAUSE).then(
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
