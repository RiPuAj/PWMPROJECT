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
        if(currentPage < itemsPerPage){
            currentPage++;
            renderPage();
        }
    })


    renderPage();

}
/*
document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 5; // Cantidad de elementos por página
    let currentPage = 1;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const itemList = document.getElementById("itemList");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageNumber = document.getElementById("pageNumber");

    function renderItems() {
        itemList.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = items.slice(start, end);

        paginatedItems.forEach(item => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = item;
            itemList.appendChild(li);
        });

        pageNumber.textContent = currentPage;

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    prevPageBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderItems();
        }
    });

    nextPageBtn.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderItems();
        }
    });

    renderItems(); // Renderiza la primera página al cargar
});*/

document.addEventListener("DOMContentLoaded", async () => {
    await loadData();
    await fetchHeader();
    await fetchFooter();
})