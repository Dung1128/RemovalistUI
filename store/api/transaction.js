/**
 * Created by vjtc0n on 7/26/17.
 */

import { apiPost, apiGet } from '~/store/api/common'

export default {
  
  getListTransaction (accessToken, data) {
    return apiPost(`/plan/getbycusid`, data, accessToken)
  },
  
  
}
