import { apiPost, apiGetNoKey, apiGetNoData } from '~/store/api/common'

export default {
    getMaterialByCategory(data, accessToken) {
        return apiGetNoKey('/api/jobdetails/MaterialListByCategory/',data, accessToken)
    },

}
