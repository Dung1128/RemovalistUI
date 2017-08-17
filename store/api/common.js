
// default api_base for all request
import {
  API_BASE
} from '~/store/constants/api'

export const urlEncode = data => data
  ? Object.keys(data).map((key) => key + '=' + encodeURIComponent(data[key])).join('&')
  : ''

export const rejectErrors = (res) => {
  const { status } = res
  if (status >= 200 && status < 300) {
    return res
  }
  // we can get message from Promise but no need, just use statusText instead of
  // server return errors
  return Promise.reject({ message: res.statusText, status })
}

// try invoke callback for refresh token here
export const fetchJson = (url, options = {}, base = API_BASE) => {
  // in the same server, API_BASE is emtpy
  /// check convenient way of passing base directly
  return fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
    ...options,
    headers: {
      ...options.headers,
      //'Content-Type':'multipart/form-data',     
      'Accept': '',
      'Content-Type': 'application/json',
    },
  })
    .then(rejectErrors)
    // // default return empty json when no content
    // .then((res) => {
    //   console.log('res', res);
    //   return res.json();
    // })

    .then((res) => {


      return res.text().then((text) => {
        try {
          return JSON.parse(text);
          // Do your JSON handling here
        } catch (err) {
          // It is text, do you text handling here
          return {};
        }
      });
    })

}

export const fetchJsonLogin = (url, options = {}, base = API_BASE) => {
  return fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    // .then(rejectErrors)
    // .then((res) => {
    // console.log(res)
    //   const accessToken = res.headers.get("Access_token") || ''
    //   return res.json().then((data) => {
    //     data.access_token = accessToken
    //     return data
    //   })
    // });

    .then((res) => {

      const access_token = res.headers.get("Access_token") || ''
      return res.text().then((text) => {
        try {
          return { ...JSON.parse(text), access_token };
          // Do your JSON handling here
        } catch (err) {
          // It is text, do you text handling here
          return {};
        }
      });
    })
}

export const fetchJsonWithToken = (token, url, options = {}, ...args) => {
  return (
    fetchJson(url, {
      ...options,
      headers: {
        ...options.header,

        Authorization: `Bearer ${token.accessToken || token}`,
      },
    }, ...args)
  )
}

// default is get method, we can override header with method:PUT for sample
export const apiCall = (url, options, token = null) =>
  token ? fetchJsonWithToken(token, url, options) : fetchJson(url, options)

// must have data to post, put should not return data
export const apiPost = (url, data, token, method = 'POST') =>
  apiCall(url, { method, body: JSON.stringify(data) }, token)

export const apiGet = (url, data, token, method = 'GET') =>
  apiCall(url + '?' + urlEncode(data), { method }, token)

export const apiGetNoKey = (url, data, token, method = 'GET') =>
  apiCall(url + data, { method }, token)

export const apiGetNoData = (url, token, method = 'GET') =>
  apiCall(url, { method }, token)

export const apiPut = (url, data, action, token, method = 'PUT') =>
  apiCall(url + data + action, { method }, token)

export const apiPutNoData = (url, token, method = 'PUT') =>
  apiCall(url, { method }, token)

export const apiPutData = (url, data, token, method = 'PUT') =>
  apiCall(url, { method, body: JSON.stringify(data) }, token)
// if we want to fetch blob data with progress support, we should use fetchBlob, such as download from uri to local, then cache it
// https://github.com/wkh237/react-native-fetch-blob  

