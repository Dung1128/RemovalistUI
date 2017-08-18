export const initialValues = {
    pickup: [{
        time: new Date(),
        addressline1: '',
        addressline2: '',
        note: ''
    }],
    dropoff: [{
        time: new Date(),
        addressline1: '',
        addressline2: '',
        note: ''
    }],
}
export const validate = values => {
    const errors = {}
    if (values.pickup) {
        const pickupArrayErrors = []
        values.pickup.forEach((pickup, pickupIndex) => {
            const pickupErrors = {}
            if (!pickup || !pickup.time) {
                pickupErrors.time = 'Required'
                pickupArrayErrors[pickupIndex] = pickupErrors
            }
            if (!pickup || !pickup.addressline1) {
                pickupErrors.addressline1 = 'Required'
                pickupArrayErrors[pickupIndex] = pickupErrors
            }
            if (!pickup || !pickup.addressline2) {
                pickupErrors.addressline2 = 'Required'
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
            if (!dropoff || !dropoff.time) {
                dropoffErrors.time = 'Required'
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
            if (!dropoff || !dropoff.addressline1) {
                dropoffErrors.addressline1 = 'Required'
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
            if (!dropoff || !dropoff.addressline2) {
                dropoffErrors.addressline2 = 'Required'
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
        })
        if (dropoffArrayErrors.length) {
            errors.dropoff = dropoffArrayErrors
        }
    }
    return errors
}