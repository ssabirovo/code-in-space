import express from 'express';
import taskController from '../controllers/taskController';

import {isActiveUser} from "../middlewares/isActiveUser";
import {adminSecure} from "../middlewares/adminSecure";


const router = express.Router();

router
    .route('/')
    .get( taskController.getAll);
router
    .route('/')
    .post( isActiveUser, adminSecure, taskController.add)
router
    .route('/:id')
    .delete( isActiveUser, adminSecure, taskController.remove)
router
    .route('/:id')
    .put( isActiveUser, adminSecure, taskController.edit)



export default router;
