const config = {
  development: {
    url: 'http://localhost:3000/admin',
    userurl: 'http://localhost:3000/user'
  },
  production: {
    url: 'http://ec2-18-191-243-115.us-east-2.compute.amazonaws.com:3000/admin',
    userurl: 'http://ec2-18-191-243-115.us-east-2.compute.amazonaws.com:3000/user'
  }
}

module.exports = config[process.env.NODE_ENV] | config.development
