<template>
<!-- Ashwith Gundu - Created Admin Show Card -->
<!-- Saivarun Illendula - Added Modal for Add Show -->
    <div class="col-md-12 col-sm-12 my-3">
      <div class="card rounded mb-3" >
        <div class="card-header grey text-white">
            <div class="row">
              <div class="col-md-4">
                   <div class="  font-weight-bold float-left">
                     <h1 class=" heading">{{ show.ShowTitle }}</h1>
                   </div>
              </div>
              <div class="col-md-8 left my-auto p_u-mobile">
                  <div class="d-inline col-md-12">
                     <div class="btn-group rounded btn-width col-md-4 float-right">
                        <button class="col-md-12 btn btn-success" type="button" @click="emitreserve">
                          <strong><span class = "mr-2"><i class="fas fa-user"></i></span>Reserve</strong>
                        </button>
                     </div>
                 </div>
              </div>
            </div>
        </div>

        <div class="card-body green">
          <div class="content">
            <div class="row justify-content-around m-3 rounded  bg-light">
              <!-- image column -->
              <div class="col-lg align-self-center" id="imagediv">
                <img :src="'https://northwesttheatre.tk/user/image?_id=' + show._id + '&token=' + token + '&time=' + time" class="rounded mx-1 my-1 w-100" alt="Image" id="imagesrc" />
                <!-- <img class="rounded mx-1 my-1 w-100" alt="Image" id="imagesrc" /> -->
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
                  <button type="button" class="btn btn-light font-weight-bold" @click.stop="emitshowdescription(show)">
                    Description
                  </button>
                </span>
                <br>
              </div>
              <!-- details of the show END -->
              <div class="col-lg lead" style="border:1px ">
                                                                                                                                                                                                                                                                                                <div class="component pb-1 mt-1 text-center seats_rounded bg-success text-light " style="border:2px solid grey">
                  <!-- Total Seats -->
                  <span class="px-1 font-weight-bold">
                      Limited Seats Available
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
          <!-- end buttons inside card -->
          </div>
          <!-- card-content-body -->
        </div>
      <!-- card-body -->
      </div>
    <!-- card -->
     <!-- <div class="modal animated zoomIn" id="ReserveTickets" tabindex="-1" role="dialog" aria-labelledby="ReserveTickets" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Enter Details</h5>
            <button type="button" class="close"  aria-label="Close" @click="closeReserveTicketsModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="ReserveTickets" id="ReserveTicketsUser">
                  <div class="form-group row">
                    <label class="col-sm-4 form-label">First Name:</label>
                    <input class="col-sm-7 form-control" type="text" id="Firstname" name="Firstname" placeholder="Firstname">
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 form-label">Last Name:</label>
                    <input class="col-sm-7 form-control" type="text" id="Lastname" name="Lastname" placeholder="Lastname">
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 form-label">Email:</label>
                    <input v-if="isTheatreAppreciationStudent === 'true'" class="col-sm-7 form-control" type="text" id="EmailAddress" name="EmailAddress"
                    placeholder="Email" pattern="[S|s]{1}[0-9]{6}@nwmissouri\.edu" oninvalid="this.setCustomValidity('expecting sXXXXXX@nwmissouri.edu')"
                    oninput="this.setCustomValidity('')" required>
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
                            <select id="NumberOfTicketsperPerson" class="form-control col-sm-7" name="NumberOfTicketsperPerson">
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'UserShow',
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
    emitshowdescription (showclicked) {
      this.$eventbus.$emit('showdescription', showclicked)
    },
    emitreserve () {
      this.$eventbus.$emit('reserve', this.show)
    }
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
</style>
