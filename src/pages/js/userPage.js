import {fetchCards, fetchFooter, fetchHeader} from "./loaderTemplates.js";
import {fetchData, textToHTML} from "./utils.js";


const user = JSON.parse(localStorage.getItem("loggedUser"))

document.querySelectorAll(".sidebar-button").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        changePanelInfo(button);
    })

});

document.addEventListener("DOMContentLoaded", (e) => {
    changePanelInfo(document.querySelector("#my-data"));
});


function changePanelInfo(button){
    const panelName = document.getElementById("panel-name")
    const panelContent = document.getElementById("panel-content")


    let activeInfo = sessionStorage.getItem("active-info");

    if (activeInfo) {
        document.getElementById(activeInfo).style.display = "none";
    }

    let newActiveInfo = "";

    if (button.id === "my-data") {
        newActiveInfo = "user-info-panel";
    } else if (button.id === "my-teams") {
        newActiveInfo = "teams-panel";
    } else if (button.id === "my-statistics") {
        newActiveInfo = "stats-panel";
    } else if (button.id === "my-tournaments") {
        newActiveInfo = "tournaments-panel";

    } else if (button.id === "my-matches") {
        newActiveInfo = "matches-panel"; // Arreglado
    }

    document.getElementById(newActiveInfo).style.display = "block";
    sessionStorage.setItem("active-info", newActiveInfo);

    let btn = document.querySelector(".sidebar-button.active");
    console.log(btn)
    btn.classList.remove("active");
    button.classList.add("active");
}

function changeUserData(){
    let userPhoto = document.getElementById("user-picture");
    let userName = document.getElementById("username");
    userPhoto.src = user.avatar;
    userName.innerText = user.username;
}

function createLogoutModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'logoutModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-hidden', 'true');

    var modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');

    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    var modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    var modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Cerrar sesión';

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    var modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.textContent = '¿Estás seguro de que quieres cerrar sesión?';

    var modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');

    var cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.setAttribute('data-bs-dismiss', 'modal');
    cancelButton.textContent = 'Cancelar';

    var acceptButton = document.createElement('button');
    acceptButton.type = 'button';
    acceptButton.classList.add('btn', 'btn-danger');
    acceptButton.textContent = 'Aceptar';
    acceptButton.addEventListener('click', function () {
        localStorage.removeItem('loggedUser');
        window.location.href="index.html";
    });

    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(acceptButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);

    var modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

function changeUserPanelData(){
    let userNameField = document.getElementById("username-field");
    let emailField = document.getElementById("email-field");
    let passwordField = document.getElementById("password-field");
    userNameField.placeholder = user.username;
    emailField.placeholder = user.email;
    passwordField.value = user.password;

    userNameField.addEventListener("focus", function () {
        this.value = this.placeholder || user.username;
    });

    emailField.addEventListener("focus", function () {
        this.value = this.placeholder || user.email;
    });

    userNameField.addEventListener("blur", function () {
        this.placeholder = this.value;
        this.value = "";
    });

    emailField.addEventListener("blur", function () {
        this.placeholder = this.value;
        this.value = "";
    });
}

document.getElementById("log-out-button").addEventListener("click", function (){
    createLogoutModal();
})

if(user){
    changeUserData();
    changeUserPanelData()

}

function togglePasswordVisibility(toggleButtonId, passwordInputId) {

    const toggleButton = document.getElementById(toggleButtonId);
    const passwordInput = document.getElementById(passwordInputId);
    toggleButton.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            passwordInput.type = "password";
            toggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    });

}

async function loadCardsData() {
    var tournamentContainer = document.querySelector(".tournament-cards");
    var matchesContainer = document.querySelector(".matches-cards");

    var tournamentsData = await fetchData('../../resources/mocks/MOCK_TOURNAMENT.json', 10)
    var matchesData = await fetchData('../../resources/mocks/MOCK_MATCHES.json', 3)

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

function setCardProperties(template, data, type) {
    let templateContainer = template.createElement("div");
    const img = template.getElementById("image");
    const title = template.getElementById("title");
    const description = template.getElementById("description");
    const moreInfoBtn = template.getElementById("more-info-btn");
    moreInfoBtn.href = `matchInfoPage.html?type=${type}&id=${data.id}`;


    img.src = data.image;
    title.textContent = data.name;
    description.textContent = data.description;
    templateContainer.innerHTML = template.body.innerHTML;

    return templateContainer;
}

async function loadPage() {

    await fetchHeader();
    await fetchFooter();
    await loadCardsData();
    togglePasswordVisibility("togglePasswordVisibility", "password-field");
}

loadPage();
