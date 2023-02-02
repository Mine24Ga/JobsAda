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
const cardContainer = document.querySelector('#cards-container');

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
// Obtener todos los usuarios
/*const getJobs = () => {
    fetch(`${base_url}/jobs`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(() => alert("La base de datos no esta disponible en este momento"));
    // .finally(() => console.log('finnaly'));
  };
getJobs();*/

const getJobs = async () => {
    try {
        const response = await fetch(`${base_url}/jobs`);
        const jobs = await response.json();
        console.log(jobs);
       
    } 
    catch (error) {
        alert("La base de datos no esta disponible en este momento");
       
    }
}
getJobs()



