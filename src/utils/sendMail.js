import nodemailer from 'nodemailer'

class SendMail {
    constructor(to, subject, html) {
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    send() {
        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            port: process.env.MAIL_PORT, 
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD
            },
        });
        const mailOptions = {
            from: 'nirjal@gmail.com',
            to: this.to,
            subject: this.subject,
            html: this.html
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

}


export default SendMail