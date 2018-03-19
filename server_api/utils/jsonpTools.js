const got = require('got')
/**
 * Method 1 convert jsonp() to json
 */
exports.convertJsonp = async function (request, url) {
  const response = await got.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    query: request.query
  })
  let ret = response.body
  if (typeof ret === 'string') {
    const reg = /^\w+\(({[^]+})\)$/
    const matches = ret.match(reg)
    if (matches) {
      ret = JSON.parse(matches[1])
    }
  }
  return ret
}
/**
 * Methods 2 ToFix Json Data Format error
 */
exports.FixJsonp = async function (request, url) {
  const response = await got.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    query: request.query
  })
  return JSON.parse(response.body)
}
