import utilities from "./utilities.js";

export function vueModal(parentClass) {
    const modalContent = document.querySelector('.' + parentClass)
    modalContent.classList.add('VueJS');
    const intro = utilities.createElement(modalContent, "div", ["intro"])
    utilities.createElement(intro, "div", [], "My VueJS Pokédex", "introTitle")
    utilities.createElement(intro, "div", [], "Petit projet personnel pour m'exercer sous VueJS 3, avec fetch sur l'API officielle.", "introText")
    const img_front = new Image()
    img_front.src = `./data/images/vuejs_pokedex.png`
    img_front.setAttribute('alt', `Pokedex made on VueJS image.`);
    modalContent.append(img_front)
}