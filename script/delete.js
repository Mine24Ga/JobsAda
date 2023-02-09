//Eliminar un empleo 
const deleteJob = (jobId) => {
    fetch(`${base_url}/jobs/${jobId}`, {
    method: 'DELETE'})
  
    .then(() => getJobs(), 1000)
    .catch(error => console.log(error))
    .finally(() => getJobs(), 1000)
  }

const warningModal = document.getElementById('delete-container')
//card de advertencia para eliminar oferta de empleo
const warningDelete = () => {
  $("#cards-container").innerHTML += `
  <div class="has-background-danger p-6 box" id="delete-container">
      <div class="delete-warning"> 
          <h3 class="title">Warning</h3>
          <p class="subtitle p-2">Are you sure you want to delete this job offer?</p>
          <div class="btn-container">
              <button class="button is-info" id="btn-cancel">Cancel</button>
              <button class="button is-primary" id="delete-offer">Delete Job</button>
          </div>
      </div>
  </div>`
  
  $('#btn-cancel').addEventListener('click', () => {
    $('#delete-container').style.display = 'none'
      seeJobDetails(selectedID)
  })

  
  $('#delete-offer').addEventListener('click', () => {
      deleteJob(selectedID) 
  })
}