<template>
<!-- Ashwith Gundu - Created Admin Show Card -->
<!-- Saivarun Illendula - Added Modal for Add Show -->
    <div class="col-md-12 col-sm-12 my-3">
      <div class="card rounded mb-3" >
        <div class="card-header grey text-white">
          <!-- show header -->
            <div class="row">
              <div class="col-md-4">
                   <div class="  font-weight-bold float-left">
                     <h1 class=" heading">{{ show.ShowTitle }}</h1>
                   </div>
              </div>
              <div class="col-md-8 left my-auto p_u-mobile">
                  <div class="d-inline float-right col-md-12">
                     <div class="btn-group rounded btn-width col-md-4">
                        <button class="col-md-12 btn bg-danger text-white" type="button"  @click="unreservetickets">
                          <strong><span class = "mr-2"><i class="fas fa-user-slash"></i></span>Unreserve</strong>
                        </button>
                     </div>
                        <div class="btn-group rounded btn-width" id="status" data-toggle="buttons">
                          <label class="btn btn-default btn-on" style="border:2px solid white" :class="{ active: show.isPublished }" @click="showstatuschanged(true)">
                            <input class="d-none" type="radio" value="1">
                            <strong>Publish</strong>
                          </label>
                          <label class="btn btn-default btn-off" style="border:2px solid white" :class="{ active: !show.isPublished }" @click="showstatuschanged(false)">
                            <input class="d-none" type="radio" value="0" >
                            <strong>Unpublish</strong>
                          </label>
                        </div>
                    <div class="btn-group rounded btn-width col-md-1 float-right">
                      <button type="button" class="btn rounded-circle btn-mobile" id="delete" @click="deleteshow">
                          <i class="fas fa-trash"></i>
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          <!-- end show header -->
        </div>
