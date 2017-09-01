/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state,
export const initialState = {}
export const chat = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'chat/saveToken':
            return { ...state, token: payload.token };
        default:
            return state;
    }
};
