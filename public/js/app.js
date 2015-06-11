;(function () {
  /* global
    window: false,
    fetch: false,
    respoke: false,
    chance: false
   */
  'use strict';

  function getToken(endpointId) {
    return fetch('/respoke/auth-token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        endpointId: endpointId
      })
    }).then(function (response) {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new Error(response.statusText);
      }

      return response.json();
    }).then(function (json) {
      return json.token;
    });
  }

  var client = window.client = respoke.createClient({
    developmentMode: false
  });

  var endpointId = chance.word({ syllables: 3 });

  getToken(endpointId).then(function (token) {
    return client.connect({ token: token });
  }).then(function () {
    console.log('Connected to Respoke!');
  }).catch(function (err) {
    console.log('Error connecting to Respoke', err);
  });
})();
