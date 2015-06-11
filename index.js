'use strict';
var config = require('config');
var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var Respoke = require('respoke-admin');
var path = require('path');

var port = config.get('port');
var respokeAppId = config.get('respoke.appId');
var respokeAppSecret = config.get('respoke.appSecret');
var respokeRoleId = config.get('respoke.roleId');

if (!respokeAppId || !respokeAppSecret || !respokeRoleId) {
  throw new Error('Respoke is not configured. Please copy config/default.js to config/local.js and set the respoke ' +
    'configuration variables, or set the RESPOKE_APP_ID, RESPOKE_APP_SECRET, and RESPOKE_ROLE_ID env variables.');
}

var app = express();

var respokeClient = new Respoke({
  appId: respokeAppId,
  'App-Secret': respokeAppSecret
});

app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, 'public')));

app.post('/respoke/auth-token', function (req, res) {
  respokeClient.auth.endpoint({
    endpointId: req.body.endpointId,
    roleId: respokeRoleId
  }).then(function (authData) {
    res.send({ token: authData.tokenId });
  }).catch(function (err) {
    console.log('Error retrieving Respoke auth token', err);
    res.status(500).send({
      error: 'Internal Server Error',
      message: 'Unable to retrieve Respoke auth token',
      statusCode: 500
    });
  });
});

app.listen(port, function () {
  console.log('server listening on port ' + port);
});
