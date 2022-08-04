addEventListener("load", getforceList);
addEventListener("load", specificForce);
addEventListener("load", getNeighList);
const element = document.getElementById("forceList");
element.addEventListener("click", getOfficerList);
element.addEventListener("click", specificForce);
element.addEventListener("click", getNeighList);

function getforceList() {
    let text = "";
    // fetch, then set a promise. Fetch something then expect a return, then once you receive response, what do you want it to do?
    fetch("https://data.police.uk/api/forces")
        .then(res => res.json())
        .then(function (res) {
            for (const key in res) {
                const force = res[key];
                if (force.id == "essex") {
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
            if (Object.keys(res).length > 0) {
                for (const key in res) {
                    const officer = res[key];
                    text += '<div class="menuitem"><h4>' + officer.name + '</h4>';
                    if (officer.rank != null) {
                        text += '<h5>' + officer.rank + '</h5 >';
                    }
                    if (officer.bio != null) {
                        text += '<p>' + officer.bio + '</p>';
                    }
                    text += '</div>';
                    document.getElementById("officer").innerHTML = text;

                }
            }
            else {
                text = "No Bio Available for " + value;
                document.getElementById("officer").innerHTML = text;
            }
        }).catch((error) => {
            console.log("Error")
        })
}

function specificForce() {
    let text = '<ul class="social" id="social">';
    let name;
    let description;
    let tel = "Telephone: ";

    let value = document.getElementById("forceList").value;
    if ((value == 0) || (value == null) || (value == 'undefined')) {
        // if value is equal to null or 0 or undefined, then do the next...
        value = "essex";
        // on load, the page value will always revert back to essex info, because we know this key data can fill the page
    }
    let url = "https://data.police.uk/api/forces/" + value;
    fetch(url)
        .then(res => res.json())
        .then(res => {
            const spForce = res;

            force = spForce.name;

            des = spForce.description;

            tel += spForce.telephone;

            text += '<li><a href="' + spForce.url + '"><img src="/images/www.png" alt="website" style="width:30px;height:30px;"><br>Website</a></li>';

            document.getElementById("specificForceName").innerHTML = force;



            if (des != null) {

                document.getElementById("specificForceDes").innerHTML = des;

            } else {

                des = "No description for " + spForce.name + "!";

                document.getElementById("specificForceDes").innerHTML = des;

            }

            document.getElementById("specificForceTel").innerHTML = tel;
            for (const key in spForce.engagement_methods) {

                const media = spForce.engagement_methods[key];

                if ((media.title != null) && (media.title.toLowerCase() == "facebook")) {

                    text += '<li><a href="' + media.url + '"><img src="/images/facebook.png" alt="facebook"style="width:30px;height:30px;"><br>Facebook</a></li>'

                } else if ((media.title != null) && (media.title.toLowerCase() == "twitter")) {

                    text += '<li><a href="' + media.url + '"><img src="/images/twitter.png" alt="twitter" style="width:30px;height:30px;"><br>Twitter</a></li>'

                } else if ((media.title != null) && (media.title.toLowerCase() == "youtube")) {

                    text += '<li><a href="' + media.url + '"><img src="/images/youtube.png" alt="youtube" style="width:30px;height:30px;"><br>YouTube</a></li>'

                }

            }
            text += '</ul>';

            document.getElementById("social-div").innerHTML = text;

            // const forceLink = res;
            // // console.log(Object.keys(forceLink.engagement_methods).length);  (used as a test to see if our function works correctly)
            // name = forceLink.name;
            // description = forceLink.description;
            // tel += forceLink.telephone;

            // document.getElementById("specificForceName").innerHTML = name;
            // if (description != null) {
            //     document.getElementById("specificForceDes").innerHTML = description;
            // }
            // else {
            //     description = "No description for " + forceLink.name + "!";

            //     document.getElementById("specificForceDes").innerHTML = description;
            // }
            // document.getElementById("specificForceTel").innerHTML = tel;
            // text += '<li><a href=' + forceLink.url + '><img src="/images/www.png" alt="website"style="width:30px;height:30px;"><br>Website</a></li>';
            // for (const key in forceLink.engagement_methods) {
            //     const media = forceLink.engagement_methods[key];

            //     if ((media.title != null) && (media.title.toLowerCase() == "facebook")) {
            //         text += '<li><a href=' + media.url + '><img src="/images/facebook.png" alt="facebook"style="width:30px;height:30px;"><br>Facebook</a></li>';

            //     } else if ((media.title != null) && (media.title.toLowerCase() == "twitter")) {
            //         text += '<li><a href=' + media.url + '><img src="/images/youtube.png" alt="youtube"style="width:30px;height:30px;"><br>YouTube</a></li>';

            //     } else if ((media.title != null) && (media.title.toLowerCase() == "youtube")) {
            //         text += '<li><a href=' + media.url + '><img src="/images/twitter.png" alt="twitter"style="width:30px;height:30px;"><br>Twitter</a></li>';

            //     }
            //     text += '</ul>';
            //     document.getElementById("social-div").innerHTML = text;
            // }
        })
        .catch((error) => {

            console.log(error);

        })

}

function getNeighList() {

    let text = "";
    let value = document.getElementById("forceList").value;
    if ((value == 0) || (value == null) || (value == 'undefined')) {
        value = "essex";
    }
    let url = 'https://data.police.uk/api/' + value + '/neighbourhoods';
    fetch(url)
        .then(res => res.json())
        .then(function (res) {
            for (const key in res) {
                const force = res[key];
                text += "<option value=" + force.id + ">" + force.name + "</option>";
                // console.log(`${key}: ${res[key].id}`);
                document.getElementById("neighbourhoodsList").innerHTML = text;
            }
        }).catch((error) => {
            console.log("Error")
        })
}

