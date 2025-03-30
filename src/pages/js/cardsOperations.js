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

export function setTeamCardProperties(template, data) {
    let templateContainer = template.createElement("div");
    const img = template.getElementById("image");
    const teamName = template.getElementById("team-name");


    img.src = data.image;
    teamName.textContent = data.name;
    templateContainer.innerHTML = template.body.innerHTML;

    return templateContainer;
}

export function setCardInfoProperties(data, type) {
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
    console.log(data)

    img.src = data.image;
    date.innerHTML = "<strong>Fecha: </strong>" + data.date;
    place.innerHTML = "<strong>Lugar: </strong>" + data.place;
    description.textContent = data.description;
    entryTax.innerHTML = "<strong>Tasa de Ingreso: </strong>" + data.entry_tax;
    prizePool.innerHTML = "<strong>Premio: </strong>" + data.prize_pool;
    organizer.innerHTML = "<strong>Organizador: </strong>" + data.organizer;

    if(type === "matches"){
        numPlayers.innerHTML = "<strong>Jugadores: </strong>" + data.participants.length + "/" + data.participants_num;
        hour.innerHTML = "<strong>Hora: </strong>" + data.hour;
    } else {
        hour.innerHTML = "";
        numPlayers.innerHTML = "<strong>N° de Equipos: </strong>" + data.participants.length + "/" + data.teams_num;

    }
}
