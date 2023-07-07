require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS
    }
})
const recipients = process.env.RECIPIENTS.split(','); // List of email addresses
function mailService(recordCount) {
    const mailOptions = {
        from: 'process.env.EMAILUSER',
        to: recipients,
        subject: 'Airtable Record Count',
        text: `Number of records in Airtable: ${recordCount}`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err.message);
      } else {
        console.log('Email sent successfully');
      }
    });
}

module.exports = {mailService};