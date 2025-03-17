import {loadHeaderAndFooter} from "./loaderTemplates.js";

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

loadHeaderAndFooter();
togglePasswordVisibility("togglePassword", "password");
togglePasswordVisibility("toggleRepeatPassword", "repeatPassword");