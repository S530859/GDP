<template>
   <div>
     <!-- Created by Supraja Kumbam -->
    <!-- Saivarun Illendula : Added Card to Section List -->
     <div class="tb">
       <h1 class = "h2 mb-3 font-weight-normal">View Section </h1>
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">Semester</th>
              <th scope="col">Section no</th>
              <th scope="col">Instructor</th>
              <th scope="col">Day</th>
              <th scope="col">Time</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ele,index) of sectionlist" :key="ele._id">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>
                {{ ele.Semester }} {{ ele.Year }}
              </td>
              <td>
                {{ ele.SectionNumber }}
              </td>
              <td>
                {{ ele.ProfessorName }}
              </td>
              <td>
                {{ ele.ClassDay }}
              </td>
              <td>
                {{ ele.ClassTime12hrs }}
              </td>
              <td>
                <button type="button" class="btn rounded-circle float-right m-2" id="delete" @click="deletesection(ele._id)">
                    <i class="fas fa-trash"></i>
                </button>
                <button type="button" class="btn rounded-circle float-right m-2" id="edit" @click="editsection(ele)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
     </div>
      <div class="modal fade" id="editSectionadminmodal" role="dialog" aria-labelledby="editSectionadminmodal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Edit Admin details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <form id="editSectionadminform" @submit.prevent="editSectionform">
            <div class="form-group row justify-content-center">
              <label class="col-sm-4 text-right form-label">Professor Name:</label>
              <input class="col-sm-8 form-control" type="text" name="ProfessorName" :value="section.ProfessorName" placeholder="Professor Name" id="profname">
            </div>
            <div class="form-group row justify-content-center">
              <label class="col-sm-4 form-label text-right">Day:</label>
              <div class="col-sm-8" >
                  <div class="col-sm-2 form-check form-check-inline justify-content-center">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="M" v-model="section.ClassDaylist" value="M">
                    <label class="form-check-label justify-content-center" for="inlineCheckbox1">M</label>
                  </div>
                  <div class="col-sm-1 form-check form-check-inline justify-content-center">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="T" v-model="section.ClassDaylist" value="T">
                    <label class="form-check-label justify-content-center" for="inlineCheckbox2">T</label>
                  </div>
                  <div class="col-sm-2 form-check form-check-inline justify-content-center">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="W" v-model="section.ClassDaylist" value="W">
                    <label class="form-check-label justify-content-center" for="inlineCheckbox3">W</label>
                  </div>
                  <div class="col-sm-1 form-check form-check-inline justify-content-center">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="R" v-model="section.ClassDaylist" value="R">
                    <label class="form-check-label justify-content-center" for="inlineCheckbox3">R</label>
                  </div>
                  <div class="col-sm-2 form-check form-check-inline justify-content-center">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="F" v-model="section.ClassDaylist" value="F">
                    <label class="form-check-label justify-content-center" for="inlineCheckbox3">F</label>
                  </div>
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <label class="col-sm-4 text-right form-label">Section Time:</label>
                <input class="col-sm-8 form-control" type="time"  id="sectiontime" name="ClassTime" :value="section.ClassTime" required>
            </div>
            <div class="form-group row justify-content-center">
              <label class="col-sm-4 text-right form-label">Section Number:</label>
              <input class="col-sm-8 form-control" type="number" placeholder="Section Number" name="SectionNumber" :value="section.SectionNumber" id="secnumber">
            </div>
            <div class="form-group row justify-content-center">
              <label class="col-sm-4 text-right form-label">
              Semester:
              </label>
                <div class="col-sm-8 float-left">
                  <div class="form-check form-check-inline col-sm-3">
                    <input class="form-check-input" type="radio" name="Semester" v-model="section.Semester" id="yes" value="Fall">
                    <label class="form-check-label" for="yes">Fall</label>
                  </div>
                  <div class="form-check form-check-inline col-sm-3">
                    <input class="form-check-input" type="radio" name="Semester" v-model="section.Semester" id="no" value="Spring">
                    <label class="form-check-label" for="no">Spring</label>
                  </div>
                  <div class="form-check form-check-inline col-sm-3">
                    <input class="form-check-input" type="radio" name="Semester" v-model="section.Semester" id="no" value="Summer">
                    <label class="form-check-label" for="no">Summer</label>
                  </div>
                </div>
            </div>
            <div class="form-group row justify-content-center">
              <label class="col-sm-4 text-right form-label">
                Year:
              </label>
              <input class="col-sm-8 form-control" type="number" id="year" :min="mindate" name="Year" v-model="section.Year" required>
            </div>
            <button type="reset" class="btn btn-danger">Reset</button>
            <button type="submit" class="btn btn-success">Save Changes</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionList',
  data () {
    return {
      sectionlist: [],
      section: {},
      /* global moment $ */
      mindate: moment().format('YYYY')
    }
  },
  methods: {
    editsection (section) {
      console.log(section)
      this.section = section
      this.section.ClassDaylist = this.section.ClassDay.split('')
      $('#editSectionadminmodal').modal('show')
    },
    alert (header, msg, type) {
      swal(header, msg, type)
    },
    editSectionform () {
      var formdata = new FormData(document.querySelector('#editSectionadminform'))
      var data = {
        ProfessorName: formdata.get('ProfessorName'),
        ClassDay: '' + (formdata.get('M') ? formdata.get('M') : '') + (formdata.get('T') ? formdata.get('T') : '') + (formdata.get('W') ? formdata.get('W') : '') + (formdata.get('R') ? formdata.get('R') : '') + (formdata.get('F') ? formdata.get('F') : ''),
        ClassTime: formdata.get('ClassTime'),
        SectionNumber: formdata.get('SectionNumber'),
        Semester: formdata.get('Semester'),
        Year: formdata.get('Year'),
        id: this.section._id
      }
      /* global axios url swal $ */
      var _this = this
      axios.create({
        baseURL: url,
        headers: { 'token': window.localStorage.getItem('AccessToken') }
      }).post('/updatesection', data)
        .then(res => {
          $('#editSectionadminform')[0].reset()
          $('#editSectionadminmodal').modal('hide')
          _this.alert('Congratulations!', 'Section has been added successfully', 'success')
          _this.refreshData()
        })
        .catch(error => {
          console.log(error)
          _this.alert(error.response.data, 'Please try again', 'error')
        })
    },
    deletesection (sectionid) {
      var _this = this
      /* global swal axios url */
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios.create({
              baseURL: url,
              timeout: 1000,
              headers: { 'token': window.localStorage.getItem('AccessToken') }
            }).post('/deletesection', { id: sectionid })
              .then(res => {
                swal(
                  'Deleted!',
                  'Selected Admin has been deleted.',
                  'success'
                )
                _this.refreshData()
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
    },
    refreshData () {
      /* global axios moment _ */
      var _this = this
      axios({
        method: 'get',
        headers: {
          token: window.localStorage.getItem('AccessToken')
        },
        url: url + '/sectionlist'
      })
        .then(function (response) {
          console.log(response.data)
          _this.sectionlist = response.data
          _.each(_this.sectionlist, function (section) {
            section.ClassTime12hrs = moment(section.ClassTime, 'HH:mm').format('hh:mm a')
          })
        })
        .catch(function (err) {
          console.log('error while getting section list', err)
        })
    }
  },
  created () {
    this.refreshData()
  }
}
</script>

<style scoped>
div.tb {
  margin-right: 50px;
}

div.tb {
  margin-right: 50px;
}
#delete:hover {
  color: #910000;
  background-color: #DA7A7A
}
#delete {
  color: #D14F4F;
  background-color: none
}
#edit:hover {
  color: #1A1818;
  background-color: #AB9898
}
#edit {
  color: #746967;
  background-color: none
}
</style>
