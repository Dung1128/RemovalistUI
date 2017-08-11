import { apiPost, apiGetNoKey, apiGetNoData } from '~/store/api/common'

export default {

    getListJob(data, accessToken) {
        return apiGetNoKey(`/api/jobdetails/JobDetailList/`, data, accessToken)
    },

    getStatusJobList(accessToken) {
        return apiGetNoData(`/api/jobdetails/JobStatusList`, accessToken)
    },

    getJobById(data, accessToken) {
        return apiGetNoKey(`/api/jobdetails/`, data, accessToken)
    },


}
