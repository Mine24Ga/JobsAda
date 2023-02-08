//generar nuevo empleo
const submitNewJob = () => {

    fetch(`${base_url}/jobs`, {
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