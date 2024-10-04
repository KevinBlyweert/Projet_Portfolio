// import { experiences } from "../data/experiences.js";
// import { scolarship } from "../data/scolarship.js";
// import { skills } from "../data/skills.js";
// import { achievements } from "../data/achievements.js";
// import { RPS } from './rock-paper-scisors.js'
// import { createPlayground } from "./color_tiles.js";
// import { reactModal } from "./reactModal.js";
// import { vueModal } from "./vueModal.js";
// import utilities from "./utilities.js";

const app = {
    openPanel: (e) => {
        const panel = document.querySelector(`.panel.${e.target.dataset.id}`)
        panel.classList.add("active");
        panel.querySelector(".close").addEventListener("click", () => panel.classList.remove("active"))
    },
    init: () => {
        document.querySelectorAll(".grid button").forEach(button => button.addEventListener("click", app.openPanel));
    }
}

document.addEventListener("DOMContentLoaded", app.init)