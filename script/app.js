const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

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
const btnCreateJob = document.querySelector("#btn-create-job");
const createJobForm = document.querySelector("#create-job-form");
const btnCancel = document.querySelector("#btn-cancel");
const btnSubmit = document.querySelector("#btn-submit");
const searchForm = document.querySelector("#search-form");
const cardContainer = document.querySelector("#cards-container");
const errorContainer = document.querySelector("#error-container");
const formJob = document.querySelector("#form-job");
const jobName = document.querySelector('#job-name');
const jobDescription = document.querySelector('#job-description');
const jobLocation = document.querySelector('#job-location');
const jobCategory = document.querySelector('#job-category');
const jobSeniority =  document.querySelector('#job-seniority');


/********************************************************************************************* 
                                        EVENTOS
**********************************************************************************************/
//mostrar formulario para crear empleo
const showFormJob = () => {
  hideElement(searchForm);
  showElement(createJobForm);
};

btnCreateJob.addEventListener("click", () => {
  showFormJob();
});

/********************************************************************************************* 
                                        OPERACIONES
**********************************************************************************************/
let isEditing = false;
const base_url = "https://63dbee42b8e69785e48e794c.mockapi.io/api";

//GET
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

//Cards para la vista de empleos
const createJobsCard = (jobs) => {
  cardContainer.innerHTML = "";
  for (const { name, description, location, seniority, category, id } of jobs) {
    cardContainer.innerHTML += `    
        <div id="card" data-card=${id} class=" is-12 card column p-4 ">
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
            <button class="button is-danger">Delete Job</button>
        </div>
    </div>`;
  }
};
//Obtener un empleo
const seeJobDetails = (jobId) => {
  fetch(`${base_url}${jobId}`)
    .then((response) => response.json())
    .then((data) => createCardDetail(data));
};

const createCardDetail = ({
  name,
  description,
  location,
  seniority,
  category,
  id,
}) => {
  cardContainer.innerHTML = `    
        <div id="cont-card" data-card=${id} >
            <div class="content">
                <div class="media">
                    <p id="name" class="subtitle is-5">${name}</p>
                </div>
            </div>
            <div class="content has-text-centered">
                <p id="description" class="is-size-7">${description}</p>
            </div>
            <div id="tags" class="media">
                <p class="has-text-dark is-size-7 has-background-primary p-1 m-1" id="location">${location}</p>
                <p class="has-text-dark is-size-7 has-background-primary p-1 m-1" id="seniority">${seniority}</p>
                <p class="has-text-dark is-size-7 has-background-primary p-1 m-1" id="category">${category}</p>
            </div>
            <div id="container-buttons" class="buttons control">
                <button data-id="${id}" class="button btn-edit-job is-small is-primary">
                    Edit Job
                </button>
                <div class="control" >
                    <button data-id="${id}" class="button btn-msj-delete is-small is-danger">Delete Job</button>
                </div>
            </div>
        </div>`
};

//POST
//formulario para crear un empleo
const createNewJob = () => {
    searchForm.style.display = 'none'
    cardContainer.innerHTML = `
                <form class="box"
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
                     </select>
                 </div>
               </div>
                
                <div class="control">
                    <button class="button is-danger" onClick="getJobs()">Cancel</button>
                    <button class="button is-info" id="submit-job">Create job</button> 
                </div>
            </form>
            `

    const submitJob = document.getElementById('submit-job')
    submitJob.addEventListener('click', (e) => {
        e.preventDefault()
        submitNewJob()
    })
}


btnCreateJob.addEventListener('click', createNewJob)


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






