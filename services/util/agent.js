const _ = require('lodash')
const http = require('superagent-promise')(require('superagent'), Promise)

const setHeaders = ( request, headers ) => {
  request.set('Accepts', 'application/json')
  request.set('Content-Type', 'application/json')
  _.each(headers, ( value, key ) => {
    request.set(key, value)
  })

  return request
}

export async function get( url, headers = {} ) {
  try {
    const response = await setHeaders(http.get(url), headers)

    return response
  } catch ( error ) {
    console.error(`Error performing get call: ${error}`) // eslint-disable-line
    throw error
  }
}

export async function post( url, body, headers = {} ) {
  try {
    const response = await setHeaders(http.post(url, body), headers)

    return response
  } catch ( error ) {
    console.error(`Error performing post call: ${error}`) // eslint-disable-line
    throw error
  }
}

export async function put( url, body, headers = {} ) {
  try {
    const response = await setHeaders(http.put(url, body), headers)

    return response
  } catch ( error ) {
    console.error(`Error performing put call: ${error}`) // eslint-disable-line
    throw error
  }
}
