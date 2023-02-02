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

//volver a la vista principal de las cards
const showSearch = () => {
    hideElement(createJobForm);
    showElement(searchForm);
};

btnCancel.addEventListener("click", () => {
    showSearch();
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
        <div id="card" data-card=${id} class=" is-3 card column p-4 ">
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

const createCardDetail = (cardDetail) => {
    const { name, location, category, seniority, description } = cardDetail;
    cardContainer.innerHTML = `
  <div class="card-detail">
  <p class="return" onClick="getJobs()">Go back</p> 
  <div class="job-container">
        <div class="job-details">

              <h2>${name}</h2>

              <div class="job-description">
                  <h4>Job Description:</h4>
                  <p>${description}</p>
              </div>

              <div class="tags-container">
                  <h3>Tags: </h3> 
                  <span>${location}</span> 
                  <span>${category}</span> 
                  <span>${seniority}</span>
              </div>

        </div>

        <div class="button-container">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </div>
  </div>`
};
