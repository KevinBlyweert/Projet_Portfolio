import utilities from "./utilities.js";

export function reactModal() {
    const modalContent = document.querySelector('.modalContent')
    modalContent.classList.add('React');
    const intro = utilities.createElement(modalContent, "div", ["intro"])
    const introLinkDiv = utilities.createElement(intro, "div", [], "", "introLink")
    const introLinkAnchor = utilities.createElement(introLink, "a", [], "Projet8Bits", "linkProject")
    introLinkAnchor.setAttribute("href", 'https://projet-8bits.vercel.app/')
    introLinkAnchor.setAttribute("target", '_blank')
    utilities.createElement(intro, "div", [], "Il s'agit de notre projet de fin de formation, front-end réalisé avec React, et back-end sous NodeJS", "introText")
    const img_front = new Image()
    img_front.src = `/images/8bits_front.png`
    img_front.setAttribute('alt', `8bits Front end image.`);
    modalContent.append(img_front)
    const img_back = new Image()
    img_back.src = `/images/8bits_API.png`
    img_back.setAttribute('alt', `8bits API image.`);
    modalContent.append(img_back)
}