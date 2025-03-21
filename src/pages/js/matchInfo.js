import {fetchHeader, fetchFooter} from "./loaderTemplates.js";
import {fetchData} from "./utils.js";
import {setCardMatchInfoProperties} from "./cardsOperations.js";

const matches = await fetchData("../../resources/mocks/MOCK_MATCHES.json", null);

async function loadData() {

    const match = findMatchInfo(null)

    setCardMatchInfoProperties(match);
}

function findMatchInfo(idMatch) {
    if (idMatch !== null) {
        return matches.find(match => match.id === idMatch);
    }
    return matches[0];
}

async function loadPage() {
    await fetchHeader();
    await fetchFooter();
    await loadData();
}

loadPage();