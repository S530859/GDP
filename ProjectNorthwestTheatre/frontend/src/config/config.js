const config = {
  development: {
    url: 'http://localhost:3000/Theatre/admin',
    userurl: 'http://localhost:3000/Theatre/user'
  },
  production: {
    url: '/Theatre/admin',
    userurl: '/Theatre/user'
  }
}

module.exports = config[process.env.NODE_ENV] || config.development
