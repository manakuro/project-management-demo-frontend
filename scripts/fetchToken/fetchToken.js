const fetch = require('node-fetch')
const body = require('./user.json')

const fetchToken = () =>
  fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

module.exports.fetchToken = fetchToken
