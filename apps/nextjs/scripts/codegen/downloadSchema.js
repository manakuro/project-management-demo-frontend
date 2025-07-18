const fs = require('fs')
const https = require('https')
const { getIntrospectionQuery } = require('graphql/utilities')
const fetch = require('node-fetch')

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

module.exports.downloadSchema = async function downloadSchema(
  url,
  outputPath,
  additionalHeaders,
  insecure,
) {
  const headers = { ...defaultHeaders, ...additionalHeaders }
  const agent = insecure
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined

  let result
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: getIntrospectionQuery() }),
      agent,
    })

    result = await response.json()
  } catch (error) {
    throw new Error(
      `Error while fetching introspection query result: ${error.message}`,
    )
  }

  if (result.errors) {
    throw new Error(`Errors in introspection query result: ${result.errors}`)
  }

  const schemaData = result
  if (!schemaData.data) {
    throw new Error(
      `No introspection query result data found, server responded with: ${JSON.stringify(
        result,
      )}`,
    )
  }

  fs.writeFileSync(outputPath, JSON.stringify(schemaData, null, 2))
}
