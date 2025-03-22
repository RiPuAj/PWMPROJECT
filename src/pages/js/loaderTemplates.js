export async function fetchHeader() {
    const header = document.querySelector("#main_header");

    return await fetch('../../templates/html/navbar.html')
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
            const user = JSON.parse(localStorage.getItem("loggedUser"))
            if(user){
                hideAuth();
                setUserMenu(user);
            }else{
                hideCreate();
            }
        });
}

function setUserMenu(user) {
    let username = document.getElementById("username");
    let userPhoto = document.getElementById("user-photo");

    username.innerText = user.username;
    userPhoto.src = user.avatar;
    //userPhoto.style.borderRadius = '50%';
    //userPhoto.style.width = '40px';
    //userPhoto.style.height = '40px';
}

function hideAuth() {
    let authButtons = document.getElementById("auth-buttons");
    authButtons.classList.add("d-none");
}

function hideCreate() {
    let createMenu = document.getElementById("create-menu");
    createMenu.classList.add("d-none");

}

export async function fetchFooter(){
    const footer = document.querySelector("#main_footer");

    return await fetch('../../templates/html/footer.html')
        .then(response => response.text())
        .then(data => footer.innerHTML = data);
}

export async function fetchCards() {

    return await fetch('../../templates/html/card.html')
        .then(response => response.text());
}

export async function fetchMatch() {

    return await fetch('../../templates/html/match.html')
        .then(response => response.text());
}

export async function fetchUserPanel() {

    return await fetch('../../templates/html/userPanel.html')
        .then(response => response.text());
}

export async function fetchTeamCard() {

    return await fetch('../../templates/html/teamCard.html')
        .then(response => response.text());
}


