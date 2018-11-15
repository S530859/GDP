<template>
 <div>
    <div class="modal" id="descriptionmodal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Playwright: {{ show.ShowPlayWright ? show.ShowPlayWright : '' }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
                </div>
                <div class="modal-body">
                    <p>{{ show.ShowDescription ? show.ShowDescription : '' }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
     <div class="row col-sm-12 ">
        <div class="fixed bg">
      </div>
        <div class=" offset-sm-6 col-sm-3 fixed ">
            <div class="input-group mt-3 ">
                <input class="form-control py-2 border-right-0 border" type="search" v-model="search"  placeholder="Search" id="example-search-input">
                <span class="input-group-append">
                    <div class="input-group-text green text-light"><i class="fa fa-search"></i></div>
                </span>
            </div>
      </div>
      <UserShow class="down" v-for="ele of updatedshowlist" :key="ele._id"  :show="ele" v-if="ele.isPublished" @click.native="showreservationmodal(ele)">
      </UserShow>
    </div>
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
    </div>
    </div>
</template>

<script>
import UserShow from "./UserShow.vue";
/* Saivarun Illendula - Added API Calls */
export default {
  name: "AdminDashboard",
  data() {
    return {
      /* global $ axios */
      sectionlist: [],
      showlist: [],
      show: "",
      search: "",
      isTheatreAppreciationStudent: '',
    };
  },
  components: {
    UserShow
  },
  methods: {
    closeReserveTicketsModal() {
      $("#ReserveTickets.modal").removeClass("zoomIn");
      $("#ReserveTickets.modal").addClass("zoomOut");
      setTimeout(function() {
        $("#ReserveTickets").modal("hide");
        $("#ReserveTickets.modal").removeClass("zoomOut");
      }, 100);
    },
    ReserveTickets() {
      let reserveticketdata = {
        FirstName: $("#Firstname").val(),
        LastName: $("#Lastname").val(),
        EmailAddress: $("#EmailAddress").val(),
        SectionEnrolled: $("#SectionEnrolled").val(),
        NumberOfTicketsperPerson: $("#NumberOfTicketsperPerson").val() ? $("#NumberOfTicketsperPerson").val() : 1,
        isStudent: JSON.parse(this.isTheatreAppreciationStudent),
        show_id: this.show._id
      };
      /* userurl */
      axios
        .post(userurl + "/reserve", reserveticketdata)
        .then(res => {
          this.closeReserveTicketsModal();
          swal("Congratualtions!", "You have reserved a Seat", "success");
          $("#ReserveTicketsUser")[0].reset();
          this.isTheatreAppreciationStudent = "";
        })
        .catch(err => {
          console.log("error in Reserving Ticket" + err);
        });
    },
    showdescriptionmodal() {
      $("#descriptionmodal").modal("show");
    },
    refreshData() {
      var _this = this
      /* global axios userurl */
       axios.get(userurl + "/sectionlist")
        .then(function(response) {
          console.log(`sectionlist ${response.data}`)
          _this.sectionlist = response.data
          _.each(_this.sectionlist, function(section) {
            section.ClassTime12hrs = moment(section.ClassTime, "HH:mm").format("hh:mm a")
          })
        })
        .catch(function(err) {
          console.log("error while getting section list", err)
        })

      axios.get(userurl + "/showlist")
        .then(function(response) {
          console.log(response.data)
          _this.showlist = response.data
        })
        .catch(function(err) {
          console.log("error while getting show list", err)
        })
    },
    showreservationmodal (show) {
      console.log('show clicked')
      this.show = show
      $('#ReserveTickets').modal('show')
      $('#ReserveTickets').addClass('zoomIn')
    }
  },
  created() {
    this.refreshData()
    this.$eventbus.$on(
      "refreshdata",
      function(data) {
        this.showlist = data
        console.log(data, this.showlist)
      }.bind(this)
    )
    this.$eventbus.$on(
      "showdescription",
      function(showclicked) {
        this.show = showclicked
        console.log("show description", this.show)
        this.showdescriptionmodal()
      }.bind(this)
    )
    this.$eventbus.$on( "reserve", function(show) {
        this.showreservationmodal()       
      }.bind(this)
    )
  },

  computed: {
    updatedshowlist() {
      return this.showlist.filter(show => {
        return show.ShowTitle.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  z-index: 100;
}

.down {
  top: 70px;
}

.bg {
  height: 70px;
  background-color: rgba(182, 221, 208, 0.9);
  background-image: linear-gradient(#f6f4ef, #f6f4ef);
  /* background-image: linear-gradient(207deg, rgba(182, 221, 208, 0.6) , #f6f4ef); */
  width: 100%;
  /* border-bottom: 5px solid rgba(4, 224, 151, 0.521); */
  /* border-bottom-left-radius: 50px ; */
  box-shadow: 0px 10px 5px #f6f4ef;
}

.green {
  background-color: #025736;
}
</style>
