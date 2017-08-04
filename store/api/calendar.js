/**
 * Created by vjtc0n on 7/21/17.
 */
import { apiPost, apiGet } from '~/store/api/common'

export default {
  
  getTopMaid (accessToken, data) {
    return apiPost(`/order/getmaid`, data, accessToken)
  },
  
  pushPeriodicalOrder (accessToken, data) {
    return apiPost(`/order/createperiodical`, data, accessToken)
  },
  
  pushPersonalOrder (accessToken, data) {
    return apiPost(`/order/create`, data, accessToken)
  },
  
  getTotalPrice (accessToken, data) {
    return apiPost(`/order/totalprice`, data, accessToken)
  },
  
}