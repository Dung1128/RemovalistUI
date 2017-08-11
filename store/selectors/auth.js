export const isLogged = state => state.auth.loggedIn;

export const getToken = state =>
    state.auth.token ? state.auth.token : null;

export const getUser = state => state.auth.user || {};
export const closed = state => state.auth.closed;
