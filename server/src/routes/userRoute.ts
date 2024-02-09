import express from 'express';
import {isActiveUser} from '../middlewares/isActiveUser';
import controller from '../controllers/userController';


const router = express.Router();

router
    .route('/')
    .get(
        isActiveUser,
        controller.getUserInfo
    );

export default router;
