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