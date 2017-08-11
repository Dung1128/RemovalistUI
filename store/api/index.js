import auth from './auth';
import job from './job';
// we compose all api for each category here as single entry point
// api will be an single entry point for all frame methods
// this is where common functions are put
export default {
  auth,
  job,
};
