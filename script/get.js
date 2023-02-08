// Obtener todos los empleos
const getJobs = async () => {
    try {
      const response = await fetch(`${base_url}/jobs`);
      const jobs = await response.json();
      console.log(jobs);
      createJobsCard(jobs);
    } catch (error) {
      alert("La base de datos no esta disponible en este momento");
    }
};
  getJobs();

//Obtener un empleo
const seeJobDetails = (jobId) => {
    fetch(`${base_url}/jobs/${jobId}`)
      .then((response) => response.json())
      .then((data) => createCardDetail(data))
      selectedID = jobId
};