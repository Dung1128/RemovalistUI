import moment from 'moment'
import { store } from '~/store/config'
import { formValueSelector } from 'redux-form';

const formCustomerSelectors = formValueSelector('CustomerInfo')

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
export const validate = (values, { navigation }) => {
    const errors = {}
    // prev props
    const params = navigation.state.params
    if (params.status.JobStatusId != 1) {
        if (values.pickup) {
            const pickupArrayErrors = []
            values.pickup.forEach((pickup, pickupIndex) => {
                const pickupErrors = {}
                if (!pickup || !pickup.Time) {
                    pickupErrors.Time = 'Required'
                    pickupArrayErrors[pickupIndex] = pickupErrors
                }
                if (new Date(pickup.Time) < new Date(params.datetime.timeStart)) {
                    pickupErrors.Time = 'Time must be more than' + params.datetime.timeStart
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
                if (new Date(dropoff.Time) > new Date(params.datetime.timeEnd)) {
                    dropoffErrors.Time = 'Time must be less than' + params.datetime.timeEnd
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
    }
    return errors
}