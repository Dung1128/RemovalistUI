export const initialValues = {
    servicetime: {
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        input: '',
    },
    traveltime: {
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        input: '',
    },
    fuel: {
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        input: '',
    },
    material: [{
        status: {
            Name: 'Select Type',
            CategoryId: 0
        },
        input: '',
    }],
    surcharge: {
        note: '',
        price: '',
    }
}
export const validate = values => {
    const errors = {}

    if (values.servicetime) {
        let servicetimeErrors = {};
        if (values.servicetime.status.CategoryId == 0) {
            servicetimeErrors.status = 'Required'
        }
        if (!values.servicetime.input) {
            servicetimeErrors.input = 'Required'
        }
        if (servicetimeErrors.length) {
            errors.servicetime = servicetimeErrors
        }

    }
    if (values.traveltime) {
        let traveltimeErrors = {};
        if (values.traveltime.status.CategoryId == 0) {
            traveltimeErrors.status = 'Required'
        }
        if (!values.traveltime.input) {
            traveltimeErrors.input = 'Required'
        }
        if (traveltimeErrors.length) {
            errors.traveltime = traveltimeErrors
        }

    }
    if (values.fuel) {
        let fuelErrors = {};
        if (values.fuel.status.CategoryId == 0) {
            fuelErrors.status = 'Required'
        }
        if (!values.fuel.input) {
            fuelErrors.input = 'Required'
        }
        if (fuelErrors.length) {
            errors.fuel = fuelErrors
        }

    }
    if (values.material) {
        const materialArrayErrors = []
        values.material.forEach((material, materialIndex) => {
            const materialErrors = {}
            if (!material || material.status.CategoryId == 0) {
                materialErrors.status = 'Required'
                materialArrayErrors[materialIndex] = materialErrors
            }
            if (!material || !material.input) {
                materialErrors.input = 'Required'
                materialArrayErrors[materialIndex] = materialErrors
            }
        })
        if (materialArrayErrors.length) {
            errors.material = materialArrayErrors
        }
    }

    console.log(errors)
    return errors
}