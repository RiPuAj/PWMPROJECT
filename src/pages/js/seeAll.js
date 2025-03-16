import {fetchHeader, fetchCards, fetchFooter} from "./loaderTemplates.js";
import {fetchData, textToHTML} from "./utils.js";
import {setCardProperties} from "./cardsOperations.js";

async function loadSeeAllPage(){
    const data = document.querySelector("#tournaments-container") != null ?
        await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', 25):
        await fetchData('../../resources/mocks/MOCK_MATCHES.json', 25);

    var container = document.querySelector(".all-cards-container");
    var cardTemplate = textToHTML(await fetchCards());

    data.forEach(element => {
        let templateContainer = setCardProperties(cardTemplate, element);
        container.appendChild(templateContainer);
    })
}

const loadPage = async () => {
    await fetchHeader();
    await loadSeeAllPage();
    await fetchFooter();
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadPage();
})