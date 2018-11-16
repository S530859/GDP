<template>
     <!-- Rahul Reddy Lankala - Added adminList -->
    <b-container>
        <b-row>
          <b-col md="5" class="my-3">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="4" class="my-3">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-table show-empty
                hover
                stacked="md"
                :items="adminlist"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
        >
          <template slot="#" slot-scope="data"> {{data.index + 1}} </template>
          <template slot="actions" slot-scope="row">
            <button type="button" class="btn rounded-circle btn-custom m-2" id="edit" @click="editadmin(row.item)">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn rounded-circle btn-custom m-2" id="delete" @click="deleteadmin(row.item._id)" v-if="row.item.Username !== 'admin'">
                <i class="fas fa-trash"></i>
            </button>
          </template>

        </b-table>

        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>

        <div class="modal fade" id="editModaladmin" role="dialog" aria-labelledby="editModaladmin" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Admin details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <form id="editModaladminform" @submit.prevent="editadminform">
                <div class="form-group row">
                  <label class="col-sm-5 form-label">Username:</label>
                  <input class="col-sm-6 form-control" type="text" name="username" :value="admin.Username" id="username" placeholder="Username">
                </div>
                <div class="form-group row">
                  <label class="col-sm-5 form-label">Email Address:</label>
                  <input class="col-sm-6 form-control" type="text" id="email" name="email" :value="admin.Email" placeholder="Email">
                </div>
                <div class="modal-footer">
                  <button type="reset" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                  <button type="reset" class="btn btn-primary">Reset</button>
                  <button type="submit" class="btn btn-success">Save changes</button>
              </div>
              </form>
              </div>
            </div>
          </div>
        </div>

    </b-container>
</template>

<script>
export default {
  name: 'AdminList',
  data () {
    return {
      adminlist: [],
      count: 0,
      admin: {},
      fields: [
        '#',
        {
          key: 'Username',
          label: 'Username',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'Email',
          label: 'EmailAddress',
          sortable: true,
          sortDirection: 'desc'
        },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0, // adminlist.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null
    }
  },
  methods: {
    resetModal () {
      $('#modalInfo').removeClass('zoomIn')
      $('#modalInfo').addClass('zoomOut')
      setTimeout(function () {
        $('#modalInfo').modal('hide')
        $('#modalInfo').removeClass('animated zoomOut')
      }, 100)
      // this.modalInfo.title = ''
      // this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    editadmin (admin) {
      this.admin = admin
      /* global $ */
      $('#editModaladmin').modal('show')
    },
    editadminform () {
      console.log('edit form clicked')
      var formdata = new FormData(
        document.querySelector('#editModaladminform')
      )
      var data = {
        updateusername: formdata.get('username'),
        id: this.admin._id,
        updateemail: formdata.get('email')
      }
      /* global axios url swal */
      axios.post(url + '/updateadmin', data)
        .then(
          function (res) {
            $('#editModaladmin').modal('hide')
            swal('Updated!', 'Admin has been successfully updated.', 'success')
            axios.get(url + '/all')
              .then(response => {
                this.adminlist = response.data
                console.log(this.adminlist)
              })
              .catch(err => {
                console.log('error while getting admin list', err)
              })
          }.bind(this)
        )
        .catch(error => {
          console.log(error)
        })
    },
    getlist () {
      /* global axios */
      axios.get(url + '/all')
        .then(response => {
          this.adminlist = response.data
          console.log(this.adminlist)
        })
        .catch(err => {
          console.log('error while getting admin list', err)
        })
    },
    storelist (data) {
      this.adminlist = data
      console.log(this.adminlist)
    },
    deleteadmin (adminid) {
      /* global swal axios url */
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios.post(url + '/deleteadmin', { id: adminid })
            .then(res => {
              swal('Deleted!', 'Selected Admin has been deleted.', 'success')
              this.getlist()
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  },
  created () {
    this.getlist()
    this.$eventbus.$on('admindata', data => {
      this.storelist(data)
    })
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key }
      })
    }
  }
}
</script>

<style scoped>
.btn-custom {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 6px;
  margin-right: 6px;
}
div.tb {
  margin-right: 50px;
}
#delete:hover {
  color: #910000;
  background-color: #da7a7a;
}
#delete {
  color: #ffffff;
  background-color: #910000;
}
#edit:hover {
  color: #1a1818;
  background-color: rgb(160, 235, 153);
}
#edit {
  color: #ffffff;
  background-color: #585958;
}
/* .modal {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .modal:before {
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 100%;
  }
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
} */

table.table-bordered > tbody > tr > td,
th {
  border: 1px solid black;
  font-size: 25px;
  vertical-align: middle;
}

@media only screen and (max-width: 800px) {
  table.table-bordered > tbody > tr > td,
  th {
    font-size: 15px;
  }
}

.table-striped > tbody > tr:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.248);
}
</style>
