export const initialValues = {
    servicetime: {
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        NumberOfMaterial: '',
    },
    traveltime: {
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        NumberOfMaterial: '',
    },
    fuel: {
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        NumberOfMaterial: '',
    },
    material: [{
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        NumberOfMaterial: '',
    }],
}
export const validate = (values, { navigation }) => {
    const errors = {}
    if (navigation.state.params.general.status.JobStatusId != 1) {
        if (values.servicetime) {
            if (values.servicetime.status.CategoryId == 0) {
                errors.servicetime = 'Required'
            }
            if (!values.servicetime.NumberOfMaterial) {
                errors.servicetime = 'Required'
            }
        }

    }

    return errors
}