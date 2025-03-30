import { fetchHeader, fetchFooter, fetchMatch } from "./loaderTemplates.js";
import { fetchData, textToHTML } from "./utils.js";

async function loadTournamentView() {
    await fetchHeader();
    await fetchFooter();

    const matches = await fetchData('../../resources/mocks/MOCK_MATCHES.json', null);
    const tournaments = await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', null);
    const matchTemplateHTML = await fetchMatch();

    const lastMatchesContainer = document.querySelector(".partidos-section:nth-of-type(1) .partidos");
    const upcomingMatchesContainer = document.querySelector(".partidos-section:nth-of-type(2) .partidos");
    const tournamentInfoContainer = document.querySelector(".torneo-info");

    lastMatchesContainer.innerHTML = "";
    upcomingMatchesContainer.innerHTML = "";

    const today = new Date();

    const sortedMatches = matches.sort((a, b) => {
        return new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-"));
    });

    const lastMatches = sortedMatches.filter(match => new Date(match.date.split("/").reverse().join("-")) < today).slice(-3);
    const upcomingMatches = sortedMatches.filter(match => new Date(match.date.split("/").reverse().join("-")) >= today).slice(0, 3);

    lastMatches.forEach(match => {
        const matchElement = textToHTML(matchTemplateHTML).body.firstElementChild.cloneNode(true);
        matchElement.querySelector(".text-light-date").textContent = match.date + " - " + match.hour;

        const teams = matchElement.querySelectorAll(".team p");
        teams[0].textContent = match.participants[0] || "Equipo 1";
        teams[1].textContent = match.participants[1] || "Equipo 2";

        const images = matchElement.querySelectorAll(".team img");
        images[0].src = match.image;
        images[1].src = match.image;

        lastMatchesContainer.appendChild(matchElement);
    });

    upcomingMatches.forEach(match => {
        const matchElement = textToHTML(matchTemplateHTML).body.firstElementChild.cloneNode(true);
        matchElement.querySelector(".text-light-date").textContent = match.date + " - " + match.hour;

        const teams = matchElement.querySelectorAll(".team p");
        teams[0].textContent = match.participants[0] || "Equipo 1";
        teams[1].textContent = match.participants[1] || "Equipo 2";

        const images = matchElement.querySelectorAll(".team img");
        images[0].src = match.image;
        images[1].src = match.image;

        upcomingMatchesContainer.appendChild(matchElement);
    });

    if (tournaments.length > 0) {
        const tournament = tournaments[0];
        tournamentInfoContainer.innerHTML = `
            <div class="torneo-detalle">
                <img src="${tournament.image}" alt="Imagen del torneo">
                <h2>${tournament.name}</h2>
                <p>Organizado por: ${tournament.organizer}</p>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadTournamentView);

