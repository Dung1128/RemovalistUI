import { apiPost, apiGetNoKey } from '~/store/api/common'

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


}
