import {fetchFooter, fetchHeader} from "./loaderTemplates.js";

document.querySelectorAll(".sidebar-button").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        changePanelInfo(button);
    })

});

document.addEventListener("DOMContentLoaded", (e) => {
    changePanelInfo(document.querySelector("#my-data"));
});


function changePanelInfo(button){
    const panelName = document.getElementById("panel-name")
    const panelContent = document.getElementById("panel-content")

    if (button.id === "my-data") {
        panelName.innerHTML = button.name;
    } else if (button.id === "my-teams") {
        panelContent.innerHTML = "<h1>ESTO SON MIS EQUIPOS</h1>"
    }else if (button.id === "my-statistics") {
        panelContent.innerHTML = "<h1>ESTO SON MIS ESTADISTICAS</h1>"
    } else if (button.id === "my-tournaments") {
        panelContent.innerHTML = "<h1>ESTO SON MIS TORNEOS</h1>"
    } else if (button.id === "my-matches") {
        panelContent.innerHTML = "<h1>ESTO SON MIS PARTIDOS</h1>"
    }

    let btn = document.querySelector(".sidebar-button.active");
    console.log(btn)
    btn.classList.remove("active");
    button.classList.add("active");
}

fetchHeader();
fetchFooter();