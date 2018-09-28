const nodemailer = require('nodemailer')
const config = require('../../../config/config')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')

let SendMail = function () {
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.emailid, // generated ethereal user
            pass: config.password // generated ethereal password
        }
    })
    let names =['Saivarun','Santhosh','Srininvas']
    for(let name of names){
        ejs.renderFile(path.join(__dirname, "../../../views/mail.ejs"), { name: name }, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Northwest Theatre" <s530859@nwmissouri.edu>', // sender address
                    to: 's530464@nwmissouri.edu, s530859@nwmissouri.edu, s530462@nwmissouri.edu, s530474@nwmissouri.edu', // list of receivers
                    subject: 'Ticket Details', // Subject line
                    html: data
                }
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error)
                    }
                    console.log('Message sent: %s', info.messageId)
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                })
            }
        })
    }
}

module.exports.SendMail = SendMail