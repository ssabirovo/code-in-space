import express from "express"

export type ControllerHandler=(req: express.Request, res: express.Response, next: express.NextFunction)=>Promise<void>