const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // define the email options
  const emailOptions = {
    from: 'Iulian Carnaru <me@iuliancarnaru.uk>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send the email (return promise)
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
