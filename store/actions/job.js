export const getStatusJobList = (...args) => ({
    type: 'job/getStatusJobList',
    args
})

export const getJobById = (...args) => ({
    type: 'job/getJobById',
    args
})


// actions called by sagas

export const saveListStatus = (data) => ({
    type: 'job/saveListStatus',
    payload: data,
})