/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state,

export const job = (state = {}, { type, payload }) => {
    switch (type) {
        case 'job/saveListStatus':
            return { ...state, listStatus: payload };
        case 'job/saveListMaterial':
            return { ...state, listMaterial: payload };
        case 'job/saveMaterialCategoryList':
            return { ...state, listMaterialCategory: payload };
        case 'job/saveTruckList':
            return { ...state, listTruck: payload };
        case 'job/saveReferenceContactList':
            return { ...state, listReferenceContact: payload };
        default:
            return state;
    }
};
