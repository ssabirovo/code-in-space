import {EmailOptions} from "../types/email";
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {toNumber} from "lodash";


export const sendEmail = async (options: EmailOptions): Promise<SMTPTransport.SentMessageInfo> => {
    const emailSender = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: toNumber(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    return await emailSender.sendMail({...options, from: process.env.EMAIL});
}



