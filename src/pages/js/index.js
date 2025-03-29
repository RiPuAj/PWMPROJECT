import {fetchCards, fetchFooter, fetchHeader} from "./loaderTemplates.js";
import {fetchData, textToHTML} from "./utils.js";
import {setCardProperties} from "./cardsOperations.js";

var tournaments;
var matches;


async function loadIndexData(tournamentsData, matchesData) {
    var tournamentContainer = document.querySelector(".tournament-cards");
    var matchesContainer = document.querySelector(".matches-cards");

    tournamentContainer.innerHTML ="";
    matchesContainer.innerHTML = "";

    if(tournamentsData.length == 0) tournamentContainer.innerHTML = "<h1> NO HAY TORNEOS DISPONIBLES </h1>";
    if(matchesData.length == 0) matchesContainer.innerHTML = "<h1> NO HAY PARTIDOS DISPONIBLES </h1>";

    var cardTemplate = textToHTML(await fetchCards());

    tournamentsData.forEach(element => {
        let templateContainer = setCardProperties(cardTemplate, element, "tournament");
        tournamentContainer.appendChild(templateContainer);
    })

    matchesData.forEach(element => {
        let templateContainer = setCardProperties(cardTemplate, element, "matches");
        matchesContainer.appendChild(templateContainer);
    })
}

async function find(value) {
    if (value.length < 1) return loadIndexData(tournaments.splice(0,10), matches.splice(0,10))

    let matchesFiltered = matches.filter(element => {
        return element.name.toLowerCase().includes(value);
    })

    let tournamentsFiltered = tournaments.filter(element => {
        return element.name.toLowerCase().includes(value);
    })

    return loadIndexData(tournamentsFiltered, matchesFiltered);

}


document.addEventListener("DOMContentLoaded",  async function () {

    tournaments = await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', null);
    matches = await fetchData('../../resources/mocks/MOCK_MATCHES.json', null);

    await fetchHeader();
    await loadIndexData(tournaments.splice(0,10), matches.splice(0,10))
    await fetchFooter();
    document.getElementById("search-input").addEventListener("input", async event => {
        console.log(event.target.value);
        await find(event.target.value);
    })
})
