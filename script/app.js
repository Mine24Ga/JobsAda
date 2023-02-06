const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


//MOSTRAR Y OCULTAR ELEMENTOS
const hideElement = (element) => element.classList.add("is-hidden");
const showElement = (element) => element.classList.remove("is-hidden");

/********************************************************************************************* 
                         OBTENER ELEMENTO DEL DOM CON EL ID
**********************************************************************************************/
$("#location-search")
const locationSearch = document.querySelector("#location-search");
const senioritySearch = document.querySelector("#seniority-search");
const categorySearch = document.querySelector("#category-search");
const btnSearch = document.querySelector("#btn-search");
const btnCancelSearch = document.querySelector("#btn-cancel-search");
const btnCreateJob = document.querySelector("#btn-create-job");
const createJobForm = document.querySelector("#create-job-form");
const btnCancel = document.querySelector("#btn-cancel");
const btnSubmit = document.querySelector("#btn-submit");
const searchForm = document.querySelector("#search-form");
const cardContainer = document.querySelector("#cards-container");
const errorContainer = document.querySelector("#error-container");
const formJob = document.querySelector("#form-job");


let selectedID, jobName, jobDescription, jobLocation, jobSeniority, jobCategory



/********************************************************************************************* 
                                        EVENTOS
**********************************************************************************************/
//mostrar formulario para crear empleo
const showFormJob = () => {
  hideElement(searchForm);
  hideElement(cardContainer);
  showElement(createJobForm);
 
};

$("#btn-create-job").addEventListener("click", () => {
  showFormJob();
});


/********************************************************************************************* 
                                        OPERACIONES
**********************************************************************************************/
let isEditing = false;
const base_url = "https://63dbee42b8e69785e48e794c.mockapi.io/api";

/*---------------------------------------------- GET ---------------------------------------- */
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

//Cards para la vista de empleos (VISTA PRINCIPAL)
const createJobsCard = (jobs) => {
  cardContainer.innerHTML = "";
  for (const { name, description, location, seniority, category, id } of jobs) {
    cardContainer.innerHTML += `    
        <div id="card" data-card=${id} class="is-3 card column p-3">
        <div class="content">
             <h2 class="title is-5">${name}</h2>
            <p class="is-size-6">${description}</p>
        </div>
        <div class="media ">
            <span  class="has-background-primary p-3 is-size-7 m-2">${location}</span>
            <span class="has-background-primary p-3 is-size-7 m-2">${category}</span>
            <span class="has-background-primary p-3 is-size-7 m-2">${seniority}</span>
        </div>
        <div id="buttons-container" class="control">
            <button onClick="seeJobDetails(${id})" class="button is-info"> See details</button>
        </div>
    </div>`;
  }
};
//Obtener un empleo
const seeJobDetails = (jobId) => {
  fetch(`${base_url}/jobs/${jobId}`)
    .then((response) => response.json())
    .then((data) => createCardDetail(data))
    selectedID = jobId
};

//DETALLES DE EMPLEO
const createCardDetail = ({
  name,
  description,
  location,
  seniority,
  category,
  id,
}) => {
  cardContainer.innerHTML = `    
        <div id="cont-card"  class=" is-5 card column p-4 " data-card=${id} >

            <div class="content">
                <div class="media">
                    <p id="name" class="title is-5">${name}</p>
                </div>
            </div>

            <div class="content has-text-centered">
                <p id="description" class="is-size-6">${description}</p>
            </div>

            <div id="tags" class="media">
                <span class=" p-3 m-2 is-size-7 has-background-primary " id="location">${location}</span>
                <span class=" p-3 m-2 is-size-7 has-background-primary" id="seniority">${seniority}</span>
                <span class=" p-3 m-2 is-size-7 has-background-primary " id="category">${category}</span>
            </div>

            <div id="container-buttons" class="buttons control">
                <button data-id="${id}" id="edit-job" class="button  is-info">
                    Edit Job
                </button>
                <button data-id="${id}" id="delete-job" class="button  is-danger">
                    Delete Job
                </button>
            </div>
        </div>`
        
        const btnEditJob = document.getElementById('edit-job')
        btnEditJob.addEventListener('click', () => showEditForm(selectedID))

        const btnDeleteJob = document.getElementById('delete-job')
        btnDeleteJob.addEventListener('click', warningDelete)

       
};


