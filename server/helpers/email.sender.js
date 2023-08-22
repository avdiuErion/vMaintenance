const nodemailer = require('nodemailer');

const smtpEmail = process.env.SMTP_EMAIL;
const smtpEmailPass = process.env.SMTP_EMAIL_PASS;

async function SendEmail(emailParameters) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpEmailPass
      }
    });

    const message = {
        from: smtpEmail,
        to: smtpEmail,
        subject: 'Autobusi duhet të bëhet servis',
        text: `Autobusi ${emailParameters.vehicleModel} me regjistrim ${emailParameters.vehicleLicensePlates} duhet te behet servis.\nJane bere ${emailParameters.vehicleKilometres - emailParameters.vehicleServiceKilometres} km nga servisi i fundit!`
    };

    transporter.sendMail(message, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
}

module.exports = {
    SendEmail
};
