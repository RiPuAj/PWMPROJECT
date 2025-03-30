import {fetchCards, fetchFooter, fetchHeader} from "./loaderTemplates.js";
import {fetchData, textToHTML} from "./utils.js";
import {setCardProperties} from "./cardsOperations.js";
/*
async function loadSeeAllPage(){
    const data = document.querySelector("#tournaments-container") != null ?
        await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', 25):
        await fetchData('../../resources/mocks/MOCK_MATCHES.json',  25);

    var container = document.querySelector(".all-cards-container");
    var cardTemplate = textToHTML(await fetchCards());

    data.forEach(element => {
        let templateContainer = setCardProperties(cardTemplate, element);
        container.appendChild(templateContainer);
    })
}*/

const loadData = async () => {
    const itemsPerPage = 25;
    let currentPage = 1;

    const data = document.querySelector("#tournaments-container") != null ?
        await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', null) :
        await fetchData('../../resources/mocks/MOCK_MATCHES.json', null);

    const totalPages = Math.ceil(data / itemsPerPage);

    const prevPageBtn = document.querySelector("#prevPage");
    const nextPageBtn = document.querySelector("#nextPage");
    const currentPageNumber = document.querySelector("#currentPageNumber");
    const container = document.querySelector(".all-cards-container");
    const cardTemplate = textToHTML(await fetchCards());

    const renderPage = () =>{
        container.innerHTML = "";
        currentPageNumber.innerText = currentPage;
        let start = (currentPage-1) * itemsPerPage;
        let end = currentPage * itemsPerPage;
        let dataPaginated = data.slice(start,end);
        let currentPagePath = window.location.pathname
        let type = null;
        if (currentPagePath.includes("allMatches.html")) {
            type = "matches";
        } else if (currentPagePath.includes("allTournaments.html")) {
            type = "tournament";
        }

        dataPaginated.forEach(element => {
            let templateContainer = setCardProperties(cardTemplate, element, type);
            container.appendChild(templateContainer);
        })

        prevPageBtn.className = currentPage === 1 ? "page-item disabled" : "page-item";
        nextPageBtn.disabled = currentPage === totalPages ? "page-item disabled" : "page-item";

    }

    prevPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(currentPage > 1){
            currentPage--;
            renderPage();
        }
    });

    nextPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(currentPage < totalPages){
            currentPage++;
            renderPage();
        }
    })


    renderPage();

}

document.addEventListener("DOMContentLoaded", async () => {
    await loadData();
    await fetchHeader();
    await fetchFooter();
})