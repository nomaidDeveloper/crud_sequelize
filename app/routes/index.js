
import express from 'express'
const router = express.Router();
import user from './user.routes';
import chat from './chat.routes';


router.use('/user', user);
router.use('/chat', chat);

module.exports = router