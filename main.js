let Axios = require("axios").default;
let info = require("./info.json")
info.list_repoID.forEach(repoid => {
    Axios.post(`https://gitlab.com/api/v4/projects/${repoid}/fork`, {}, { headers: { "PRIVATE-TOKEN": info.gitlab_token } })
        .then((res) => {
            console.log(`done ${repoid} ${res.status} ${res.statusText}`)
        })
        .catch(err => {
            if (err.response.status == 401) {
                console.log("Sai cái authorize key");
            }
            console.log(`fail: ${repoid} ${err.response.status} ${err.response.statusText}`)
            Axios.get(`https://gitlab.com/api/v4/projects/${repoid}`, {}, { headers: { "PRIVATE-TOKEN": info.gitlab_token } })
                .then((res) => {
                    console.log(res.data.web_url);
                })
                .catch(err => {
                    console.log(err.response.message);
                })
        })
})