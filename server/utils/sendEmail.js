import nodemailer from 'nodemailer'

export const sendEmail = (options) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS
        
        },
    })
    
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }else console.log(info);
    })
}

