const fetch = require('node-fetch')
const body = require('./user.json')

const token = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`

const fetchToken = () =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

module.exports.fetchToken = fetchToken
