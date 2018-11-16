<template>
 <div>
    <div class="row col-sm-12  wi">
      <div class="fixed bg"></div>
    <div class=" offset-sm-6 col-sm-3 fixed">
      <div class="input-group mt-3 ">
          <input class="form-control py-2 border-right-0 border " type="search" v-model="search"  placeholder="Search" id="example-search-input">
          <span class="input-group-append">
              <div class="input-group-text green text-light "><i class="fa fa-search"></i></div>
          </span>
      </div>
    </div>
    <AdminShow class='down' v-for="ele of updatedShowList" :key="ele._id"  :show="ele" @showmodal="showmodal" @showemailmodal="showemailmodal" >
      </AdminShow>
    </div>
    <div class="modal animated" id="descriptionmodal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Playwright: {{ show.ShowPlayWright ? show.ShowPlayWright : '' }}</h5>
            <button type="button" class="close" aria-label="Close" @click="closeDescriptionModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ show.ShowDescription ? show.ShowDescription : '' }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDescriptionModal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!--Saivarun Illendula - Added Email Model to Dashboard-->
    <!-- The Modal -->
    <div class="modal animated" id="emailmodal" tabindex="-1" role="dialog" aria-labelledby="emailmodal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Email</h4>
            <button type="button" class="close" @click="closeEmailModal">&times;</button>
          </div>
            <!-- Modal body -->
            <!-- Rahul Reddy Lankala - Added placeholders -->
            <div class="modal-body">
              <form>
                <div class="form-group row">
                  <label class="col-sm-3 form-label" >Subject:</label>
                  <input class="col-sm-8 form-control" id="subject" type="text" placeholder="Subject" :value="email.subject">
                </div>
                <div class="form-group row">
                  <label for="Email1msg" class="col-sm-3 form-label">Message:</label>
                    <textarea class="form-control inputstl col-sm-8" id="body" placeholder="Type the mesaage here...." rows="10" :value="email.body"></textarea>
                </div>
              </form>
            </div>
                <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-success"  @click="saveEmailContent()">Save</button>
              <button type="button" class="btn btn-danger"  @click="sendMail()">Save &amp; Email</button>
            </div>
        </div>
      </div>
    </div>
    <!-- Keerthi Chiduruppa - Added ReserveTickets Model to Dashboard -->
    <div class="modal animated" id="ReserveTickets" tabindex="-1" role="dialog" aria-labelledby="ReserveTickets" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Enter Details</h5>
            <button type="button" class="close"  aria-label="Close" @click="closeReserveTicketsModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="ReserveTickets" id="ReserveTicketsAdmin">
                  <div class="form-group row">
                    <label class="col-sm-4 form-label">First Name:</label>
                    <input class="col-sm-7 form-control" type="text" id="Firstname" name="Firstname" placeholder="Firstname" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 form-label">Last Name:</label>
                    <input class="col-sm-7 form-control" type="text" id="Lastname" name="Lastname" placeholder="Lastname" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 form-label">Email:</label>
                    <input v-if="isTheatreAppreciationStudent === 'true'" class="col-sm-7 form-control" type="text" id="EmailAddress" name="EmailAddress" placeholder="Email" pattern="[S|s]{1}[0-9]{6}@nwmissouri\.edu"
                    oninvalid="this.setCustomValidity('expecting s530859@nwmissouri.edu')" oninput="this.setCustomValidity('')" required>
                    <input class="col-sm-7 form-control" type="text"  v-else id="EmailAddress" name="EmailAddress" placeholder="Email" required>
                  </div>
                    <fieldset class="form-group">
                        <div class="row">
                          <legend class="col-form-label col-sm-8 pt-0">Are you a theatre appreciation student?</legend>
                          <div class="col-sm-4">
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="yes" value="true" v-model="isTheatreAppreciationStudent" required>
                              <label class="form-check-label" for="yes">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="no" value="false" v-model="isTheatreAppreciationStudent" required>
                              <label class="form-check-label" for="no">No</label>
                            </div>
                          </div>
                        </div>
                        <div class="form-group row" :class="{'d-none': isTheatreAppreciationStudent !== 'true' }">
                          <label class="col-sm-4 form-label">Section Number:</label>
                          <select id="SectionEnrolled" class="form-control col-sm-7" name="SectionEnrolled" pattern="[0-9]"
                            oninvalid="this.setCustomValidity('Please Select')"  oninput="this.setCustomValidity('')" required>
                            <option>--Select--</option>
                              <option v-for="ele of sectionlist" :key="ele._id" :value="ele.SectionNumber">
                                 {{ ele.ProfessorName }}:
                                 {{ ele.ClassTime12hrs }} -
                                 {{ ele.ClassDay }} -
                                 {{ ele.Semester }} {{ ele.Year }}
                                </option>
                            </select>
                          <!-- <input class="col-sm-7 form-control" type="text" id="sectionnumber"> -->
                          <a tabindex="0"
                            id="pop"
                            class="btn col-sm-1"
                            role="button"
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="right"
                            title="Need Help!!"
                            data-content="ProfessorName-ClassTime-ClassDay-Semester">
                            <i class="fas fa-info-circle"></i>
                        </a>
                        </div>
                        <div class="form-group row" :class="{'d-none': isTheatreAppreciationStudent !== 'false' }">
                            <label class="col-sm-4 form-label">No. Of Tickets:</label>
                            <select id="NumberOfTicketsperPerson" class="form-control col-sm-7" name="NumberOfTicketsperPerson" required>
                              <option selected v-for="ele of [1,2,3,4,5,6,7,8,9,10]" :key="ele" :value="ele">{{ele}}</option>
                            </select>
                        </div>
                    </fieldset>
                    <button type="reset" class="btn btn-danger">Reset</button>
                    <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- <table :class="{'d-none': check }">
      <thead>
        <tr>
          <th >Semester</th>
          <th >Section</th>
          <th>Day</th>
          <th>Time</th>
          <th>Professor</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>Fall 2018</td>
            <td>01</td>
            <td>MWF</td>
            <td>08:10 AM</td>
            <td>John Bob</td>
          </tr>
          <tr>
            <td>Fall 2018</td>
            <td>02</td>
            <td>TR</td>
            <td>09:10 AM</td>
            <td>Scott Robert</td>
          </tr>
          <tr>
            <td>Fall 2018</td>
            <td>03</td>
            <td>MWF</td>
            <td>10:10 AM</td>
            <td>Mark Richael</td>
          </tr>
      </tbody>
    </table> -->
    </div>
