<template>
   <div class="col-sm-8 col-xs-8">
       This is a Show
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal1">
  Reserve Tickets
</button>
<!-- Modal -->
<div class="modal fade" id="Modal1" tabindex="-1" role="dialog" aria-labelledby="Modal1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Enter Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
              <div class="form-group row">
                <label class="col-sm-4 form-label">First Name:</label>
                <input class="col-sm-7 form-control" type="text" id="firstname">
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Last Name:</label>
                <input class="col-sm-7 form-control" type="text" id="lastname">
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Email:</label>
                <input class="col-sm-7 form-control" type="text" id="email">
      </div>
      <div class="form-group row">
                  <label class="col-sm-4 form-label">No. Of Tickets:</label>
                  <select id="inputState" class="form-control col-sm-7">
                    <option selected>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
      </div>
     <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-10 pt-0">Are you a theatre appreciation student?</legend>
      <div class="col-sm-10">
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="yes" value="option1" v-model="isTheatreAppreciationStudent">
  <label class="form-check-label" for="yes">Yes</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="no" value="option2" v-model="isTheatreAppreciationStudent">
  <label class="form-check-label" for="no">No</label>
</div>
    </div>
    </div>
    <div class="form-group row" v-if="isTheatreAppreciationStudent === 'option1'">
                <label class="col-sm-4 form-label">Section Number:</label>
                <input class="col-sm-7 form-control" type="text" id="sectionnumber">
              </div>
              <button type="button" v-if="isTheatreAppreciationStudent === 'option1'" class="btn btn-sm btn-light" data-toggle="popover" title="Section details" data-content="These are all the Section details">Section Numbers</button>
     </fieldset>    <button type="submit" class="btn btn-danger">Reset</button>  <button type="submit" class="btn btn-success">Submit</button>
    </form>
    </div>
  </div>
</div>
</div>
</div>   </template>

<script>
export default {
  name: 'AdminShow',
  data () {
    return {
      isTheatreAppreciationStudent: false
    }
  }
}
$(function () {
  /* global $ */
  $('[data-toggle="popover"]').popover()
})
</script>

<style scoped>

</style>
