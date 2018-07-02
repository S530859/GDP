<template>
   <div class="col-sm-12 col-xs-12 row">
      This is a dashboard
       <LeftNavbar></LeftNavbar>
       <AdminShow></AdminShow>
    <hr>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
      Add Show
    </button>

    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add New Show Details:</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="addshow" id="addshow">
              <div class="form-group row">
                <label class="col-sm-4 form-label">Show Name:</label>
                <input class="col-sm-7 form-control" type="text" id="showname" v-model="formdata.ShowTitle" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Playwright:</label>
                <input class="col-sm-7 form-control" type="text" id="playwright" v-model="formdata.ShowPlaywright" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Description:</label>
                <input class="col-sm-7 form-control" type="text" id="description" v-model="formdata.ShowDescription" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Show Date:</label>
                <input class="col-sm-7 form-control" type="date" id="showdate" v-model="formdata.ShowDate" required>
              </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Show Time:</label>
                 <input class="col-sm-7 form-control" type="time" :value="showtime" id="showtime" required>
              </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Total Seats:</label>
                  <input class="col-sm-7 form-control" type="number" id="totalseats" v-model="formdata.NumberOfTickets" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Venue:</label>
                  <input class="col-sm-7 form-control" type="text" id="showvenue" v-model="formdata.ShowVenue" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Show Rating:</label>
                  <select id="inputState" class="form-control col-sm-7" required v-model="formdata.ShowRating" >
                    <option selected>Choose...</option>
                    <option>A</option>
                    <option>U/A</option>
                    <option>R</option>
                  </select>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Adult Price:</label>
                  <input class="col-sm-7 form-control" type="number" id="adultprice" v-model="formdata.ShowPrice" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Children Price:</label>
                  <input class="col-sm-7 form-control" type="number" id="childrenprice" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Upload Image:</label>
                  <div class="form-group col-sm-7">
                    <input type="file" class="form-control-file" id="InputFile" aria-describedby="fileHelp" required>
                    <small id="fileHelp" class="form-text text-muted"></small>
                  </div>
                </div>
                 <div class="form-group row">
                   <label class="col-sm-4 form-label">Publish:</label>
              <label class="switch float-right form-group">
                <input type="checkbox" class="sliderinput" v-model="formdata.isPublished" required>
                <span class="slider round"></span>
              </label>
            </div>
            <div class="">
                <button type="reset" class=" btn btn-danger">Reset</button>
                <button type="submit" class=" btn btn-success">Add & Save</button>
            </div>
             </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import AdminShow from './AdminShow.vue'
import LeftNavbar from './AdminNavbar.vue'
export default {
  name: 'AdminDashboard',
  data () {
    return {
      formdata: {
        ShowTitle: '',
        ShowPlaywright: '',
        ShowDescription: '',
        ShowDate: '',
        NumberOfTickets: 0,
        ShowVenue: '',
        ShowRating: '',
        ShowPrice: 0,
        isPublished: false
      },
      /* global moment  */
      showtime: moment().format('HH:mm:ss')
    }
  },
  components: {
    AdminShow,
    LeftNavbar
  },
  methods: {
    addshow () {
      console.log(this.formdata)
      /* global $ axios url */
      axios.create({
        baseURL: url,
        timeout: 1000,
        headers: { 'token': window.localStorage.getItem('AccessToken') }
      }).post('/addadmin', this.formdata)
        .then(function (response) {
          console.log(response)
          $('#myModal').modal('hide')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch .sliderinput {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

.sliderinput:checked + .slider {
  background-color: green;
}

.sliderinput:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.sliderinput:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
