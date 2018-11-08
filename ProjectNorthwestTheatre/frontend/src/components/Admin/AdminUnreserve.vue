<template>
  <b-container fluid>
    <!-- User Interface controls -->
     <b-row>
      <p>{{ ShowTitle }}</p>
    </b-row>
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
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-form-select :options="customfilterproperties" v-model="customfilter" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="customfiltermeth"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
    >
      <template slot="#" slot-scope="data"> {{data.index + 1}} </template>
      <template slot="actions" slot-scope="row">
        
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="danger" >
         <strong><span class = "mr-2"><i class="fas fa-user-slash"></i></span>Unreserve</strong>
        </b-button>
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
                  Email Address:  {{ modalInfo.content.EmailAddress }} </b>
      </div>
      <b-btn class='mt-3' variant='outline-danger' block @click="unreserveTicket">Unreserve Ticket</b-btn>
    </b-modal>

  </b-container>
</template>
<script>
export default {
  name: 'unreserve',
  data () {
    return {
      customfilter: '',
      customfilterproperties: ['Students','Others','All'],
      items: this.students,
      fields: [
        '#',
        {
          key: 'EmailAddress',
          label: 'EmailAddress',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'LastName',
          label: 'LastName',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'FirstName',
          label: 'FirstName',
          sortable: true,
          class: 'text-center'
        },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: this.students.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
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
  methods: {
    info (item, index, button) {
      console.log(`This is item = ${JSON.stringify(item)}`)
      this.modalInfo.title = `Please Check Details`
      this.modalInfo.content = item
      this.addanimation()
    },
    resetModal () {
      $('#modalInfo').removeClass('zoomIn')
      $('#modalInfo').addClass('zoomOut')
       setTimeout(function(){ 
        $("#modalInfo").modal("hide")    
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
    addanimation () {
      console.log('test')
      $('#modalInfo').addClass('animated zoomIn')
      $('#modalInfo').modal('show')

    },
    customfiltermeth (row) {

      console.log(`section ${row.SectionEnrolled}`)

      if(this.customfilter === 'Students'){
        if(row.SectionEnrolled && !isNaN(row.SectionEnrolled) && row.SectionEnrolled != 'undefined'){
          return this.filter ? `${row.LastName}${row.FirstName}${row.EmailAddress}`.toLowerCase().includes(this.filter.toLowerCase()) : true 
        }
        return false
      }
      if(this.customfilter === 'Others'){
         if(row.NumberOfTicketsperPerson){
          return this.filter ? `${row.LastName}${row.FirstName}${row.EmailAddress}`.toLowerCase().includes(this.filter.toLowerCase()) : true 
        }
        return false
    }
        
      if(this.filter){
        return `${row.LastName}${row.FirstName}${row.EmailAddress}`.includes(this.filter)
      }
      return true
    },
    unreserveTicket () {
      /* axios _ url swal */
      console.log(this.show_id)
      axios.post( url + '/unreserve', { 
        show_id: this.show_id,
        id: this.modalInfo.content._id,
        isStudent: this.modalInfo.content.SectionEnrolled && !isNaN(this.modalInfo.content.SectionEnrolled) && this.modalInfo.content.SectionEnrolled != 'undefined' ? true : false
      }).then( res => {
        this.items = res.data
        swal("Success", "Unreserved a Seat", "success")
        this.resetModal()
      }).catch( err => {
        swal("Failure", "Test", "error")
        console.log(err)
      })
    }
  },
  props: ['students','show_id','ShowTitle']
}
</script>
<style scoped>
</style>
