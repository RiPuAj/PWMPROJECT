export function setCardProperties(template, data) {
    let templateContainer = template.createElement("div");
    const img = template.getElementById("image");
    const title = template.getElementById("title");
    const description = template.getElementById("description");
    const moreInfoBtn = template.getElementById("moreInfo");

    img.src = data.image;
    title.textContent = data.name;
    description.textContent = data.description;
    templateContainer.innerHTML = template.body.innerHTML;

    return templateContainer;
}
