import express from 'express';

import signupAction from './actions/signup.js';
import signinAction from './actions/signin.js';
import getProfileAction from './actions/getProfile.js';
import updateProfileAction from './actions/updateProfile.js';
import checkJwtToken from '../middlewares/checkJwtToken.js';
import getListUser from './actions/getListUser.js';
import updateStatus from './actions/updateStatus.js';
import registerValidation from './validations/registerValidation.js';
import loginValidation from './validations/loginValidation.js';
import updateProfileValidation from './validations/updateProfileValidation.js';
import getListRelatedUser from './actions/getListRelatedUser.js';

const router = express.Router(); 

router.post('/signup', registerValidation, signupAction);
router.post('/signin', loginValidation, signinAction);
router.put('/me', checkJwtToken, updateProfileValidation, updateProfileAction);
router.get('/me', checkJwtToken, getProfileAction);
router.put('/me/status', checkJwtToken, updateStatus, updateStatus);
router.get('/', checkJwtToken, getListUser);
router.get('/related', checkJwtToken, getListRelatedUser);

export default router;