import moment from 'moment'

export const validate = (values, { navigation }) => {
    const errors = {}
    // prev props
    const params = navigation.state.params
    if (values.pickup) {
        const pickupArrayErrors = []
        values.pickup.forEach((pickup, pickupIndex) => {
            const pickupErrors = {}
            if (moment(pickup.Time).format('HH:mm') < moment(params.datetime.timeStart).format('HH:mm')) {
                pickupErrors.Time = 'Time must be more than ' + moment(params.datetime.timeStart).format('HH:mm')
                pickupArrayErrors[pickupIndex] = pickupErrors
            }
            if (params.status.JobStatusId != 1) {
                if (!pickup || !pickup.AddressLine1) {
                    pickupErrors.AddressLine1 = 'Required'
                    pickupArrayErrors[pickupIndex] = pickupErrors
                }
                if (!pickup || !pickup.AddressLine2) {
                    pickupErrors.AddressLine2 = 'Required'
                    pickupArrayErrors[pickupIndex] = pickupErrors
                }

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
            if (moment(dropoff.Time).format('HH:mm') > moment(params.datetime.timeEnd).format('HH:mm')) {
                dropoffErrors.Time = 'Time must be less than ' + moment(params.datetime.timeEnd).format('HH:mm')
                dropoffArrayErrors[dropoffIndex] = dropoffErrors
            }
            if (params.status.JobStatusId != 1) {
                if (!dropoff || !dropoff.AddressLine1) {
                    dropoffErrors.AddressLine1 = 'Required'
                    dropoffArrayErrors[dropoffIndex] = dropoffErrors
                }
                if (!dropoff || !dropoff.AddressLine2) {
                    dropoffErrors.AddressLine2 = 'Required'
                    dropoffArrayErrors[dropoffIndex] = dropoffErrors
                }
            }
        })
        if (dropoffArrayErrors.length) {
            errors.dropoff = dropoffArrayErrors
        }
    }
    return errors
}