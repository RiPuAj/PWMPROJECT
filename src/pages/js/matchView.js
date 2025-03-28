import {fetchHeader, fetchFooter} from "./loaderTemplates.js";
import {fetchData} from "./utils.js";

const matchesResultsData = await fetchData("../../resources/mocks/MOCK_MATCHES_RESULTS.json", null);


async function loadData() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (!id) alert("No se puede buscar partido, falta el identificador")
    setProperties(matchesResultsData.find(match => match.id === Number(id)));

}

function setProperties(match){
    const date = document.getElementById("match-date");
    const hour = document.getElementById("match-hour");
    const teamOneImage = document.getElementById("team-one-image");
    const teamOneList = document.getElementById("team-one-list");
    const teamOneResult = document.getElementById("team-one-result");
    const status = document.getElementById("status");
    const teamTwoResult = document.getElementById("team-two-result");
    const teamTwoImage = document.getElementById("team-two-image");
    const teamTwoList = document.getElementById("team-two-list");

    date.innerText = match.date;
    hour.innerText = match.hour;
    teamOneImage.src = match.images.team_1;
    teamTwoImage.src = match.images.team_2;
    teamOneResult.innerText = match.result.team_1;
    teamTwoResult.innerText = match.result.team_2;
    status.innerText = match.status;


    match.participants.team_1.forEach(participant => {
        const li = document.createElement("li");
        li.textContent = participant;
        teamOneList.appendChild(li);
    })

    match.participants.team_2.forEach(participant => {
        const li = document.createElement("li");
        li.textContent = participant;
        teamTwoList.appendChild(li);
    })

}

fetchHeader();
fetchFooter();
loadData();