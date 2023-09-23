import express from 'express';
import {isActiveUser} from '../middlewares/isActiveUser';
import validate from '../utils/yupValidations';
import controller from '../controllers/authController';


import schemas from '../validations/authValidations';

const router = express.Router();

router
    .route('/login')
    .post( validate(schemas.loginSchema), controller.login);

router
    .route('/logout')
    .post( validate(schemas.logoutSchema), controller.logout);

router
    .route('/refresh-token')
    .get( controller.refreshToken);

router
    .route('/register')
    .post( validate(schemas.registerSchema), controller.register);

router
    .route('/reset-password')
    .post(
        
        validate(schemas.resetPasswordSchema),
        isActiveUser,
        controller.resetPassword
    );

router
    .route("/google-register")
    .post(
        
        validate(schemas.googleUserSchema),
        controller.googleUserRegister
    )

router
    .route("/google-login")
    .post(
        
        validate(schemas.googleUserSchema),
        controller.googleUserLogin
    )

export default router;
