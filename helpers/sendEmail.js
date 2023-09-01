import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKRNET_EMAIL, UKRNET_PASS } = process.env;

const config = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_EMAIL,
    pass: UKRNET_PASS,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = async (data) => {
    const email = { ...data, from: UKRNET_EMAIL };
    await transport.sendMail(email);
    return true;
};

export default sendEmail;
