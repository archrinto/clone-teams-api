import express from 'express';

import addParticipantAction from './actions/addParticipant.js';
import createChatAction from './actions/createChat.js';
import getListChatAction from './actions/getListChat.js';
import getListMessageAction from './actions/getListMessage.js';
import getListParticipantAction from './actions/getListParticipant.js';
import checkJwtToken from '../middlewares/checkJwtToken.js';
import addMessageAction from './actions/addMessage.js';

const router = express.Router(); 

router.post('/:chatId/participants', addParticipantAction);
router.post('/', checkJwtToken, createChatAction);
router.get('/', checkJwtToken, getListChatAction);
router.get('/:chatId/messages', getListMessageAction);
router.post('/:chatId/messages', checkJwtToken, addMessageAction);
router.get('/:chatId/participants', getListParticipantAction);

export default router;