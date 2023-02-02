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
const base_url = "https://63c87103e52516043f527b92.mockapi.io/api/";
