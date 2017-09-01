import { apiGetNoData } from '~/store/api/common'

export default {
    getToken(deviceId,name, mail ) {
        return apiGetNoData(`/api/token/token?device=${deviceId}&identity=${name};${mail}`)
    },

}
