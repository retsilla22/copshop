addEventListener("load", getforceList);
const element = document.getElementById("forceList");
element.addEventListener("click", getOfficerList);

function getforceList() {
    let text = "";
    // fetch, then set a promise. Fetch something then expect a return, then once you receive response, what do you want it to do?
    fetch("https://data.police.uk/api/forces")
        .then(res => res.json())
        .then(function (res) {
            for (const key in res) {
                const force = res[key];
                if (force.id == "durham") {
                    text += "<option selected value=" + force.id + ">" + force.name + "</option>";
                } else {
                    text += "<option value=" + force.id + ">" + force.name + "</option>";
                }
                // console.log(`${key}: ${res[key].id}`);
                document.getElementById("forceList").innerHTML = text;
            }
        }).catch((error) => {
            console.log("Error")
        })

}


function getOfficerList() {
    let text = "";
    let value = document.getElementById("forceList").value;
    let url = "https://data.police.uk/api/forces/";
    url += value;
    url += "/people";
    fetch(url)
        .then(res => res.json())
        .then(function (res) {
            for (const key in res) {
                const officer = res[key];
                text += "<h3>" + officer.name + "</h3>< h3 >" + officer.rank + "</h3><p>" + officer.bio + "</p>";
                document.getElementById("officer").innerHTML = text;
            }

        }).catch((error) => {
            console.log("Error")
        })
}