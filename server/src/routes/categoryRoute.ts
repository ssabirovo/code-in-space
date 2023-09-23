import express from 'express';
import controller from '../controllers/categoryController';

import {isActiveUser} from "../middlewares/isActiveUser";
import {adminSecure} from "../middlewares/adminSecure";


const router = express.Router();

router
    .route('/')
    .get( controller.getAll);
router
    .route('/')
    .post( isActiveUser, adminSecure, controller.add)
router
    .route('/:id')
    .delete( isActiveUser, adminSecure, controller.remove)
router
    .route('/:id')
    .put( isActiveUser, adminSecure, controller.edit)



export default router;
