'use strict';

const twilio = require('twilio');
const credentialsFromFile = require('../configuration.json');

const TokenProvider = {
  getToken: function(identity, endpointId) {

    var token = new twilio.jwt.AccessToken(
      credentialsFromFile.tokenGenerator.accountSid, 
      credentialsFromFile.tokenGenerator.signingKeySid, 
      credentialsFromFile.tokenGenerator.signingKeySecret, {
      identity: identity,
      ttl: 40000
    });

    var grant = new twilio.jwt.AccessToken.ChatGrant();
    // var grant = new twilio.AccessToken.IpMessagingGrant({ pushCredentialSid: 'CH81098aa16b704e6a8f288302a727b593' });

    grant.serviceSid = credentialsFromFile.tokenGenerator.serviceSid;
    grant.endpointId = credentialsFromFile.tokenGenerator.serviceSid + identity + endpointId;
    token.addGrant(grant);

    return token.toJwt();
  }
};

module.exports = TokenProvider;
