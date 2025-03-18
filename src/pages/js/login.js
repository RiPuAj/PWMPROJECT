import {fetchHeader, fetchFooter} from "./loaderTemplates.js";
import {fetchData} from "./utils.js";


document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = await fetchData("../../resources/mocks/MOCK_USERS.json")
        .then(data => data.json())
        .then((data) => {
            data.find(user => user.email === email && user.password === password)

        });

    console.log(user);
    if (user) {
        console.log("El usuario existe");
    }
})

async function loadPage() {
    await fetchHeader();
    await fetchFooter();
}

function login(username, password) {

}

loadPage();