/*-------------------------------------------------- POST ----------------------------------- */
//formulario para crear un empleo
const createNewJob = () => {
 
    formJob.innerHTML = `
                <form class="box container"
                id="create-job-form">
            <div class="field">
                   <div class="control">
                     <label class="label">Job Title</label>
                         <input id="job-name" required="required"  class="input" type="text" placeholder="Job Title" />
                   </div>
            </div>

               <div class="field">
               <label class="label">Description: </label>
                <div class="control">
                  <textarea class="textarea" id="job-description"></textarea>
                </div>
               </div>

              <div class="field">
              <label class="label">Tags</label>
                  <div class="control">
                      <select class="input" name="Location" id="job-location">
                      <option value="Location">Location...</option>
                      <option value="Alemania<">Alemania</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Australia">Australia</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Canadá">Canadá</option>
                      <option value="Chile">Chile</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="España">España</option>
                      <option value="Francia">Francia</option>
                      </select>
                  </div>
              </div>
                
                
              <div class="field">
                 <div class="control">
                   <select class="input" name="Seniority" id="job-seniority">
                       <option value="Seniority">Seniority...</option>
                       <option value="Trainee">Trainee</option>
                       <option value="Junior">Junior</option>
                       <option value="Semi-Senior">Semi Senior</option>
                       <option value="Senior">Senior</option>
                   </select>
                 </div>
              </div>
                
                
               <div class="field">
                 <div class="control">
                     <select  class="input" name="Category" id="job-category">
                     <option value="Category">Category...</option>
                     <option value="Developer">Developer</option>
                     <option value="DBA">DBA</option>
                     <option value="Data Analyst">Data Analyst</option>
                     <option value="DevOps">DevOps</option>
                     <option value="QA automation">QA automation</option>
                     <option value="QA manual">QA manual</option>
                     <option value="UX/UI">UX/UI</option>
                     </select>
                 </div>
               </div>
                
                <div class="control">
                    <button class="button is-danger" onClick="getJobs()">Cancel</button>
                    <button class="button is-info" id="submit-job">Create job</button> 
                </div>
            </form>
            `
            const jobName = document.querySelector('#job-name');
            const jobDescription = document.querySelector('#job-description');
            const jobLocation = document.querySelector('#job-location');
            const jobCategory = document.querySelector('#job-category');
            const jobSeniority =  document.querySelector('#job-seniority');   

    const submitJob = document.getElementById('submit-job')
    submitJob.addEventListener('click', (e) => {
        e.preventDefault()
        submitNewJob()
        validateNewJobForm()
    })
}

//CREAR EMPLEO
btnCreateJob.addEventListener('click', createNewJob)

//guardar el valor de la informacion del empleo
const saveJobInfo = () => {
    return {
        name: document.getElementById('job-name').value,
        description: document.getElementById('job-description').value,
        location: document.getElementById('job-location').value,
        category: document.getElementById('job-category').value,
        seniority: document.getElementById('job-seniority').value,
       
    } 
}

//generar nuevo empleo
const submitNewJob = () => {

    fetch(`https://63dbee42b8e69785e48e794c.mockapi.io/api/jobs`, {
            method: "POST",
            headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(saveJobInfo())
            })
            .then (data => console.log(data))
            .catch(err => console.log(err))
            .finally(() => getJobs(), 1000)
            
}

const validateNewJobForm = () => {

  const jobName = document.getElementById('job-name')
  const jobDescription = document.getElementById('job-description')
  const jobLocation = document.getElementById('job-location')
  const jobCategory = document.getElementById('job-category')
  const jobSeniority =  document.getElementById('job-seniority')


  if (jobName.value === '' || jobDescription.value === '' || jobCategory.value === 'Category' || jobSeniority.value === 'Seniority' || jobLocation.value === 'Location') {
      errorContainer.innerHTML = `
      <div class="has-background-danger p-6 box" id="delete-container">
      <div class="delete-warning"> 
          <h3 class="title">Error</h3>
          <p class="subtitle">Please fill every field! </p>
          <div class="btn-container">
              <button class="button is-info" id="close-alert">Close</button>
          </div>
      </div>
  </div>`
  } else {
      submitNewJob()
  }

  const closeAlert = document.getElementById('close-alert')
  const modalContainer = document.getElementById('delete-container')

  closeAlert.addEventListener('click', () => {
      modalContainer.style.display = 'none'
  })
}

