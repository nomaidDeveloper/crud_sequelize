
import express from 'express'
const router = express.Router();
import user from './user.routes';
import book from './book.routes';


router.use('/user', user);
router.use('/book', book);


module.exports = router