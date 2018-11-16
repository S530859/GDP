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
            <button type="button" class="btn rounded-circle btn-custom m-2" id="edit" @click="editperson(row.item)">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn rounded-circle btn-custom m-2" id="delete" @click="deleteperson(row.item._id)">
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
    <button type="button" aria-label="Close" class="close" @click="resetModal" slot="modal-header">×</button>
      <div class='d-block text-center'>
          <b> Name: {{ modalInfo.content.FirstName }},{{ modalInfo.content.LastName }} <br>
                  Email Address:  {{ modalInfo.content.email }} </b>
      </div>
      <b-btn class='mt-3' variant='outline-danger' block @click="deleteperson(modalInfo.content._id)">DeletePerson</b-btn>
    </b-modal>
    <!-- Info modal -->
    <b-modal id='addperson' ref="modal" hide-footer :title="addpersonmodaldata.title" no-fade centered >
        <h5 class="modal-title" slot="modal-header">Please Check Details</h5>
        <button type="button" aria-label="Close" class="close" @click="resetModal" slot="modal-header">×</button>
        <div slot="modal-body">
            <form @submit.prevent="addperson(addpersonmodaldata.content._id)" id="person">
                <div class="form-group row">
                <label class="col-sm-4 form-label">First Name:</label>
                <input class="col-sm-7 form-control" type="text" id="Firstname" v-model="addpersonmodaldata.content.FirstName"
                    name="Firstname" placeholder="Firstname" required>
                </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Last Name:</label>
                <input class="col-sm-7 form-control" type="text" id="LastName" v-model="addpersonmodaldata.content.LastName"
                    name="LastName" placeholder="LastName" required>
                </div>
                <div class="form-group row">
                <label class="col-sm-4 form-label">Email Address:</label>
                <input class="col-sm-7 form-control" type="text" id="email" v-model="addpersonmodaldata.content.email"
                    name="email" placeholder="Email Address" required>
                </div>
                <b-btn class='mt-3' variant='outline-danger' block slot="modal-footer" type="submit">AddPerson</b-btn>
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
      modalInfo: { title: '', content: '' },
      addpersonmodaldata: { title: '', content: { FirstName: '', LastName: '', email: '' } }
    }
  },
  methods: {
    deleteperson (id) {
    },
    editperson () {
    },
    addpersonmodal () {
      this.addpersonmodaldata.title = `Please Check Details`
      this.addanimation('addperson')
    },
    info (item, index, button) {
      console.log(`This is item = ${JSON.stringify(item)}`)
      this.modalInfo.title = `Please Check Details`
      this.modalInfo.content = item
      this.addanimation()
    },
    resetModal (modal = 'modalInfo') {
      $('#' + modal).removeClass('zoomIn')
      $('#' + modal).addClass('zoomOut')
      setTimeout(function () {
        $('#' + modal).modal('hide')
        $('#' + modal).removeClass('animated zoomOut')
      }, 100)
      // this.modalInfo.title = ''
      // this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    addanimation (modal = 'modalInfo') {
      $('#' + modal).addClass('animated zoomIn')
      $('#' + modal).modal('show')
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key }
      })
    }
  },
  created () {
    /* global $ axios url */
    axios
      .get(url + '/getpersonslist')
      .then(res => this.items = res.data)
      .catch(err => console.log(err))
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
