import { experiences } from "../data/experiences.js";
import { scolarship } from "../data/scolarship.js";
import { skills } from "../data/skills.js";
import { achievements } from "../data/achievements.js";
import { RPS } from './rock-paper-scisors.js'
import { createPlayground } from "./color_tiles.js";
import { reactModal } from "./reactModal.js";
import { vueModal } from "./vueModal.js";
import utilities from "./utilities.js";

const app = {

    toggleTheme: (event) => {
        document.body.classList.toggle("light");
        document.body.classList.toggle("dark");
    },
    init: () => {
        document.querySelector(".themeToggle").addEventListener("click", app.toggleTheme);
    }
}

document.addEventListener("DOMContentLoaded", app.init)