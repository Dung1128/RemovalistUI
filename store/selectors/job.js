import { initialState } from '~/store/reducers/job'

export const getStatusJobList = state => state.job.listStatus || initialState.listStatus;
export const getMaterialList = state => state.job.listMaterial;
export const getMaterialCategoryList = state => state.job.listMaterialCategory;
export const getTruckList = state => state.job.listTruck;
export const getReferenceContactList = state => state.job.listReferenceContact;
export const getJobByDate = state => state.job.listJobByDate;
export const getGST = state => state.job.GST;
export const getPaymentMethods = state => state.job.paymentMethods;
