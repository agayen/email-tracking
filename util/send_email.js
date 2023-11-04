const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports.sendEmail = function(options, callback){
    const html = options.html || '';
    const imageUrl = options.id ? process.env.URL + 'email/track/' + options.id: '';
    const imageTag = imageUrl ? `<img src=${imageUrl} height="20" width="20">`: '';

    var mailOptions = {
        from: `"CodeWithAbhijit 👨‍💻"<${process.env.EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: imageTag + html
    };

    if (options.attachments || [].length > 0){
        // refernce attachments this will be an array
        // attachments: [
        //     {
        //         filename: 'abhijit_gayen.jpg',
        //         path: 'https://abhijitgayen.github.io/assets/img/about.jpg'
        //     }
        // ]
        mailOptions['attachments'] = options.attachments;
    }
    transporter.sendMail(mailOptions, callback);
};
