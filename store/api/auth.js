import { apiPost, apiPostLogin, apiGet } from '~/store/api/common';

export default {
  login(username, password) {
    return apiPostLogin('/apilogin', {
      username,
      password
    });
  },

  refreshAccessToken(refreshToken) {
    return apiPost('/auth/token', {
      refreshToken
    });
  },

  reject(refreshToken) {
    return apiPost('/auth/reject', {
      refreshToken
    });
  },

  /**
  * Logs the current user out
  */
  logout(accessToken) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiGet('/apilogout', {}, accessToken);
  },

  register(username, mobile, password, usertype) {
    return apiPost('/user/adduser', {
      username,
      mobile,
      password,
      usertype: '4'
    });
  }
};
