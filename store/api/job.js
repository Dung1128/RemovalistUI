import { apiPost, apiGetNoKey, apiGetNoData } from '~/store/api/common'

export default {

    getListJob(data, accessToken) {
        return apiGetNoKey(`/api/jobdetails/JobDetailList/`, data, accessToken)
    },
    createJob(data, accessToken) {

    return apiPost(`/api/jobdetails`, {      
      data,
      accessToken
    });
  },
  getJobByDate(data, accessToken) {
      return apiGetNoKey('/api/jobdetails/JobItemListByDate/',data, accessToken)
  },

getStatusJobList(accessToken) {
    return apiGetNoData(`/api/jobdetails/JobStatusList`, accessToken)
},

getJobById(data, accessToken) {
    return apiGetNoKey(`/api/jobdetails/`, data, accessToken)
},


}