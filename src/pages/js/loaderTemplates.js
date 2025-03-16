export async function fetchHeader() {
    const header = document.querySelector("#main_header");

    return await fetch('../../templates/html/navbar.html')
        .then(response => response.text())
        .then(data => header.innerHTML = data);
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

