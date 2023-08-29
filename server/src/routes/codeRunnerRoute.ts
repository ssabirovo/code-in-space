import express from 'express';
import controller from '../controllers/codeRunnerController';



const router = express.Router();

router
    .route('/js')
    .post( controller.runJsCode);


export default router;
