
export const saveDayFilterSelected = (data) => ({
    type: 'filter/saveDayFilterSelected',
    payload: data,
})

export const saveTruckFilterSelected = (data) => ({
    type: 'filter/saveTruckFilterSelected',
    payload: data,
})


export const resetFilter = (data) => ({
    type: 'filter/resetFilter',
    payload: data,
})