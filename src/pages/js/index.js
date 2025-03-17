import {fetchCards, fetchFooter, fetchHeader} from "./loaderTemplates.js";
import {fetchData, textToHTML} from "./utils.js";
import {setCardProperties} from "./cardsOperations.js";


async function loadIndexData() {
    var tournamentContainer = document.querySelector(".tournament-cards");
    var matchesContainer = document.querySelector(".matches-cards");

    var tournamentsData = await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json',null, 10)
    var matchesData = await fetchData('../../resources/mocks/MOCK_MATCHES.json', null, 10)

    var cardTemplate = textToHTML(await fetchCards());

    tournamentsData.forEach(element => {
        let templateContainer = setCardProperties(cardTemplate, element);
        tournamentContainer.appendChild(templateContainer);
    })

    matchesData.forEach(element => {
        let templateContainer = setCardProperties(cardTemplate, element);
        matchesContainer.appendChild(templateContainer);
    })
}



document.addEventListener("DOMContentLoaded",  async function () {
    await fetchHeader();
    await loadIndexData();
    await fetchFooter();
})
