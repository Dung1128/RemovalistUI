export const getToken = (...args) => ({
    type: 'chat/getToken',
    args
})

// actions called by sagas

export const saveToken = (data) => ({
    type: 'chat/saveToken',
    payload: data,
})