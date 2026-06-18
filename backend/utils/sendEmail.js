const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY missing. Email not sent.");
    return;
  }

  await resend.emails.send({
    from: `eSibha Orders <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;