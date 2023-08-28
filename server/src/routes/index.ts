import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import categoryRoute from "./categoryRoute";
import codeRunnerRoute from "./codeRunnerRoute";

const router = express.Router();

router.get('/status', (req, res) => {
    res.jsonp({
        status: 'ok',
        processEnv: process.env.NODE_ENV || 'not set',
        CURRENT_PROJECT: process.env.CURRENT_PROJECT,
    });
});


router.use('/auth', authRoute); //add routes
router.use('/user', userRoute)
router.use('/category', categoryRoute)
router.use('/runner', codeRunnerRoute)
export default router;