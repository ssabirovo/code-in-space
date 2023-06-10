import ApiError from "../utils/ApiError";

export const runJsCodeFromString = async (code: string): Promise<string> => {
    try {
        if (code.match(/^return \(\)=>\{(.+)}$/)) {
            return new Function(code)()() as string
        }

        return "You can't run this code"
        // return new vm.Script(code).runInNewContext({})
    } catch (e) {
        return e.toString();
    }
}