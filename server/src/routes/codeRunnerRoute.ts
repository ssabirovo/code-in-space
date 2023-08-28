import express from 'express';
import controller from '../controllers/codeRunnerController';
import trimRequest from 'trim-request';


const router = express.Router();

router
    .route('/js')
    .post(trimRequest.all, controller.runJsCode);


export default router;
