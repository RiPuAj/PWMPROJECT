export async function fetchHeader(){
    const header = document.querySelector("#main_header");
    console.log(header);
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
