<template>
<div>
<h2></h2>

<div class="card text-center m-5">
  <div class="card-header bg-success text-light">
   <h1>For cancelling the Tickets</h1>
  </div>
  <div class="card-body">
    <h5 class="card-title">Contact:</h5>
    <div class="card-text">
       <h3 v-for="person in persons" :key="person._id"><b>{{ person.FirstName }} {{ person.LastName }} : </b>
       <!-- <a href=`mailto:pimmel@nwmissouri.edu?Subject=Cancel%20Ticket` target="_top">pimmel@nwmissouri.edu</a> -->
       <a href="" target="_top">{{ person.email }}</a>
       </h3>
  </div>
  </div>
  <div class="card-footer text-muted">
    ....
  </div>
</div>

</div>

</template>

<script>
export default {
  name: 'usercancelticket',
  data () {
    return {
      persons: []
    }
  },
  methods: {

  },
  created () {
    /* global axios url */
    axios.get(url + '/getpersonslist')
        .then(res => {
          this.persons = res.data 
        })
        .catch(err => {
          console.log(err)
        })
  }
}
</script>
<style scoped>

</style>
