import {fetchFooter, fetchHeader} from "./loaderTemplates.js";
import {fetchData} from "./utils.js ";

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        if (this.id !== "password" && this.id !== "repeatPassword"){
            if (this.checkValidity()) {
                this.style.border = "";
            } else if (this != document.getElementById("password")) {
                this.style.border = "solid 2px red";
            }
        }
    });
});
function addValidationRepPasswd(){

    document.getElementById("repeatPassword").addEventListener("input", function () {
        this.setCustomValidity("");
        if (!this.checkValidity()) {
            this.style.border = "solid 2px red";
        }
        else if (this.value !== document.getElementById("password").value) {
            this.setCustomValidity("Las contraseñas deben coincidir.");
            this.style.border = "solid 2px red";
        }
        else {
            this.setCustomValidity("");
            this.style.border = "";
        }
        this.reportValidity();
    });

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

function isValidPassword(password) {


    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
    console.log(regex.test(password))
    return regex.test(password);
}
function addValidationPasswd() {


    document.getElementById("password").addEventListener("input", function () {
        this.setCustomValidity("");
        if (!this.checkValidity()) {
            this.style.border = "solid 2px red";
        }
        else if (!isValidPassword(this.value)) {
            this.setCustomValidity("Asegúrate de que tu contraseña tiene al menos una mayúscula, una minúscula, un número y un carácter especial (!?@#$%^&*).");
            this.style.border = "solid 2px red";
        }
        else {
            this.setCustomValidity("");
            this.style.border = "";
        }
        this.reportValidity();
    });

}

document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await register(name, email, password);
})

async function register(name, email, password) {
    const usersData = await fetchData("../../resources/mocks/MOCK_USER.json", null).then(data => data.json());

    const newUser = {
        id: usersData.length + 1,
        name: name,
        email: email,
        password: password,
        avatar: "https://robohash.org/liberoeaplaceat.png?size=200x200&set=set1"
    }

    const existUser = usersData.find(element => {
        return email === element.email;
    })
    if(existUser) alert("El usuario con ese email ya existe");

    usersData.push(newUser);
}

async function loadPage() {

    await fetchHeader();
    await fetchFooter();
    togglePasswordVisibility("togglePassword", "password");
    togglePasswordVisibility("toggleRepeatPassword", "repeatPassword");
    addValidationRepPasswd()
    addValidationPasswd()
}

loadPage();