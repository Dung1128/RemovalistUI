import { initialState } from '~/store/reducers/job'

export const getStatusJobList = state => state.job.listStatus || initialState.listStatus;
export const getMaterialList = state => state.job.listMaterial;
export const getMaterialCategoryList = state => state.job.listMaterialCategory;
export const getTruckList = state => state.job.listTruck;
export const getReferenceContactList = state => state.job.listReferenceContact;
export const getJobByDate = state => state.job.listJobByDate;
export const getGST = state => state.job.GST;
export const getPaymentMethods = state => state.job.paymentMethods;
//====== Updated ====
export const getStatusJobListUpdated = state => state.job.listStatusUpdated;
export const getMaterialListUpdated = state => state.job.listMaterialUpdated;
export const getMaterialCategoryListUpdated = state => state.job.listMaterialCategoryUpdated;
export const getTruckListUpdated = state => state.job.listTruckUpdated;
export const getReferenceContactListUpdated = state => state.job.listReferenceContactUpdated;
export const getPaymentMethodsUpdated = state => state.job.paymentMethodsUpdated;
