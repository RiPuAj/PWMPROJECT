import {fetchCards, fetchFooter, fetchHeader} from "./loaderTemplates.js";

document.addEventListener("DOMContentLoaded",  async function () {
    await fetchHeader();
    await fetchFooter();
})