import express from 'express';

import addParticipant from './actions/addParticipant.js';
import createChat from './actions/createChat.js';
import getListChat from './actions/getListChat.js';
import getListMessage from './actions/getListMessage.js';
import getListParticipant from './actions/getListParticipant.js';
import checkJwtToken from '../middlewares/checkJwtToken.js';
import addChatMessage from './actions/addChatMessage.js';
import getOneChat from './actions/getOneChat.js';
import updateChat from './actions/updateChat.js';
import addChatMessageValidation from './validators/addChatMessageValidation.js';
import addParticipantValidation from './validators/addParticipantValidation.js';
import createChatValidation from './validators/createChatValidation.js';
import updateChatValidation from './validators/updateChatValidation.js';
import leaveChat from './actions/leaveChat.js';

const router = express.Router(); 

router.post('/', checkJwtToken, createChatValidation, createChat);
router.get('/', checkJwtToken, getListChat);
router.get('/:chatId/messages', checkJwtToken, getListMessage);
router.post('/:chatId/messages', checkJwtToken, addChatMessageValidation, addChatMessage);
router.get('/:chatId/participants', checkJwtToken, getListParticipant);
router.post('/:chatId/participants', checkJwtToken, addParticipantValidation, addParticipant);
router.get('/:chatId', checkJwtToken, getOneChat);
router.put('/:chatId', checkJwtToken, updateChatValidation, updateChat);
router.delete('/:chatId/leave', checkJwtToken, leaveChat);

export default router;