//Eliminar un empleo 
const deleteJob = (jobId) => {
    fetch(`${base_url}/jobs/${jobId}`, {
    method: 'DELETE'})
  
    .then(() => getJobs(), 1000)
    .catch(error => console.log(error))
    .finally(() => getJobs(), 1000)
  }