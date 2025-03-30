import { fetchHeader, fetchFooter, fetchMatch } from "./loaderTemplates.js";
import { fetchData, textToHTML } from "./utils.js";

async function loadTournamentView() {
    await fetchHeader();
    await fetchFooter();

    const matches = await fetchData('../../resources/mocks/MOCK_MATCHES.json', null);
    const tournaments = await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', null);
    const teams = await fetchData('../../resources/mocks/MOCK_TEAMS.json', null);
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

    const lastMatches = sortedMatches.filter(match => new Date(match.date.split("/").reverse().join("-")) < today).slice(-3).reverse();
    const upcomingMatches = sortedMatches.filter(match => new Date(match.date.split("/").reverse().join("-")) >= today).slice(0, 3);

    const getTeamByName = (name) => {
        return teams.find(team => team.name === name);
    };

    lastMatches.forEach(match => {
        const matchElement = textToHTML(matchTemplateHTML).body.firstElementChild.cloneNode(true);
        matchElement.querySelector(".text-light-date").textContent = match.date + " - " + match.hour;

        const teamsElements = matchElement.querySelectorAll(".team p");

        const team1 = getTeamByName(match.participants[0]);
        const team2 = getTeamByName(match.participants[1]);

        teamsElements[0].textContent = team1 ? team1.name : "Equipo 1";
        teamsElements[1].textContent = team2 ? team2.name : "Equipo 2";

        const images = matchElement.querySelectorAll(".team img");
        images[0].src = team1 ? team1.image : "default_image_url_1";
        images[1].src = team2 ? team2.image : "default_image_url_2";

        matchElement.addEventListener("click", () => {
            window.location.href = `matchView.html?id=${match.id}`;
        });

        lastMatchesContainer.appendChild(matchElement);
    });

    upcomingMatches.forEach(match => {
        const matchElement = textToHTML(matchTemplateHTML).body.firstElementChild.cloneNode(true);
        matchElement.querySelector(".text-light-date").textContent = match.date + " - " + match.hour;

        const teamsElements = matchElement.querySelectorAll(".team p");

        const team1 = getTeamByName(match.participants[0]);
        const team2 = getTeamByName(match.participants[1]);

        teamsElements[0].textContent = team1 ? team1.name : "Equipo 1";
        teamsElements[1].textContent = team2 ? team2.name : "Equipo 2";

        const images = matchElement.querySelectorAll(".team img");
        images[0].src = team1 ? team1.image : "default_image_url_1";
        images[1].src = team2 ? team2.image : "default_image_url_2";

        matchElement.addEventListener("click", () => {
            window.location.href = `matchView.html?id=${match.id}`;
        });

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
