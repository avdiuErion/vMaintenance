const nodemailer = require('nodemailer');

const smtpEmail = process.env.SMTP_EMAIL;
const smtpEmailPass = process.env.SMTP_EMAIL_PASS;

async function SendEmail(emailParameters) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpEmail,
            pass: smtpEmailPass
        },
    });

    const mailOptions = {
        from: smtpEmail,
        to: smtpEmail,
        subject: 'Autobusi duhet të bëhet servis',
        text: `Autobusi ${emailParameters.vehicleModel} me regjistrim ${emailParameters.vehicleLicensePlates} duhet te behet servis.\nJane bere ${emailParameters.vehicleKilometres - emailParameters.vehicleServiceKilometres} km nga servisi i fundit!`
    };

    try{
        await transporter.sendMail(mailOptions);
        transporter.close();
    }catch(Error){
        console.log(Error);
    }
}

module.exports = {
    SendEmail
};
