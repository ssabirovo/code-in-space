import {ControllerHandler} from "../types/controller";
import {runJsCodeFromString} from "../services/codeRunnerService";


const runJsCode: ControllerHandler=async (req, res, next)=>{
    try {
        let result = await runJsCodeFromString(req.body.code);
        res.jsonp({output: result})
    }catch (e) {
        next(e)
    }
}

export default {runJsCode}