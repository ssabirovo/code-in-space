import express from 'express';
import controller from '../controllers/categoryController';
import trimRequest from 'trim-request';


const router = express.Router();

router
    .route('/')
    .get(trimRequest.all, controller.getAll);
router
    .route('/')
    .post(trimRequest.all, controller.add)
router
    .route('/:id')
    .delete(trimRequest.all, controller.remove)
router
    .route('/:id')
    .put(trimRequest.all, controller.edit)



export default router;
