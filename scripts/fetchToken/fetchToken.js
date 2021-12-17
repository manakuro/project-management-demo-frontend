const fetch = require('node-fetch')
const body = require('./user.json')

const fetchToken = () =>
  fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLmnQHrJp82QbH_gnX7EMj7F-onhwePYY',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )

module.exports.fetchToken = fetchToken
