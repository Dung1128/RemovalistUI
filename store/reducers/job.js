/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state,

export const job = (state = {}, { type, payload }) => {
    switch (type) {
        case 'job/saveListStatus':
            // payload is access token
            return { ...state, listStatus: payload };
        default:
            return state;
    }
};
