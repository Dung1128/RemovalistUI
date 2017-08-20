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
    surcharge: {
        note: '',
        price: '',
    }
}
export const validate = (values, { navigation }) => {
    const errors = {}
    if (navigation.state.params.general.status.JobStatusId != 1) {
        if (values.servicetime) {
            let servicetimeErrors = {};
            if (values.servicetime.status.CategoryId == 0) {
                servicetimeErrors.status = 'Required'
            }
            if (!values.servicetime.NumberOfMaterial) {
                servicetimeErrors.NumberOfMaterial = 'Required'
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
            if (!values.traveltime.NumberOfMaterial) {
                traveltimeErrors.NumberOfMaterial = 'Required'
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
            if (!values.fuel.NumberOfMaterial) {
                fuelErrors.NumberOfMaterial = 'Required'
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
                if (!material || !material.NumberOfMaterial) {
                    materialErrors.NumberOfMaterial = 'Required'
                    materialArrayErrors[materialIndex] = materialErrors
                }
            })
            if (materialArrayErrors.length) {
                errors.material = materialArrayErrors
            }
        }
    }

    return errors
}