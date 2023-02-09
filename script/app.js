/********************************************************************************************* 
                                      UTILITIES
**********************************************************************************************/
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
//MOSTRAR Y OCULTAR ELEMENTOS
const hideElement = (element) => element.classList.add("is-hidden");
const showElement = (element) => element.classList.remove("is-hidden");

/********************************************************************************************* 
                         OBTENER ELEMENTO DEL DOM CON EL ID
**********************************************************************************************/
const locationSearch = document.querySelector("#location-search");
const senioritySearch = document.querySelector("#seniority-search");
const categorySearch = document.querySelector("#category-search");
const btnSearch = document.querySelector("#btn-search");
const btnCancelSearch = document.querySelector("#btn-cancel-search");
const createJobForm = document.querySelector("#create-job-form");
const searchForm = document.querySelector("#search-form");
let selectedID, jobName, jobDescription, jobLocation, jobSeniority, jobCategory

/********************************************************************************************* 
                                    OPERACIONES DOM
**********************************************************************************************/
let isEditing = false;
const base_url = "https://63dbee42b8e69785e48e794c.mockapi.io/api";

/*----------------------- Cards para la vista de empleos (VISTA PRINCIPAL) ------------------*/
const createJobsCard = (jobs) => {
$("#cards-container").innerHTML = "";
  for (const { name, description, location, seniority, category, id } of jobs) {
    $("#cards-container").innerHTML += `    
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


/*-------------------------------- Card del detalle de empleo -------------------------------*/
const createCardDetail = ({
  name,
  description,
  location,
  seniority,
  category,
  id,
}) => {
    $("#cards-container").innerHTML = `    
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
        //botones editar o eliminar de la card detalle. 
        $('#edit-job').addEventListener('click', () => showEditForm(selectedID))
        $('#delete-job').addEventListener('click', warningDelete)   
};

/*--------------------------------- formulario para crear empleo----------------------------- */
const createNewJob = () => {
    $("#form-job").innerHTML = `
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
            $('#job-name');
            $('#job-description');
            $('#job-location');
            $('#job-category');
            $('#job-seniority');   

    $('#submit-job').addEventListener('click', (e) => {
        e.preventDefault()
        submitNewJob()
        validateNewJobForm()
    })
    
}
//CREAR EMPLEO
$("#btn-create-job").addEventListener('click', createNewJob)
//guardar el valor de la informacion del empleo
const saveJobInfo = () => {
    return {
        name: $('#job-name').value,
        description: $('#job-description').value,
        location: $('#job-location').value,
        category: $('#job-category').value,
        seniority: $('#job-seniority').value,
       
    } 
}
//validacion del formulario para crear un empleo
const validateNewJobForm = () => {
  if ($('#job-name').value === '' || $('#job-description').value === '' || $('#job-category').value === 'Category' || $('#job-seniority').value === 'Seniority' || $('#job-location').value === 'Location') {
    $("#error-container").innerHTML = `
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
     //evento para el boton de cerrar modal cuando los datos no estan completos
    $('#close-alert').addEventListener('click', () => {
     $('#delete-container').style.display = 'none'
  })
}

/*-------------------------------- formulario para editar el empleo -------------------------*/ 
//no funciona
const showEditForm = (selectedID) => {
    $("#cards-container").innerHTML += `
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
   //evento para el boton de cancelar editar
  $('#cancel-edit').addEventListener('click', (e) => {
      e.preventDefault()
  $('#edit-job-form').style.display = 'none'
      seeJobDetails(selectedID)
  })
  //evento para el boton de editar (NO FUNCIONA)?
  $('#btn-edit-job').addEventListener('click', (e) => {
      e.preventDefault()
      validateEditJobForm()
    
  })
}
//validacion del formulario de editar empleo
const validateEditJobForm = () => {
    if ($('#job-name').value === '' || $('#job-description').value === '' || $('#job-category').value === 'Category' || $('#job-seniority').value === 'Seniority' || $('#job-location').value === 'Location') {
    $("#error-container").innerHTML = `
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
    //evento para el boton de cerrar modal 
  $('#close-alert').addEventListener('click', () => {
    $('#delete-container').style.display = 'none'
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