</template>

<script>
import AdminShow from './AdminShow.vue'
/* Saivarun Illendula - Added API Calls */
export default {
  name: 'AdminDashboard',
  data () {
    return {
      /* global $ axios url */
      check: false,
      isTheatreAppreciationStudent: '',
      sectionlist: [],
      showlist: [],
      show: '',
      reserveshow: '',
      search: '',
      email: {
        subject: 'Attention!!',
        body: 'Thank you for your interest in the show.\nThe show has been delayed by two days due to bad weather conditions.\nSorry for the inconvenience'
      }
    }
  },
  components: {
    AdminShow
  },
  methods: {
    showmodal (d) {
      $('#ReserveTickets').modal('show')
      $('#ReserveTickets.modal').addClass('zoomIn')
      this.reserveshow = d
    },
    showemailmodal (v) {
      this.show = v
      $('#emailmodal').modal('show')
      $('#emailmodal.modal').addClass('zoomIn')
    },
    showdescriptionmodal () {
      $('#descriptionmodal').modal('show')
      $('#descriptionmodal.modal').addClass('zoomIn')
    },
    closeDescriptionModal () {
      $('#descriptionmodal.modal').removeClass('zoomIn')
      $('#descriptionmodal.modal').addClass('zoomOut')
      setTimeout(function () {
        $('#descriptionmodal').modal('hide')
        $('#descriptionmodal.modal').removeClass('zoomOut')
      }, 100)
    },
    closeReserveTicketsModal () {
      $('#ReserveTickets.modal').removeClass('zoomIn')
      $('#ReserveTickets.modal').addClass('zoomOut')
      setTimeout(function () {
        $('#ReserveTickets').modal('hide')
        $('#ReserveTickets.modal').removeClass('zoomOut')
      }, 100)
    },
    closeEmailModal () {
      $('#emailmodal.modal').removeClass('zoomIn')
      $('#emailmodal.modal').addClass('zoomOut')
      setTimeout(function () {
        $('#emailmodal').modal('hide')
        $('#emailmodal.modal').removeClass('zoomOut')
      }, 100)
    },
    saveEmailContent () {
      this.closeEmailModal()
    },
    sendMail () {
      this.email.subject = $('#subject').val()
      this.email.body = $('#body').val()

      swal({
        title: `Do you want to send an email to the Audience ?`,
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, Send Email`
      })
        .then(
          (result) => {
            if (result.value) {
              axios.post(url + '/sendemail', {
                show: this.show,
                email: this.email
              }, {
                headers: { token: window.localStorage.getItem('AccessToken') }
              })
                .then(res => {
                  console.log('mail sent ' + res)
                  this.closeEmailModal()
                  swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Mail has been sent Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
                .catch(err => {
                  console.log('error in sending Email' + err)
                  swal({
                    position: 'top-end',
                    type: 'error',
                    title: 'Mail not sent Due to an Error',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
            }
          }
        )
    },
    refreshData () {
      var _this = this
      /* global axios moment _ swal */
      axios({
        method: 'get',
        url: url + '/sectionlist'
      })
        .then(function (response) {
          _this.sectionlist = response.data
          _.each(_this.sectionlist, function (section) {
            section.ClassTime12hrs = moment(section.ClassTime, 'HH:mm').format('hh:mm a')
          })
        })
        .catch(function (err) {
          console.log('error while getting section list', err)
        })

      axios({
        method: 'get',
        url: url + '/showlist'
      })
        .then(function (response) {
          _this.showlist = response.data
        })
        .catch(function (err) {
          console.log('error while getting show list', err)
        })
    },
    ReserveTickets () {
      console.log($('#SectionEnrolled').val())
      var reserveticketdata = {
        'FirstName': $('#Firstname').val(),
        'LastName': $('#Lastname').val(),
        'EmailAddress': $('#EmailAddress').val(),
        'SectionEnrolled': $('#SectionEnrolled').val(),
        'NumberOfTicketsperPerson': $('#NumberOfTicketsperPerson').val() ? $('#NumberOfTicketsperPerson').val() : 1,
        'isStudent': JSON.parse(this.isTheatreAppreciationStudent),
        'show_id': this.reserveshow._id
      }
      axios
        .post(url + '/reserveTicket', reserveticketdata)
        .then(res => {
          this.closeReserveTicketsModal()
          this.refreshData()
          swal('Congratualtions!', 'You have reserved a Seat', 'success')
          $('#ReserveTicketsAdmin')[0].reset()
          this.isTheatreAppreciationStudent = ''
        })
        .catch(err => {
          console.log('error in Reserving Ticket' + err)
        })
    }
  },
  mounted () {
    console.log(`mounted ${this.showlist}`)
    this.check = true
    $('[data-toggle=popover]').popover()
  },
  created () {
    this.refreshData()
    this.$eventbus.$on('refreshdata', function (data) {
      this.showlist = data
      // console.log(data, this.showlist)
    }.bind(this))

    this.$eventbus.$on('showdescription', function (showclicked) {
      this.show = showclicked
      //  console.log('show description', this.show)
      this.showdescriptionmodal()
    }.bind(this))
  },
  computed: {
    updatedShowList: function () {
    // console.log(this.showlist)
      return this.showlist.filter(show => {
        return show.ShowTitle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
.animated{
  animation-duration: 0.7s
}
.fixed{
    position: fixed;
    z-index: 2;
}

.down{
  top:70px;
}

.bg{
  height: 70px;
  background-color: rgba(182, 221, 208, 0.9);
   background-image: linear-gradient(#f6f4ef, #f6f4ef);
   /* background-image: linear-gradient(207deg, rgba(182, 221, 208, 0.6) , #f6f4ef); */
  width: 100%;
   /* border-bottom: 5px solid rgba(4, 224, 151, 0.521); */
     /* border-bottom-left-radius: 50px ; */
     box-shadow: 0px 10px 5px #f6f4ef;
}

.heading{
  font-size: 30px;
}

@media only screen and (max-width: 600px) {
.heading{
  font-size: 20px;
}
}

.wi{
  width: 100%;
}

.m-3{
  margin: 10px;
}
@media only screen and (max-width: 420px) {
.wi{
  /* width: 126%; */
  width: 400px;
  /* padding-left: -50px; */
  margin-left:-40px;

  /* margin-right:-40px; */
}

.m-3{
  margin: 10px;
}
}

.green{
  background-color: #025736
}

</style>
