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

const router = express.Router(); 

router.post('/:chatId/participants', addParticipant);
router.post('/', checkJwtToken, createChat);
router.get('/', checkJwtToken, getListChat);
router.get('/:chatId/messages', checkJwtToken, getListMessage);
router.post('/:chatId/messages', checkJwtToken, addChatMessage);
router.get('/:chatId/participants', checkJwtToken, getListParticipant);
router.post('/:chatId/participants', checkJwtToken, addParticipant);
router.get('/:chatId', checkJwtToken, getOneChat);
router.put('/:chatId', checkJwtToken, updateChat);

export default router;