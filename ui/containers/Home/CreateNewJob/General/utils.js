export const validate = values => {

    const errors = {}
    if (values.Contact) {
        const ContactArrayErrors = []
        values.Contact.forEach((Contact, ContactIndex) => {
            const ContactErrors = {}
            if (!Contact || !Contact.CompanyName) {
                ContactErrors.CompanyName = 'Required'
                ContactArrayErrors[ContactIndex] = ContactErrors
            }
            if (Contact && Contact.Phone && Contact.Phone.length) {
                const PhoneArrayErrors = []
                var reValidatePhone = new RegExp("^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$");
                Contact.Phone.forEach((Phone, PhoneIndex) => {
                    if (!Phone || !Phone.length) {
                        PhoneArrayErrors[PhoneIndex] = 'Required'
                    } else if (!reValidatePhone.test(Phone)) {
                        PhoneArrayErrors[PhoneIndex] = 'Invalid number'
                    }
                })
                if (PhoneArrayErrors.length) {
                    ContactErrors.Phone = PhoneArrayErrors
                    ContactArrayErrors[ContactIndex] = ContactErrors
                }
            }
            if (!Contact || !Contact.Email) {
                ContactErrors.Email = 'Required'
                ContactArrayErrors[ContactIndex] = ContactErrors
            } else if (!Contact || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Contact.Email)) {
                ContactErrors.Email = 'Invalid Email address'
                ContactArrayErrors[ContactIndex] = ContactErrors
            }
            if (!Contact || !Contact.AddressLine1) {
                ContactErrors.AddressLine1 = 'Required'
                ContactArrayErrors[ContactIndex] = ContactErrors
            }
            if (!Contact || !Contact.AddressLine2) {
                ContactErrors.AddressLine2 = 'Required'
                ContactArrayErrors[ContactIndex] = ContactErrors
            }
        })
        if (ContactArrayErrors.length) {
            errors.Contact = ContactArrayErrors
        }
    }
    if (values.datetime) {
        let datetimeErrors = {};
        if (new Date(values.datetime.date).toLocaleDateString() < new Date().toLocaleDateString()) {
            datetimeErrors.date = "Date is can't be less than date now";
        }
        if (new Date(values.datetime.timeStart).toTimeString() < new Date().toTimeString()) {
            datetimeErrors.timeEnd = "Time is can't be less than time now";
        }
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