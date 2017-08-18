import moment from 'moment'

export const initialValues = {
    pickup: [{
        Time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        AddressLine1: '',
        AddressLine2: '',
        Notes: ''
    }],
    dropoff: [{
        Time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        AddressLine1: '',
        AddressLine2: '',
        Notes: ''
    }],
}
export const validate = values => {
    const errors = {}
    if (values.pickup) {
        const pickupArrayErrors = []
        values.pickup.forEach((pickup, pickupIndex) => {
            const pickupErrors = {}
            if (!pickup || !pickup.Time) {
                pickupErrors.Time = 'Required'
                pickupArrayErrors[pickupIndex] = pickupErrors
            }
            if (!pickup || !pickup.AddressLine1) {
                pickupErrors.AddressLine1 = 'Required'
                pickupArrayErrors[pickupIndex] = pickupErrors
            }
            if (!pickup || !pickup.AddressLine2) {
                pickupErrors.AddressLine2 = 'Required'
                pickupArrayErrors[pickupIndex] = pickupErrors
            }
        })
        if (pickupArrayErrors.length) {
            errors.pickup = pickupArrayErrors
        }
    }
    if (values.dropoff) {
        const dropoffArrayErrors = []
        values.dropoff.forEach((dropoff, dropoffIndex) => {
            const dropoffErrors = {}
            if (!dropoff || !dropoff.Time) {
                dropoffErrors.Time = 'Required'
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
            if (!dropoff || !dropoff.AddressLine1) {
                dropoffErrors.AddressLine1 = 'Required'
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
            if (!dropoff || !dropoff.AddressLine2) {
                dropoffErrors.AddressLine2 = 'Required'
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
        })
        if (dropoffArrayErrors.length) {
            errors.dropoff = dropoffArrayErrors
        }
    }
    return errors
}