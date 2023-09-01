import { ctrlWrapper } from '../../decorators/index.js';
import { sendEmail } from '../../helpers/index.js';

const sendHelpEmail = async (req, res) => {
  const { email, comment } = req.body;

  const helpReq = {
    to: 'ogachkovska@ukr.net',
    subject: 'User need help',
    html: `<p> Email: ${email}, Comment: ${comment}</p>`,
  };
  await sendEmail(helpReq);

  const helpRes = {
    to: email,
    subject: 'Support',
    html: `<p>Thank you for you request! We will consider your comment ${comment}</p>`,
  };
  await sendEmail(helpRes);

  res.status(200).json({
    message: 'The letter was sent successfully!',
  });
};

export default { sendHelpEmail: ctrlWrapper(sendHelpEmail) };
