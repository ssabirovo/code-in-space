import express from 'express';
import {isActiveUser} from '../middlewares/isActiveUser';
import controller from '../controllers/userController';
import trimRequest from 'trim-request';

const router = express.Router();

router
    .route('/')
    .get(
        trimRequest.all,
        isActiveUser,
        controller.getUserInfo
    );

export default router;
