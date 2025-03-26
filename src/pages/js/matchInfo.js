import {fetchHeader, fetchFooter} from "./loaderTemplates.js";
import {fetchData} from "./utils.js";
import {setCardMatchInfoProperties} from "./cardsOperations.js";

const matches = await fetchData("../../resources/mocks/MOCK_MATCHES.json", null);
const tournaments = await fetchData("../../resources/mocks/MOCK_TOURNAMENT.json", null);

async function loadData() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let type = params.get("type");
    const match = findMatchInfo(id, type)

    setCardMatchInfoProperties(match);
}

function findMatchInfo(idMatch, type) {
    console.log(idMatch, type)
    if (idMatch !== null) {
        if(type === "tournament") return tournaments.find(tournament => tournament.id === Number(idMatch));
        if(type === "matches") return matches.find(match => match.id === Number(idMatch));
    }
    return matches[0];
}

async function loadPage() {
    await fetchHeader();
    await fetchFooter();
    await loadData();
}

loadPage();