/*--------------------------------------------- PUT ---------------------------------------- */ 
//no funciona
//sección para editar el empleo 
const showEditForm = (selectedID) => {
cardContainer.innerHTML += `
              <form class="edit-job-form box container " id="edit-job-form">

               <div class="field">
                 <div class="control">
                 <label class="label">Job Title</label>
                         <input class="input" type="text" id="job-name" value="${jobName}"/>
                 </div>
               </div>

                 <div class="field">
                 <label class="label">Description: </label>
                   <div class="control">
                         <textarea class="textarea" id="job-description"/>${jobDescription}</textarea>
                   </div>
                 </div>

             <div class="field">
             <label class="label">Tags</label>
                  <div class="control">
                        <select  class="input" name="Location" id="job-location">
                        <option value="Location" class="location-option">Location...</option>
                        <option value="Alemania" class="location-option">Alemania</option>
                        <option value="Argentina" class="location-option">Argentina</option>
                        <option value="Australia" class="location-option">Australia</option>
                        <option value="Bolivia" class="location-option">Bolivia</option>
                        <option value="Brasil" class="location-option">Brasil</option>
                        <option value="Canadá" class="location-option">Canadá</option>
                        <option value="Chile" class="location-option">Chile</option>
                        <option value="Colombia" class="location-option">Colombia</option>
                        <option value="Ecuador" class="location-option">Ecuador</option>
                        <option value="España" class="location-option">España</option>
                        <option value="Francia" class="location-option">Francia</option>
                        </select>
                  </div>
             </div>

              <div class="field">
                   <div class="control">
                         <select class="input" name="Seniority" id="job-seniority">
                             <option value="Seniority" class="seniority-option">Seniority...</option>
                             <option value="Trainee" class="seniority-option">Trainee</option>
                             <option value="Junior" class="seniority-option">Junior</option>
                             <option value="Semi-Senior" class="seniority-option">Semi Senior</option>
                             <option value="Senior" class="seniority-option">Senior</option>
                         </select>
                   </div>
              </div>

                  <div class="field">
                    <div class="control">
                          <select  class="input" name="Category" id="job-category">
                          <option value="Category" class="category-option">Category...</option>
                          <option value="Developer" class="category-option">Developer</option>
                          <option value="DBA" class="category-option">DBA</option>
                          <option value="Data Analyst" class="category-option">Data Analyst</option>
                          <option value="DevOps" class="category-option">DevOps</option>
                          <option value="QA automation" class="category-option">QA automation</option>
                          <option value="QA manual" class="category-option">QA manual</option>
                          <option value="UX/UI" class="category-option">UX/UI</option>
                          </select>
                    </div>
                  </div>
                      
                  <div>
                      <button class="button is-danger" id="cancel-edit">Cancel</button>
                      <button class="button is-info" id="btn-edit-job">Edit job</button> 
                  </div>
              </form>
                      `

  const locationOption = document.querySelectorAll('.location-option')  
      for (const option of locationOption) {
          option.value === jobLocation && option.setAttribute('selected', 'selected')
  }
  
  const seniorityOption = document.querySelectorAll('.seniority-option')  
  for (const option of seniorityOption) {
      option.value === jobSeniority && option.setAttribute('selected', 'selected')
  }
  
  const categoryOption = document.querySelectorAll('.category-option')  
  for (const option of categoryOption) {
      option.value == jobCategory && option.setAttribute('selected', 'selected')
  }


  const btnCancelEdit = document.getElementById('cancel-edit')
  btnCancelEdit.addEventListener('click', (e) => {
      e.preventDefault()

  const editJobForm = document.getElementById('edit-job-form')
      editJobForm.style.display = 'none'
      seeJobDetails(selectedID)
  })

  const btnEditJob = document.getElementById('btn-edit-job')
  btnEditJob.addEventListener('click', (e) => {
      e.preventDefault()
      validateEditJobForm()
    
  })
}
const editJob = (selectedID) => {
  fetch(`${base_url}/jobs/${selectedID}`, {
      method: "PUT",
          headers: {
                  "Content-Type": "Application/json"
              },
          body: JSON.stringify(saveJobInfo())
  })
  .then(() => seeJobDetails(selectedID))
  .catch(error => console.log(error))
  .finally(() => getJobs(), 1000)
}


