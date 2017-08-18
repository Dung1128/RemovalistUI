import { apiPost, apiGetNoKey, apiGetNoData } from '~/store/api/common'

export default {

    getListJob(data, accessToken) {
        return apiGetNoKey(`/api/jobdetails/JobDetailList/`, data, accessToken)
    },
    postNewJob(data, accessToken) {
        console.log(accessToken, data);
        return apiPost(`/api/jobdetails`, data, accessToken);
    },
    getJobByDate(data, accessToken) {
        return apiGetNoKey('/api/jobdetails/JobItemListByDate/', data, accessToken)
    },

    getStatusJobList(accessToken) {
        return apiGetNoData(`/api/jobdetails/JobStatusList`, accessToken)
    },

    getJobById(data, accessToken) {
        return apiGetNoKey(`/api/jobdetails/`, data, accessToken)
    },

    getMaterialList(accessToken) {
        return apiGetNoData(`/api/jobdetails/MaterialList`, accessToken)
    },

    getMaterialCategoryList(accessToken) {
        return apiGetNoData(`/api/jobdetails/MaterialCategoryList`, accessToken)
    },

    getTruckList(accessToken) {
        return apiGetNoData(`/api/jobdetails/TruckList`, accessToken)
    },

    getReferenceContactList(accessToken) {
        return apiGetNoData(`/api/jobdetails/ReferenceContactList`, accessToken)
    },

    getDeliveryJob(data, accessToken) {
        return apiGetNoKey(`/api/jobdetails/getDeliveryByJobId/`, data, accessToken)
    },
    postDeliveryUpdate(data, accessToken) {
        return apiPost(`/api/JobDetails/updateDelivery`, data, accessToken)
    },

    postDeliveryCreate(data, accessToken) {
        return apiPost(`/api/JobDetails/createDelivery`, data, accessToken)
    },
    updateStatusJob(data, accessToken) {
        return apiPost(`/api/JobDetails/UpdateJobDetailsStatus`, data, accessToken)
    }

}
