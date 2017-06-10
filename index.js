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
  PLAY: 'play',
  PAUSE: 'pause'
};

const makeRequest = (command, context) => {
  request({
    method: 'GET',
    uri: `${serverAddress}?command=${command}`,
    headers: {'Authorization': apiKey},
  }, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      context.emit(':tell', 'No');
      console.error(error);
      return;
    }
    context.emit(':tell', 'Ok');
  });
};

var handlers = {

    "PowerIntent"() {
      makeRequest(CODES.POWER, this);
    },

    "NetflixIntent"() {
      makeRequest(CODES.NETFLIX, this);
    },

    "AppsIntent"() {
      makeRequest(CODES.APPS, this);
    },

    "MuteIntent"() {
      makeRequest(CODES.MUTE, this);
    },

    "VolUpIntent"() {
      makeRequest(CODES.VOLUME_UP, this);
    },

    "VolDownIntent"() {
      makeRequest(CODES.VOLUME_DOWN, this);
    },

    "VolUpHighIntent"() {
      makeRequest(CODES.VOLUME_UP_HIGH, this);
    },

    "VolDownHighIntent"() {
      makeRequest(CODES.VOLUME_DOWN_HIGH, this);
    },

    "PlayIntent"() {
      makeRequest(CODES.PLAY, this);
    },

    "PauseIntent"() {
      makeRequest(CODES.PLAY, this);
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
