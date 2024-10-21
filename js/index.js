// import { experiences } from "../data/experiences.js";
// import { scolarship } from "../data/scolarship.js";
import { skills } from "../data/skills.js";
import { achievements } from "../data/achievements.js";
import { RPS } from './rock-paper-scisors.js'
// import { createPlayground } from "./color_tiles.js";
// import { reactModal } from "./reactModal.js";
// import { vueModal } from "./vueModal.js";
import utilities from "./utilities.js";

const app = {
    openPanel: (e) => {
        const panel = document.querySelector(`.panel.${e.target.dataset.id}`)
        panel.classList.add("active");
        panel.querySelector(".close").addEventListener("click", () => panel.classList.remove("active"))
    },
    addHardskills: () => {
        const techContent = document.querySelector(".techs")
        skills.techs.forEach(tech => {
            const techItem = utilities.createElement(techContent, "li", ["techItem"])
            const imgWrapper = utilities.createElement(techItem, "div", ["imgWrapper"])
            const img = new Image()
            img.src = tech.pic
            img.alt = tech.name.split(" ")[0] + " logo"
            imgWrapper.appendChild(img)
            utilities.createElement(techItem, "p", [], tech.name)
        })
    },
    addSoftskills: () => {
        const skillsContent = document.querySelector(".softskills .skills")
        skills.softskills.forEach(skill => {
            const skillItem = utilities.createElement(skillsContent, "li", ["flex", "flexItem"]);
            utilities.createElement(skillItem, "p", [], skill.name);
            const barBg = utilities.createElement(skillItem, "div", ["barBg"])
            const barFill = utilities.createElement(barBg, "span", ["barFill"]);
            barFill.style = `--value:${skill.rating}`
            skill.rating == 10 && barFill.classList.add("max")
        })
    },
    addWorks: () => {
        const workContent = document.querySelector(".work .works")
        achievements.forEach(achievement => {
            const workItem = utilities.createElement(workContent, "li", ["flex", "workItem"]);
            const img = utilities.createElement(workItem, "img", []);
            img.src = `../data/images/${achievement.toLowerCase().replaceAll(" ", "_")}.png`
            utilities.createElement(workItem, "p", [], achievement)
            workItem.addEventListener("click", () => {
                const itemDetail = document.querySelector(".itemDetail")
                itemDetail.className = ""
                itemDetail.replaceChildren("");
                itemDetail.classList.add("itemDetail", "active", achievement.toLowerCase().replaceAll(" ", "_"))
                switch (achievement) {
                    case "React":
                        break;
                    case "VueJS":
                        break;
                    case "Rock Paper Scissors":
                        // RPS(".itemDetail")
                        break;
                    case "Planetarium":
                        break;
                    case "Tower Defense":
                        break;
                }
            })
        })

    },
    init: () => {
        document.querySelectorAll(".grid button").forEach(button => button.addEventListener("click", app.openPanel));
        app.addHardskills();
        app.addSoftskills();
        app.addWorks();
    }
}

document.addEventListener("DOMContentLoaded", app.init)