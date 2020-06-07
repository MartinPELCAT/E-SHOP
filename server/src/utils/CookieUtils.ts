import { Response, Request, NextFunction, CookieOptions } from "express";
import { IUser } from "../models";
import { addYears } from 'date-fns'

export const clearSessionCookie = (req: Request, res: Response, next: NextFunction): void => {
    let token = req.signedCookies._UID;
    if (token) { res.clearCookie("_UID"); }
    next();
}

export const setSessionCookie = (res: Response, user: IUser, keepMeLogged: boolean): void => {
    let cookieOptions: CookieOptions = { httpOnly: true, signed: true };
    if (keepMeLogged) { cookieOptions.expires = addYears(new Date, 10); }
    res.cookie("_UID", user.token, cookieOptions)
}