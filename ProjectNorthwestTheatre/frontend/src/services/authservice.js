export default {
  auth (to, from, next) {
    console.log(to.name, to.name === 'AdminLogin')
    /* global axios url */
    axios({
      method: 'post',
      headers: {
        token: window.localStorage.getItem('AccessToken')
      },
      url: url + '/guard'
    })
      .then(function (response) {
        console.log(response)
        if (to.name === 'AdminLogin') {
          console.log('Admin')
          next({
            path: '/admin/dashboard'
          })
        } else {
          next()
        }
      })
      .catch(function (error) {
        console.log(to.name)
        if (to.name === 'AdminLogin') {
          next()
        } else {
          next({
            path: '/admin/login'
          })
        }
        console.log(error)
      })
  }
}
