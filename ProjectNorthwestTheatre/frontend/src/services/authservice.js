export default {
  auth (to, from, next) {
    /* global axios */
    axios.post('/guard')
      .then(function (response) {
        next(true)
      })
      .catch(function (error) {
        next({
          path: '/admin/login',
          query: {
            redirect: to.name
          }
        })
        console.log(error)
      })
  }
}