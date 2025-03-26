import {fetchFooter, fetchHeader} from "./loaderTemplates.js";

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

    if (button.id === "my-data") {
        panelName.innerHTML = button.name;
    } else if (button.id === "my-teams") {
        panelContent.innerHTML = "<h1>ESTO SON MIS EQUIPOS</h1>"
    }else if (button.id === "my-statistics") {
        panelContent.innerHTML = "<h1>ESTO SON MIS ESTADISTICAS</h1>"
    } else if (button.id === "my-tournaments") {
        panelContent.innerHTML = "<h1>ESTO SON MIS TORNEOS</h1>"
    } else if (button.id === "my-matches") {
        panelContent.innerHTML = "<h1>ESTO SON MIS PARTIDOS</h1>"
    }

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

document.getElementById("log-out-button").addEventListener("click", function (){
    createLogoutModal();
})

if(user){changeUserData();}
fetchHeader();
fetchFooter();