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
                var reValidatePhone = new RegExp("^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$");
                customer.phone.forEach((phone, phoneIndex) => {
                    if (!phone || !phone.length) {
                        phoneArrayErrors[phoneIndex] = 'Required'
                    } else if (!reValidatePhone.test(phone)) {
                        phoneArrayErrors[phoneIndex] = 'Invalid number'
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
            } else if (!customer || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(customer.email)) {
                customerErrors.email = 'Invalid email address'
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
    if (values.datetime) {
        let datetimeErrors = {};
        if (!values.datetime.timeStart || !values.datetime.timeEnd) {
            datetimeErrors.timeEnd = 'Required';
        }
        if (values.datetime.timeStart > values.datetime.timeEnd) {
            datetimeErrors.timeEnd = 'Start time is required to be less than end time'
        }
        if (datetimeErrors && datetimeErrors.timeEnd) {
            errors.datetime = datetimeErrors;
        }

    }
    // check status
    if (values.status.JobStatusId != 1) {
        if (values.truck.TruckId == 0) {
            errors.truck = 'Required'
        }
    }
    return errors
}