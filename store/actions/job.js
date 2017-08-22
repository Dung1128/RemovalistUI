export const getStatusJobList = (...args) => ({
    type: 'job/getStatusJobList',
    args
})

export const getJobById = (...args) => ({
    type: 'job/getJobById',
    args
})

export const getMaterialList = (...args) => ({
    type: 'job/getMaterialList',
    args
})

export const getMaterialCategoryList = (...args) => ({
    type: 'job/getMaterialCategoryList',
    args
})

export const getTruckList = (...args) => ({
    type: 'job/getTruckList',
    args
})

export const getReferenceContactList = (...args) => ({
    type: 'job/getReferenceContactList',
    args
})

export const getJobByDate = (...args) => ({
    type: 'job/getJobByDate',
    args
})

export const getDeliveryJob = (...args) => ({
    type: 'job/getDeliveryJob',
    args
})

export const postDeliveryUpdate = (...args) => ({
    type: 'job/postDeliveryUpdate',
    args
})

export const postDeliveryCreate = (...args) => ({
    type: 'job/postDeliveryCreate',
    args
})
export const updateStatusJob = (...args) => ({
    type: 'job/updateStatusJob',
    args
})

export const postNewJob = (...args) => ({
    type: 'job/postNewJob',
    args
})



// actions called by sagas

export const saveListStatus = (data) => ({
    type: 'job/saveListStatus',
    payload: data,
})

export const saveListMaterial = (data) => ({
    type: 'job/saveListMaterial',
    payload: data,
})

export const saveMaterialCategoryList = (data) => ({
    type: 'job/saveMaterialCategoryList',
    payload: data,
})

export const saveTruckList = (data) => ({
    type: 'job/saveTruckList',
    payload: data,
})

export const saveReferenceContactList = (data) => ({
    type: 'job/saveReferenceContactList',
    payload: data,
})

export const saveJobByDate = (data) => ({
    type: 'job/saveJobByDate',
    payload: data,
})