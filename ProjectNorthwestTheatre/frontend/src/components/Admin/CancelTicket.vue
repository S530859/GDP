<template>
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
      <b-col md="3" class="my-3">
         <b-btn block @click="addpersonmodal">AddPerson</b-btn>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             hover
             stacked="md"
             :items="items"
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
      <template slot="name" slot-scope="data"> {{ data.item.LastName }}, {{ data.item.FirstName }} </template>
      <template slot="actions" slot-scope="row">
            <button type="button" class="btn rounded-circle btn-custom m-2" id="edit" @click="editpersonmodal(row.item)">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn rounded-circle btn-custom m-2" id="delete" @click="deletepersonmodal(row.item)">
                <i class="fas fa-trash"></i>
            </button>
          </template>

    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal id='modalInfo' ref="modal" hide-footer :title="modalInfo.title" no-fade centered >
    <h5 class="modal-title" slot="modal-header">Please Check Details</h5>
    <button type="button" aria-label="Close" class="close" @click="resetModal('modalInfo')" slot="modal-header">×</button>
      <div class='d-block text-center'>
          <b> Name: {{ modalInfo.content.FirstName }},{{ modalInfo.content.LastName }} <br>
                  Email Address:  {{ modalInfo.content.email }} </b>
      </div>
      <b-btn class='mt-3' variant='outline-danger' block @click="deleteperson(modalInfo.content._id)">DeletePerson</b-btn>
    </b-modal>
    <!-- Info modal -->
    <b-modal id='editperson' ref="modal" hide-footer title="editperson" no-fade centered >
        <h5 class="modal-title" slot="modal-header">Please Check Details</h5>
        <button type="button" aria-label="Close" class="close" @click="resetModal('editperson')" slot="modal-header">×</button>
        <div>
            <form @submit.prevent="editpersonrequest(editperson.content._id)" id="eperson">
                <div class="form-group row">
                <label class="col-sm-4 form-label">First Name:</label>
                <input class="col-sm-7 form-control" type="text" id="FirstName" v-model="editperson.content.FirstName"
                    name="FirstName" placeholder="Firstname" required>
                </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Last Name:</label>
                <input class="col-sm-7 form-control" type="text" id="LastName" v-model="editperson.content.LastName"
                    name="LastName" placeholder="LastName" required>
                </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Email Address:</label>
                <input class="col-sm-7 form-control" type="email" id="email" v-model="editperson.content.email"
                    name="email" placeholder="Email Address" required>
                </div>
                <b-btn class='mt-3' variant='outline-success' block slot="modal-footer" type="submit">Update Person</b-btn>
            </form>
        </div>
    </b-modal>
    <b-modal id='addperson' ref="modal" hide-footer title="Add Details" no-fade centered >
        <h5 class="modal-title" slot="modal-header">Please Check Details</h5>
        <button type="button" aria-label="Close" class="close" @click="resetModal('addperson')" slot="modal-header">×</button>
        <div>
            <form @submit.prevent="addperson" id="aperson">
                <div class="form-group row">
                <label class="col-sm-4 form-label">First Name:</label>
                <input class="col-sm-7 form-control" type="text" id="FirstName" 
                    name="FirstName" placeholder="Firstname" required>
                </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Last Name:</label>
                <input class="col-sm-7 form-control" type="text" id="LastName" 
                    name="LastName" placeholder="LastName" required>
                </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Email Address:</label>
                <input class="col-sm-7 form-control" type="email" id="email" 
                    name="email" placeholder="Email Address" required>
                </div>
                <b-btn class='mt-3' variant='outline-success' block slot="modal-footer" type="submit">AddPerson</b-btn>
            </form>
        </div>
    </b-modal>
  </b-container>
</template>

<script>
export default {
    name: 'cancelticket',
    data () {
       return {
        items: [],
        fields: [
            '#',
            {
            key: 'email',
            label: 'EmailAddress',
            sortable: true,
            sortDirection: 'desc'
            },
            {
            key: 'name',
            label: 'DisplayName',
            sortable: true,
            class: 'text-center'
            },
            { key: 'actions', label: 'Actions' }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        modalInfo: { title: '', content: '', _id: '' },
        editperson: { title: '', content: { FirstName: '', LastName: '', email: '' } }
       }
    },
    methods: {
        deleteperson (id) {
            axios
            .post(url + '/deleteperson', {id: id})
            .then(res => {
                this.resetModal('modalInfo')
                this.reloaddata()
            })
            .catch(err => { 
                    console.log(err)
            })
                
        },
        deletepersonmodal(item){
            this.modalInfo.content = item
            this.addanimation()
        },
        addperson () {
            /* global axios url $ */
            let data = new FormData(document.querySelector('#aperson'))
            axios.post(url + '/addperson', {
                'FirstName': data.get('FirstName'),
                'LastName': data.get('LastName'),
                'email': data.get('email')
            }).then(res => {
                    $('#aperson').trigger('reset')
                    this.resetModal('addperson')
                    this.reloaddata()
                })
                .catch(err => { 
                        console.log(err)
                })

        },
        editpersonrequest (id) {
            let data = new FormData(document.querySelector('#eperson'))
            
            axios.post(url + '/updateperson', {
                'FirstName': data.get('FirstName'),
                'LastName': data.get('LastName'),
                'email': data.get('email'),
                'id': id
            }).then(res => {
                    this.resetModal('editperson')
                    this.reloaddata()
                })
                .catch(err => { 
                        console.log(err)
                })
        },
        editpersonmodal (item) {
            this.editperson.content = item
            this.editperson.title = 'Please Check Details'
            this.addanimation('editperson')
        },
        addpersonmodal () {
            this.addanimation('addperson')
        },
        info (item, index, button) {
            console.log(`This is item = ${JSON.stringify(item)}`)
            this.modalInfo.title = `Please Check Details`
            this.modalInfo.content = item
            this.addanimation()
        },
        resetModal (modal = 'modalInfo') {
            console.log(modal)
            $('#' + modal).removeClass('zoomIn')
            $('#' + modal).addClass('zoomOut')
            setTimeout(function () {
                $('#' + modal).modal('hide')
                $('#' + modal).removeClass('animated zoomOut')
            }, 100)
        // this.modalInfo.title = ''
        // this.modalInfo.content = ''
        },
        addanimation (modal = 'modalInfo') {
            $('#' + modal).addClass('animated zoomIn')
            $('#' + modal).modal('show')
        },
        reloaddata () {
            axios
            .get(url + '/getpersonslist')
            .then(res => {
                this.items = res.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created () {
        /* global $ axios url */
        this.reloaddata()   
    }
}
</script>

<style scoped>
#delete:hover {
  color: #910000;
  background-color: #DA7A7A
}
#delete {
  color: #ffffff;
  background-color: #910000
}
#edit:hover {
  color: #1A1818;
  background-color: rgb(160, 235, 153)
}
#edit {
  color: #ffffff;
  background-color: #585958
}
</style>
