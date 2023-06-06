import cookie from "cookie"

const cookieParser = async (req, res, next) => {
    try {
        let cookies=req.headers.cookie || '';
        req.cookies=cookie.parse(cookies);
        next()
    }catch (e) {
        next(e)
    }
}

export {cookieParser}