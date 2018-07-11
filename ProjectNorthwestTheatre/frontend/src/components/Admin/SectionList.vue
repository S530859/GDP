<template>
   <div>
    <!--Saivarun Illendula : Added Card to Section List -->
     <div class="tb">
       <h1 class = "h2 mb-3 font-weight-normal">View Section </h1>
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">Section no</th>
              <th scope="col">Instructor</th>
              <th scope="col">Day</th>
              <th scope="col">Class timings</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ele,index) of adminlist" :key="ele._id">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>
                {{ ele.Instructor }}
              </td>
              <td>
                {{ ele.Day }}
                <button type="button" class="btn rounded-circle float-right m-2" id="delete" @click="deleteadmin(ele._id)">
                    <i class="fas fa-trash"></i>
                </button>
                <button type="button" class="btn rounded-circle float-right m-2" id="edit" @click="editadmin(ele._id)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
     </div>
  </div>
</template>

<script>

</script>

<style scoped>
div.tb {
  margin-right: 50px;
}
</style>
