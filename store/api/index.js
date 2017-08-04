import auth from './auth';
import calendar from './calendar';
import transaction from './transaction';
import account from './account';
// we compose all api for each category here as single entry point
// api will be an single entry point for all frame methods
// this is where common functions are put
export default {
  auth,
  calendar,
  transaction,
  account
};
