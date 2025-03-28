import {fetchHeader, fetchFooter} from "./loaderTemplates.js";
import {fetchData} from "./utils.js";


document.getElementById("loginForm-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await loginForm(email, password);

})

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


async function loginForm(email, password) {

    const user = await fetchData("../../resources/mocks/MOCK_USERS.json", null)
        .then(data => data.find(user => user.email === email && user.password === password))

    console.log(user);
    const message = user === undefined
        ? "Email o contraseña incorrecto"
        : "Inicio completado correctamente.";


    createModal(user, message);

    if(user){
        localStorage.setItem("loggedUser", JSON.stringify(user));
    }
}

function createModal(user, message) {
    // Crear el contenedor del modal
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'loginModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    var modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');

    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    var modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    var modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.id = 'exampleModalLabel';
    modalTitle.textContent = 'Inicio de sesión';

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    var modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.textContent = message;

    var modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');

    var closeFooterButton = document.createElement('button');
    closeFooterButton.type = 'button';
    closeFooterButton.classList.add('btn', 'btn-secondary');
    closeFooterButton.setAttribute('data-bs-dismiss', 'modal');
    closeFooterButton.textContent = 'Close';

    modalFooter.appendChild(closeFooterButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);

    modal.appendChild(modalDialog);

    document.body.appendChild(modal);

    var modalInstance = new bootstrap.Modal(modal);
    modalInstance.show(); // Mostrar el modal

    if(user !== undefined) {
        modal.addEventListener('hidden.bs.modal', function () {
            window.location.href="index.html";
        })
    }
}

async function loadPage() {

    await fetchHeader();
    await fetchFooter();
    togglePasswordVisibility("togglePasswordVisibility", "password");
}

loadPage();
