import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface EmailOptions extends SMTPTransport.MailOptions{}
export interface EmailSenderConfig extends SMTPTransport.Options{}