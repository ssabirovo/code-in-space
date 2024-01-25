import * as Yup from "yup";

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        next(err);
    }
};


export const EmailYup=Yup.string().email().required().nullable(false);

export default validate;
