const initialValues = {
    customer: [{
        username: '',
        phone: [{

        }],
        email: '',
        addressline1: '',
        addressline2: ''
    }],
    truck: {
        TruckId: 0,
        TruckName: 'Select Truck'
    },
    status: {
        JobStatusId: 0,
        StatusName: 'Select Status',
        JobStatusColor: 'fff'
    },
    datetime: {
        date: '',
        timeStart: '',
        timeEnd: ''
    }
}
export const validate = values => {
    const errors = {}
    if (values.customer) {
        const customerArrayErrors = []
        values.customer.forEach((customer, customerIndex) => {
            const customerErrors = {}
            if (!customer || !customer.username) {
                customerErrors.username = 'Required'
                customerArrayErrors[customerIndex] = customerErrors
            }
            if (customer && customer.phone && customer.phone.length) {
                const phoneArrayErrors = []
                customer.phone.forEach((phone, phoneIndex) => {
                    if (!phone || !phone.length) {
                        phoneArrayErrors[phoneIndex] = 'Required'
                    }
                })
                if (phoneArrayErrors.length) {
                    customerErrors.phone = phoneArrayErrors
                    customerArrayErrors[customerIndex] = customerErrors
                }
            }
            if (!customer || !customer.email) {
                customerErrors.email = 'Required'
                customerArrayErrors[customerIndex] = customerErrors
            }
            if (!customer || !customer.addressline1) {
                customerErrors.addressline1 = 'Required'
                customerArrayErrors[customerIndex] = customerErrors
            }
            if (!customer || !customer.addressline2) {
                customerErrors.addressline2 = 'Required'
                customerArrayErrors[customerIndex] = customerErrors
            }
        })
        if (customerArrayErrors.length) {
            errors.customer = customerArrayErrors
        }
    }
    if (values.status.JobStatusId == 0) {
        errors.status = 'Required'
    }
    if (values.truck.TruckId == 0) {
        errors.truck = 'Required'
    }
    if (values.datetime.TruckId == 0) {
        errors.datetime = 'Required'
    }
    return errors
}