import {fetchHeader, fetchCards, fetchFooter} from "./loaderTemplates";


async function fetchData(file_location, num_data){
    const data = await fetch(file_location)
        .then(response => response.json());
    return data.splice(0, num_data);
}


async function loadIndexData() {
    var tournamentContainer = document.querySelector(".tournament-cards");
    var matchesContainer = document.querySelector(".matches-cards");

    var tournamentsData = await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', 10)
    var matchesData = await fetchData('../../resources/mocks/MOCK_MATCHES.json', 10)

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

function setCardProperties(template, data) {
    let templateContainer = template.createElement("div");
    const img = template.getElementById("image");
    const title = template.getElementById("title");
    const description = template.getElementById("description");

    img.src = data.image;
    title.textContent = data.name;
    description.textContent = data.description;
    templateContainer.innerHTML = template.body.innerHTML;

    return templateContainer;
}

function textToHTML(text){
    var parser = new DOMParser();
    return parser.parseFromString(text, 'text/html');
}


async function loadIndexPage(){
    await fetchHeader();
    await loadIndexData();
    await fetchFooter();
}