<!-- comment -->
        <div class="card-body green">
          <div class="content">
            <div class="row justify-content-around m-3 mar rounded  bg-light">
              <!-- image column -->
              <div class="col-lg align-self-center" id="imagediv">
                <img :src="'/admin/image?_id=' + show._id + '&token=' + token + '&time=' + time" class="rounded mx-1 my-1 w-100" alt="Image" id="imagesrc" />
              </div>
              <!-- image column end -->
              <!-- details of the show -->
              <div class="col-lg lead text-left font" style="border:1px  ">
                <!-- Date -->
                <span class="font-weight-bold">Date :
                  <span class="font-weight-normal">{{ show.ShowDate }}</span>
                </span>
                <br>
                <!-- Time  -->
                <span class="font-weight-bold">Time :
                  <span class="font-weight-normal">{{ ShowTime }}</span>
                </span>
                <br>
                <!-- Venue -->
                <span class="font-weight-bold">Venue :
                  <span class="font-weight-normal">{{ show.ShowVenue }}</span>
                </span>
                <br>
                <!-- Rating -->
                <span class="font-weight-bold">Rating :
                  <span class="font-weight-normal">{{ show.ShowRating}}</span>
                </span>
                <br>
                <!-- Description -->
                <span>
                  <button type="button" class="btn btn-light font-weight-bold" @click="emitshowdescription(show)">
                    Description
                  </button>
                </span>
                <br>
              </div>
              <!-- details of the show END -->
              <div class="col-lg lead" style="border:1px ">
                <div class="component pb-1 mt-1 text-left seats_rounded bg-success text-light " style="border:2px solid grey">
                  <!-- Seats Heading -->
                  <p class="font-weight-bold text-center rounded ">
                    SEATS
                  </p>
                  <!-- Total Seats -->
                  <span class="px-3  font-weight-bold">Total :
                    <span class="font-weight-normal">{{ show.NumberOfTickets }}</span>
                  </span>
                  <br>
                  <!-- Reserved Seats -->
                  <span class="px-3 font-weight-bold">Reserved :
                    <span class="font-weight-normal">{{ show.ReservedSeats }}</span>
                  </span>
                  <br>
                  <!-- Remaining Seats -->
                  <span class="px-3  font-weight-bold">Remaining :
                    <span class="font-weight-normal">{{ show.NumberOfTickets - show.ReservedSeats }}</span>
                  </span>
                  <br>
                </div>
                <!-- Adult Ticket -->
                <h1 class="mt-2 text-danger text-center lead" v-for="ele in show.Ticketdetails" :key="ele.TicketType" >
                    <span class="font-weight-bold display"> $ {{ ele.TicketPrice }} </span>
                    <span class="font-weight-normal">For {{ ele.TicketType }}</span>
                </h1>
              </div>
            </div>
            <!-- buttons inside the card -->
            <div class="row justify-content-around m-2 bg-white rounded " style="border:1px ">
              <button class="col-sm m-2 btn btn-outline-primary" type="button" @click="emailevent()">
                <strong><span class = "mr-2"><i class="fas fa-envelope"></i></span>Email</strong>
              </button>
              <a class="col-sm m-2 btn btn-outline-warning" type="a" @click="GenerateReport">
                <strong><span class = "mr-2"><i class="fas fa-file-excel"></i></span> Report</strong>
              </a>
              <button class="col-sm m-2 btn btn-outline-success" type="button" @click="emitevent()">
                <strong><span class = "mr-2"><i class="fas fa-ticket-alt"></i></span>Reserve Tickets</strong>
              </button>
              <button class="col-sm m-2 btn btn-outline-secondary" type="button" @click="editevent()">
                <strong><span class = "mr-2"><i class="far fa-edit"></i></span>Edit Show</strong>
              </button>
               <button class="col-sm m-2 btn btn-outline-secondary" type="button" @click="duplicateEvent(show)">
                <strong><span class = "mr-2"><i class="far fa-edit"></i></span>Duplicate Show</strong>
              </button>
            </div>
          <!-- end buttons inside card -->
          </div>
          <!-- card-content-body -->
        </div>
      <!-- card-body -->
      </div>
    <!-- card -->
    <!-- Modal -->
    <div class="modal animated" :id="'editshow'+show._id" tabindex="-1" role="dialog" :aria-labelledby="'editshow'+show._id" aria-hidden="true">
    <form @submit.prevent="editshow" :id="'editshowform'+show._id" style="height: 95%">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" >
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Edit Show Details:</h4>
            <button type="button" class="close" @click="closeEditShowModal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body" >
              <div class="form-group row">
                <label class="col-sm-2 offset-sm-1 form-label py-2">Show Name:</label>
                <input class="col-sm-2 form-control" type="text" placeholder="Show Name" id="showname" :value="show.ShowTitle" name="ShowTitle" required>
                <label class="col-sm-2 offset-sm-1 form-label py-2">Playwright:</label>
                <div class="col-sm-2">
                  <input class="form-control" type="text" placeholder="Playwright" id="playwright" :value="show.ShowPlayWright" name="ShowPlayWright" required>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 py-2 offset-sm-1 form-label">Description:</label>
                <textarea class="col-sm-7 form-control" type="text" placeholder="Description of Show" id="description" :value="show.ShowDescription" name="ShowDescription" required>
                </textarea>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 py-2 offset-sm-1 form-label">Show Time:</label>
                 <input class="col-sm-2 form-control" type="time" :value="show.ShowTime" id="showtime" name="ShowTime" required>
                <label class="col-sm-2 py-2 offset-sm-1 form-label">Show Date:</label>
                <div class="col-sm-3" style="position: relative;">
                  <i class="fas fa-calendar-alt fa-2x" style="position: absolute; padding: 3px 20px; right: 0px;" aria-hidden="true"></i>
                  <input type="text" class="date form-control" name="ShowDate" id="datepicker-input" style="padding-right: 40px;"
                  data-date-multidate="true" data-date-multidateSeparator="; " :data-date-container=" '#editshow' + show._id"
                  required>
                </div>

              </div>
               <div class="form-group row">
                  <label class="col-sm-2 py-2 offset-sm-1 form-label">Show Rating:</label>
                  <select id="inputState" class="form-control col-sm-2" required :value="show.ShowRating" name="ShowRating" >
                    <option selected>Choose...</option>
                    <option>A</option>
                    <option>U/A</option>
                    <option>R</option>
                  </select>
                  <label class="col-sm-2 py-2 offset-sm-1 form-label">Image:</label>
                    <input type="file" accept="image/*" class="form-control-file col-sm-4" id="InputFile" aria-describedby="fileHelp" :value="show.ShowImage" name="ShowImage" >
                    <small id="fileHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 py-2 offset-sm-1 form-label">Total Seats:</label>
                  <input class="col-sm-2 form-control" type="number" placeholder="Total No. of Tickets" id="totalseats" :value="show.NumberOfTickets" name="NumberOfTickets" min="1" required>
                  <label class="col-sm-2 py-2 offset-sm-1 form-label">Venue:</label>
                  <div class="col-sm-3">
                    <input class="form-control" type="text" placeholder="Venue" id="showvenue" :value="show.ShowVenue" name="ShowVenue" required>
                  </div>
                </div>
               <form @submit.prevent="addticketpriceEditModal()" id="ticketformEdit">
                  <div class="form-group row">
                    <label class="col-sm-2 py-2 offset-sm-1 form-label required">Ticket Type:</label>
                    <input class="col-sm-2 form-control" type="text" placeholder="Ticket Type" id="TicketTypeEditShow" required>
                    <label class="col-sm-2 py-2 offset-sm-1 form-label required">Ticket Price:</label>
                      <!-- <div class="input-group-prepend" style="position: absolute;right: 235px;z-index:1">
                        <div class="input-group-text py-0 my-0" style="height: 38px;">$</div>
                      </div> -->
                    <div class="col-sm-2" style="position: relative;">
                      <i class="fas fa-dollar-sign fa-lg" style="position: absolute; padding: 10px 20px; left: 0px;"></i>
                      <input class="form-control" style="padding-left: 20px;" type="number" placeholder="Ticket Price" id="TicketPriceEditShow" min="1" required>
                    </div>
                    <button class="btn col-sm-1 mx-1 py-0 my-0" style="height: 38px;" type="submit">Add</button>
                  </div>
                </form>

                <div class="form-group">
                  <div name="ticketdetails" id="ticketdetails" class="row mx-5">
                    <div class="column" v-for="(ticket, index) in show.Ticketdetails" :key="ticket.TicketType">
                      <div class="row" style="margin-left: 0px;margin-right: 0px">
                        <div  class="py-2" style="width: 60px">{{ index + 1 }}. </div>
                        <div  class="py-2" style="width: 180px"> {{ ticket.TicketType }} - $ {{ ticket.TicketPrice }} </div>
                        <div   style="width: 70px">
                            <button type="button" class="btn rounded-circle" id="delete" @click="deleteticket(ticket.TicketType)">
                              <i class="fas fa-trash"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
                <!-- <div class="form-group row">
                  <label class="col-sm-4 form-label">Publish:</label>
                    <label class="switch float-right form-group">
                      <input type="checkbox" class="sliderinput" v-model="show.isPublished" name="isPublished" value="true">
                      <span class="slider round"></span>
                   </label>
                 </div> -->
                 <input type="hidden" :value="show._id" name="id">
                <div class="modal-footer">
                    <button type="reset" class=" btn btn-danger">Reset</button>
                    <button type="submit" class=" btn btn-success">Save Changes</button>
                    <button type="submit" class=" btn btn-success" @click="show.isPublished = true">Save and Publish</button>
                </div>
        </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminShow',
  data () {
    return {
      /* global moment */
      ShowDate: moment(this.show.ShowDate, 'YYYY-MM-DD').format('MMMM Do YYYY'),
      ShowTime: moment(this.show.ShowTime, 'HH:mm').format('hh:mm a'),
      token: window.localStorage.getItem('AccessToken'),
      showImg: true,
      time: Date()
    }
  },
  props: ['show'],
  methods: {
    GenerateReport () {
      // var _this = this
      // axios.post(url + '/report', { show_id: this.show._id, show_name: this.show.title + '.xlsx' })
      // .then(res => {
      // })
      // .catch(err => {
      //   console.log(err)
      // })
      axios({
        url: url + '/report',
        method: 'POST',
        responseType: 'blob' // important
      }, {
        show_id: this.show._id,
        show_name: this.show.title + '.xlsx'
      },
      {
        'Accept': 'application/vnd.ms-excel'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
    unreservetickets () {
      let _this = this
      axios
        .post(url + '/students', { show_id: this.show._id })
        .then(res => {
          console.log(_this)
          _this.$router.push({
            name: 'unreserve',
            params: { students: res.data, show_id: _this.show._id, ShowTitle: _this.show.ShowTitle }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    emitevent () {
      console.log(this.show)
      this.$emit('showmodal', this.show)
    },
    emailevent () {
      this.$emit('showemailmodal', this.show)
    },
    editevent () {
      /* global $ */
      console.log('editclicked', this.show._id)
      $('#editshow' + this.show._id).modal('show')
      $('#editshow' + this.show._id).addClass('zoomIn')
      this.showdatepicker()
    },
    closeEditShowModal () {
      var _this = this
      $('#editshow' + this.show._id).removeClass('zoomIn')
      $('#editshow' + this.show._id).addClass('zoomOut')
      setTimeout(function () {
        $('#editshow' + _this.show._id).modal('hide')
        $('#editshow' + _this.show._id).removeClass('zoomOut')
      }, 100)
    },
    editshow () {
      console.log(`editclicked ${JSON.stringify(this.show)} `)
      var formdata = new FormData(
        document.querySelector('#editshowform' + this.show._id)
      )
      formdata.append('Ticketdetails', JSON.stringify(this.show.Ticketdetails))
      formdata.append('isPublished', this.show.isPublished)
      // var _this = this
      axios
        .create({
          baseURL: url,
          headers: { token: window.localStorage.getItem('AccessToken') }
        })
        .post('/updateshow', formdata)
        .then(
          function (res) {
            $('#editshow' + this.show._id).modal('hide')
            swal('Updated!', 'Show has been successfully updated.', 'success')
            this.time = Date()
            axios({
              method: 'get',
              headers: {
                token: window.localStorage.getItem('AccessToken')
              },
              url: url + '/showlist'
            })
              .then(response => {
                this.$eventbus.$emit('refreshdata', response.data)
              })
              .catch(err => {
                console.log('error while getting show list', err)
              })
          }.bind(this)
        )
        .catch(error => {
          console.log(error)
        })
    },
    deleteshow () {
      /* global swal axios url _ */
      swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .create({
              baseURL: url,
              headers: { token: window.localStorage.getItem('AccessToken') }
            })
            .post('/deleteshow', { id: this.show._id })
            .then(res => {
              swal('Deleted!', 'Show has been deleted.', 'success')
              axios({
                method: 'get',
                headers: {
                  token: window.localStorage.getItem('AccessToken')
                },
                url: url + '/showlist'
              })
                .then(response => {
                  this.$eventbus.$emit('refreshdata', response.data)
                })
                .catch(err => {
                  console.log('error while getting show list', err)
                })
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    showstatuschanged (isPublished) {
      this.show.isPublished = isPublished
      axios
        .create({
          baseURL: url,
          headers: { token: window.localStorage.getItem('AccessToken') }
        })
        .post('/ispublished', {
          id: this.show._id,
          isPublished: isPublished
        })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    emitshowdescription (showclicked) {
      this.$eventbus.$emit('showdescription', showclicked)
    },
    duplicateEvent (show) {
      console.log('duplicate show clicked')
      swal({
        title: 'Duplicate Show',
        text: 'Do you want to duplicate the show!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Sure!'
      }).then(res => {
        console.log(res.value)
        if (res.value) {
          axios
            .create({
              baseURL: url,
              headers: { token: window.localStorage.getItem('AccessToken') }
            })
            .post('/duplicateShow', show)
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    showdatepicker () {
      console.log('date picker clicked')
      let dates = this.show.ShowDate.split(',')
      _.each(dates, (element, index, list) => {
        let date = element.replace(';', '')
        list[index] = new Date(date)
      })
      console.log(dates)
      $(`#editshowform${this.show._id} .row` + ''.date).datepicker(
        'setDates',
        dates
      )
      // $('.date').datepicker('show')
    },
    deleteticket (TicketType) {
      swal({
        title: `Do you want to delete ${TicketType} ?`,
        text: 'You wont be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete!`
      }).then(result => {
        if (result.value) {
          this.show.Ticketdetails = _.without(
            this.show.Ticketdetails,
            _.findWhere(this.show.Ticketdetails, {
              TicketType: TicketType
            })
          )
          swal(
            'Deleted!',
            `Ticket Type:  ${TicketType} has been deleted.`,
            'success'
          )
        }
      })
    },
    addticketpriceEditModal () {
      this.show.Ticketdetails.push({
        TicketType: $('#TicketTypeEditShow').val(),
        TicketPrice: $('#TicketPriceEditShow').val()
      })
      document.getElementById('ticketformEdit').reset()
    }
  },
  mounted () {
    // $('.date').datepicker({
    //     container: '#editshow' + this.show._id
    //   })
  },
  watch: {
    show: function (newVal, oldVal) {
      this.ShowDate = moment(newVal.ShowDate, 'YYYY-MM-DD').format(
        'MMMM Do YYYY'
      )
      this.ShowTime = moment(newVal.ShowTime, 'HH:mm').format('hh:mm a')
    }
  }
}
</script>

<style scoped>
#delete:hover {
  color: #910000;
  background-color: #da7a7a;
}
#delete {
  color: #d14f4f;
  background-color: none;
}
.btn-default.btn-on.active {
  background-color: #5bb75b;
  color: white;
}

.btn-default.btn-off.active {
  background-color: #da4f49;
  color: white;
}

.btn-default.btn-on-1.active {
  background-color: #006ffc;
  color: white;
}

.btn-default.btn-off-1.active {
  background-color: #da4f49;
  color: white;
}

.btn-default.btn-on-2.active {
  background-color: #00d590;
  color: white;
}

.btn-default.btn-off-2.active {
  background-color: #a7a7a7;
  color: white;
}

.btn-default.btn-on-3.active {
  color: #5bb75b;
  font-weight: bolder;
}

.btn-default.btn-off-3.active {
  color: #da4f49;
  font-weight: bolder;
}

.btn-default.btn-on-4.active {
  background-color: #006ffc;
  color: #5bb75b;
}

.btn-default.btn-off-4.active {
  background-color: #da4f49;
  color: #da4f49;
}

.green {
  background-color: rgb(0, 92, 50);
}
.grey {
  background-color: #a9a9a9;
}
.seats_rounded {
  border-radius: 30px;
}
.font1 {
  font-size: 8vw;
}
.card {
  box-shadow: 5px 4px 8px 0 rgba(20, 53, 40, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 10px 10px 35px 0 #006600;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch .sliderinput {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.sliderinput:checked + .slider {
  background-color: green;
}

.sliderinput:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.sliderinput:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* #date-icon {
  position: absolute;
  right: 110px;
  padding: 2px;
  display: flex;
  align-items: center;
} */
/* #datepicker-input {
  padding-right: 40px;
  outline: none;
} */

.left {
  float: left;
  margin-left: -20px;
}

.btn-width {
  margin-left: 10px;
}

.p_u-mobile {
  margin-left: 0px;
}
.btn-mobile {
  margin-left: 30px;
}
@media only screen and (max-width: 420px) {
  .btn-mobile {
    margin-left: 20px;
  }
  .p_u-mobile {
    margin-left: -40px;
  }
}

.btn-group {
  vertical-align: baseline;
}

.btn {
  white-space: normal !important;
  word-wrap: break-word;
}

.modal-dialog,
.modal-content {
  /* 80% of window height */
  height: 95%;
}

.modal-body {
  /* 100% = dialog height, 120px = header + footer */
  max-height: calc(100% - 120px);
  overflow-y: scroll;
}
</style>
