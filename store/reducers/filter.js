/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state,
export const initialState = {
    dayFilterSelected: {
        id: 0,
        name: 'Today'
    },
    truckFilterSelected: {
        TruckId: 0,
        TruckName: 'All trucks'
    },
}
export const filter = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'filter/saveDayFilterSelected':
            return { ...state, dayFilterSelected: payload };
        case 'filter/saveTruckFilterSelected':
            return { ...state, truckFilterSelected: payload };
        case 'filter/resetFilter':
            return initialState;
        default:
            return state;
    }
};
