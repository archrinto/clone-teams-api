import express from 'express';

import signupAction from './actions/signup.js';
import signinAction from './actions/signin.js';
import getProfileAction from './actions/getProfile.js';
import updateProfileAction from './actions/updateProfile.js';
import checkJwtToken from '../middlewares/checkJwtToken.js';

const router = express.Router(); 

router.post('/signup', signupAction);
router.post('/signin', signinAction);
router.put('/me', checkJwtToken, updateProfileAction);
router.get('/me', checkJwtToken, getProfileAction);

export default router;