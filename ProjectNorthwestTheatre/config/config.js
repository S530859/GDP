/* Author: santhosh Bonala */

const config = {
    development:{
        url: 'mongodb+srv://admin:admin@cluster0-tyjvv.mongodb.net/development?retryWrites=true',
        tokensecret: 'NorthwestTheatre',
        sessionsecret: 'NorthwestTheatre',
        emailid: 's530859@nwmissouri.edu',
        password: '<password>'
    },
    production:{
        url: 'mongodb+srv://admin:admin@cluster0-tyjvv.mongodb.net/Production?retryWrites=true',
        tokensecret: 'NorthwestTheatre',
        sessionsecret: 'NorthwestTheatre'
    },
    testing:{
        url: 'mongodb+srv://admin:admin@cluster0-tyjvv.mongodb.net/testing?retryWrites=true',
        tokensecret: 'NorthwestTheatre',
        sessionsecret: 'NorthwestTheatre'
    }
}

module.exports = config[process.env.ENV] || config.development