const validateEditJobForm = () => {

  const jobName = document.getElementById('job-name')
  const jobDescription = document.getElementById('job-description')
  const jobLocation = document.getElementById('job-location')
  const jobCategory = document.getElementById('job-category')
  const jobSeniority =  document.getElementById('job-seniority')


  if (jobName.value === '' || jobDescription.value === '' || jobCategory.value === 'Category' || jobSeniority.value === 'Seniority' || jobLocation.value === 'Location') {
      errorContainer.innerHTML = `
      <div class="has-background-danger p-6 box" id="delete-container">
      <div class="delete-warning"> 
          <h3 class="title">Error</h3>
          <p class="subtitle">Please fill every field! </p>
          <div class="btn-container">
              <button class="button is-info" id="close-alert">Close</button>
          </div>
      </div>
  </div>`
  } else {
      editJob(selectedID)
  }

  const closeAlert = document.getElementById('close-alert')
  const modalContainer = document.getElementById('delete-container')

  closeAlert.addEventListener('click', () => {
      modalContainer.style.display = 'none'
  })
}
/*------------------------------------------- DELETTE -------------------------------------- */
//Eliminar un empleo 
const deleteJob = (jobId) => {
  fetch(`${base_url}/jobs/${jobId}`, {
  method: 'DELETE'})

  .then(() => getJobs(), 1000)
  .catch(error => console.log(error))
  .finally(() => getJobs(), 1000)
}

const warningModal = document.getElementById('delete-container')

const warningDelete = () => {
  
  cardContainer.innerHTML += `
  <div class="has-background-danger p-6 box" id="delete-container">
      <div class="delete-warning"> 
          <h3 class="title">Warning</h3>
          <p class="subtitle p-2">Are you sure you want to delete this job offer?</p>
          <div class="btn-container">
              <button class="button is-info" id="btn-cancel">Cancel</button>
              <button class="button is-primary" id="delete-offer">Delete Job</button>
          </div>
      </div>
  </div>
  `
  
  const cancelBtn = document.getElementById('btn-cancel')
  const modalContainer = document.getElementById('delete-container')
  cancelBtn.addEventListener('click', () => {
      modalContainer.style.display = 'none'
      seeJobDetails(selectedID)
  })

  const deleteJobOffer = document.getElementById('delete-offer')
  deleteJobOffer.addEventListener('click', () => {
      deleteJob(selectedID) 
  })
}



/*--------------------------------------------- FILTROS ------------------------------------ */
const searchBy = document.getElementById('search-by')
let primaryFilter = ''
let secondaryFilter = ''

searchBy.addEventListener('change', () => {
    primaryFilter = searchBy.value

    if (searchBy.value === 'Location') {
        locationSearch.classList.add('hidden')
        senioritySearch.classList.remove('hidden')
        categorySearch.classList.remove('hidden')

    } else if (searchBy.value === 'Seniority') {
        locationSearch.classList.remove('hidden')
        senioritySearch.classList.add('hidden')
        categorySearch.classList.remove('hidden')

    } else  if (searchBy.value === 'Category') {
        locationSearch.classList.remove('hidden')
        senioritySearch.classList.remove('hidden')
        categorySearch.classList.add('hidden')

    } else {
            locationSearch.classList.remove('hidden')
            senioritySearch.classList.remove('hidden')
            categorySearch.classList.remove('hidden')
    }

    if (primaryFilter === 'Location') {
        locationSearch.addEventListener('change', () => {
            secondaryFilter = locationSearch.value
        })
    } else if (primaryFilter === 'Category') {
        categorySearch.addEventListener('change', () => {
            secondaryFilter = categorySearch.value
        }) 
    } else if (primaryFilter === 'Seniority') {
        senioritySearch.addEventListener('change', () => {
            secondaryFilter = senioritySearch.value
        })
    }
})


const filterSearch = (secondaryFilter) => {
    fetch(`${base_url}/jobs/?search=${secondaryFilter}`) //revisar
        .then(res => res.json())
        .then(data => createJobsCard(data))
        .catch(error => console.log(error))
}


btnSearch.addEventListener('click', () => filterSearch(secondaryFilter))

btnCancelSearch.addEventListener('click', () => {
    getJobs()
    primaryFilter = ''
    secondaryFilter = ''
    searchBy.value = 'SearchBy'
    locationSearch.classList.remove('hidden')
    senioritySearch.classList.remove('hidden')
    categorySearch.classList.remove('hidden')
})

