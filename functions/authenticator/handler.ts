import {ProxyHandler} from 'aws-lambda'
import * as fetch from 'isomorphic-fetch'
import * as qs from 'querystring'
import {URI} from '../../constants'

export const github: ProxyHandler = async (event, context, cb) => {
  const {code} = event.queryStringParameters
  const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} = process.env

  try {
    const result = await fetch(
      `https://github.com/login/oauth/access_token?${qs.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code
      })}`,
      {method: 'post'}
    )
    const tokens = await result.text()
    const {access_token} = qs.parse(tokens)
    if (!access_token) {
      return cb(null, {
        statusCode: 500,
        body: result.statusText
      })
    }
    try {
      cb(null, {
        statusCode: 302,
        headers: {
          Location: `http://${URI.TICKETS}/authorized/github?${qs.stringify({access_token})}`
        },
        body: ''
      })
    } catch(ex) {
      cb(null, {statusCode: 403, body: JSON.stringify(ex)})
    }
  } catch(ex) {
    cb(null, {statusCode: 500, body: JSON.stringify(ex)})
  }
}
