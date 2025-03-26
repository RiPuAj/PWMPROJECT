export function setCardProperties(template, data, type) {
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

export function setCardMatchInfoProperties(data) {
    let templateContainer = document.createElement("div");
    const img = document.getElementById("image");
    const date = document.getElementById("date");
    const hour = document.getElementById("hour");
    const place = document.getElementById("place");
    const numPlayers = document.getElementById("num-players");
    const description = document.getElementById("description");
    const entryTax = document.getElementById("entry-tax");
    const prizePool = document.getElementById("prize-pool");
    const organizer = document.getElementById("organizer");

    img.src = data.image;
    date.innerHTML = "<strong>Fecha: </strong>" + data.date;
    hour.innerHTML = "<strong>Hora: </strong>" + data.hour;
    place.innerHTML = "<strong>Lugar: </strong>" + data.place;
    numPlayers.innerHTML = "<strong>Jugadores: </strong>" + data.participants.length + "/" + data.participants_num;
    description.textContent = data.description;
    entryTax.innerHTML = "<strong>Tasa de Ingreso: </strong>" + data.entry_tax;
    prizePool.innerHTML = "<strong>Premio: </strong>" + data.prize_pool;
    organizer.innerHTML = "<strong>Organizador: </strong>" + data.organizer;
}
