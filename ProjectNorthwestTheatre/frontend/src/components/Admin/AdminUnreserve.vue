<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-3">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-3">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="shows"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
    >
      <!-- <template slot="EmailAddress" slot-scope="row">{{row.value}}</template>
      <template slot="LastName" slot-scope="row">{{row.value}}</template>
      <template slot="FirstName" slot-scope="row">{{row.value}}</template> -->
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="danger">
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
    <b-modal id="modalInfo"  hide-footer @hide="resetModal" :title="modalInfo.title">           
    <div class="d-block text-center">
        <b> Name: {{ modalInfo.content.FirstName }},{{ modalInfo.content.LastName }} <br>
                Email Address:  {{ modalInfo.content.EmailAddress }} </b>
    </div>
    <b-btn class="mt-3" variant="outline-danger" block @click="unreserveTicket">Unreserve Ticket</b-btn>
    </b-modal>

  </b-container>
</template>
<script>
export default {
  name: "unreserve",
  data() {
    return {
      items: this.shows,
      fields: [
        {
          key: "EmailAddress",
          label: "EmailAddress",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "LastName",
          label: "LastName",
          sortable: true,
          class: "text-center"
        },
        {
          key: "FirstName",
          label: "FirstName",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: this.shows.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      modalInfo: { title: "", content: "" }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key };
      });
    }
  },
  methods: {
    info(item, index, button) {
      console.log(`This is item = ${item}`);
      this.modalInfo.title = `Please Check Details`;
      this.modalInfo.content = item;
      this.$root.$emit("bv::show::modal", "modalInfo", button);
    },
    resetModal() {
      this.modalInfo.title = "";
      this.modalInfo.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  created() {
    console.log(this.shows);
  },
  props: ["shows"]
};
</script>
<style scoped>
</style>