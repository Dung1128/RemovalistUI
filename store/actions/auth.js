// use best comment like this
export const login = (...args) => ({
  type: 'app/login',
  args
});

export const logout = (...args) => ({
  type: 'app/logout',
  args
});

// actions called by sagas

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuthState = newAuthState => ({
  type: 'app/setAuthState',
  payload: newAuthState
});

export const saveLoggedUser = (token) => ({
  type: 'app/saveLoggedUser',
  payload: {
    token
  }
});

export const saveFirebaseUser = payload => ({
  type: 'app/saveLoggedUser',
  payload
});

// data: {accessToken...}
export const saveRefreshToken = data => ({
  type: 'app/saveRefreshToken',
  payload: data
});

/**
 * Tells the app we want to log out a user
 */
export const removeLoggedUser = () => ({
  type: 'app/removeLoggedUser'
});

export const closeIntro = () => ({
  type: 'app/closeIntro',
  payload: true
});

export const register = (...args) => ({
  type: 'app/register',
  args
});
