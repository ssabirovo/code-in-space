import express from 'express';
import controller from '../controllers/categoryController';
import trimRequest from 'trim-request';
import {isActiveUser} from "../middlewares/isActiveUser";
import {adminSecure} from "../middlewares/adminSecure";


const router = express.Router();

router
    .route('/')
    .get(trimRequest.all, controller.getAll);
router
    .route('/')
    .post(trimRequest.all, isActiveUser, adminSecure, controller.add)
router
    .route('/:id')
    .delete(trimRequest.all, isActiveUser, adminSecure, controller.remove)
router
    .route('/:id')
    .put(trimRequest.all, isActiveUser, adminSecure, controller.edit)



export default router;
