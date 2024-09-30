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
    openModal: (event) => {
        document.querySelector('.modal').classList.remove('hidden')
        document.querySelector('.overlay').classList.remove('hidden')
        document.querySelector('.modalTitle').textContent = event.target.dataset.name;
        console.log(event.target.dataset.name)
        switch (event.target.dataset.name) {
            case "Color tiles":
                createPlayground();
                break;
            case "Rock Paper Scissors":
                RPS()
                break;
            case "React":
                reactModal()
                break;
            case "VueJS":
                vueModal()
                break;
        }
    },
    closeModal: () => {
        document.querySelector('.modal').classList.add('hidden')
        document.querySelector('.overlay').classList.add('hidden')
        document.querySelector('.modalContent').replaceChildren();
        document.querySelector('.modalContent').className = "modalContent";
    },
    dragElement: (elmnt) => {
        var axis = document.getElementById("axis"), pos2 = 0, pos4 = 0;
        var iClickOffsetY = 0;
        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchstart = function (e) {
            iClickOffsetY = e.targetTouches[0].pageY - pos2;
        };
        elmnt.ontouchmove = function (e) {
            e.preventDefault();
            var curY = e.targetTouches[0].pageY - iClickOffsetY;

            var o = e.targetTouches[0].target;
            o.style.top = curY + 'px';
            if (document.getElementById("backpack").offsetTop >= (axis.offsetTop - 10) && document.getElementById("backpack").offsetTop <= (axis.offsetTop + axis.offsetHeight)) { o.style.top = (document.getElementById("backpack").offsetTop - pos2) + "px"; }
            if (document.getElementById("backpack").offsetTop < (axis.offsetTop - 10)) { o.style.top = (axis.offsetTop - 9) + "px"; }
            if (document.getElementById("backpack").offsetTop > (axis.offsetTop + (axis.offsetHeight - 48))) { o.style.top = (axis.offsetTop + (axis.offsetHeight - 48)) + "px"; }
            showXpBlock()
        };
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos2 = pos4 - e.clientY;
            pos4 = e.clientY;
            // set the element's new position:
            if (document.getElementById("backpack").offsetTop >= (axis.offsetTop - 10) && document.getElementById("backpack").offsetTop <= (axis.offsetTop + axis.offsetHeight)) { elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; }
            if (document.getElementById("backpack").offsetTop < (axis.offsetTop - 10)) { elmnt.style.top = (axis.offsetTop - 9) + "px"; }
            if (document.getElementById("backpack").offsetTop > (axis.offsetTop + (axis.offsetHeight - 48))) { elmnt.style.top = (axis.offsetTop + (axis.offsetHeight - 48)) + "px"; }
            showXpBlock();
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }

        function showXpBlock() {
            const xpBlocks = document.querySelectorAll(".xpBlock");
            let elementToAppear = 0, elementToDisappear = 4, size = "s", sizeToRemove = "";
            const level = (elmnt.offsetTop * 100) / axis.offsetHeight
            switch (true) {
                case (Math.floor(level) >= 90):
                    document.querySelector(".finalBlock").classList.remove("hidden")
                    size = "xl"
                    break;
                case (Math.floor(level) >= 60):
                    document.querySelector(".finalBlock").classList.add("hidden")
                    elementToAppear = 3;
                    size = "xl"
                    break;
                case (Math.floor(level) >= 40):
                    elementToAppear = 2;
                    elementToDisappear = 3;
                    size = "l"
                    sizeToRemove = "xl"
                    break;
                case (Math.floor(level) >= 20):
                    elementToAppear = 1;
                    elementToDisappear = 2;
                    size = "m"
                    sizeToRemove = "l"
                    break;
                case (Math.floor(level) >= 1):
                default:
                    elementToAppear = 0;
                    elementToDisappear = 1;
                    size = "s"
                    sizeToRemove = "m"
                    break;
            }
            xpBlocks[elementToAppear].classList.remove("hidden")
            xpBlocks[elementToDisappear] && xpBlocks[elementToDisappear].classList.add("hidden")
            document.querySelector("#backpack").src = `./data/images/backpack_${size}.png`
            document.querySelector("#backpack").classList.add(size)
            sizeToRemove && document.querySelector("#backpack").classList.remove(sizeToRemove)
        }
    },
    getRandomInt: (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        // The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    },
    fillExperiencesContent: () => {
        const contentXP = document.querySelector('#content-XP');
        experiences.forEach((object) => {
            const xpBlock = document.createElement('div');
            xpBlock.classList.add("xpBlock", "hidden");
            contentXP.append(xpBlock)
            const blockTitle = document.createElement('div')
            blockTitle.textContent = `${object['label']} (${object['start']})`;
            blockTitle.classList.add("xpTitle");
            xpBlock.append(blockTitle)
            const buttonDetail = document.createElement("i");
            buttonDetail.classList.add("fa-regular", "fa-circle-question");
            blockTitle.append(buttonDetail)
            const block = document.createElement('div')
            block.classList.add("xpDetail", "hidden");
            const when = document.createElement('p');
            when.textContent = `Quand? ${object['start']} - ${object['end']}`;
            block.appendChild(when);
            const what = document.createElement('p');
            what.textContent = `Quoi? ${object['label']}`;
            block.appendChild(what);
            const where = document.createElement('p');
            where.textContent = `Où? ${object['location']}`;
            block.appendChild(where);
            const detail = document.createElement('p');
            detail.textContent = `Pourquoi? ${object['detail']}`;
            block.appendChild(detail);
            blockTitle.append(block)
            buttonDetail.addEventListener("mouseenter", () => {
                block.classList.toggle("hidden");
            })
            buttonDetail.addEventListener("mouseleave", () => {
                block.classList.toggle("hidden");
            })
        });
        utilities.createElement(contentXP, "div", ["finalBlock", "hidden"], "Votre entreprise?")
    },
    fillFormationContent: () => {
        const contentXP = document.querySelector('#content-formation');
        scolarship.forEach((object) => {
            const block = document.createElement('div')
            block.classList.add("scolarBlock")
            contentXP.prepend(block)
            const leftBlock = utilities.createElement(block, "div", ["leftBlock"])
            const rightBlock = utilities.createElement(block, "div", ["rightBlock"])
            utilities.createElement(leftBlock, "p", undefined, "Quand ?")
            utilities.createElement(rightBlock, "p", undefined, `${object['start']} ${object['end'] ? "-" + object['end'] : ""}`)
            utilities.createElement(leftBlock, "p", undefined, "Quoi ?")
            utilities.createElement(rightBlock, "p", undefined, object['label'])
            utilities.createElement(leftBlock, "p", undefined, "Où ?")
            utilities.createElement(rightBlock, "p", undefined, object['location'])

        });
    },
    fillSkillsContent: () => {
        const contentSkills = document.querySelector('#content-skills');
        skills.forEach((object) => {
            for (let key of Object.keys(object)) {
                const block = utilities.createElement(contentSkills, "div", ["skillBlock"], key);
                document.createElement('div');
                block.style.textTransform = 'uppercase'
                block.style.fontWeight = 'bold'
                const title = utilities.createElement(block, "div", ["skillCloud"], "", key)
                const skillList = utilities.createElement(title, "ul", ["skillList"], "", key + "List")
                for (let i = 0; i < object[key].length; i++) {
                    const skill = utilities.createElement(skillList, "li", ["skill"], object[key][i])
                    skill.style = "--size:"+app.getRandomInt(1,6)+";"
                }
            }

        });
    },
    fillRealisationsContent: () => {
        const contentAchievements = document.querySelector('#content-achievements');
        for (let i = 0; i < achievements.length; i++) {
            const achievements_block = document.createElement('div');
            achievements_block.classList.add('achievements', achievements[i].replaceAll(" ", ""));
            achievements_block.textContent = achievements[i];
            achievements_block.dataset.name = achievements[i];
            contentAchievements.append(achievements_block)
            const bg = utilities.createElement(achievements_block,"div",["backgroundImage"])
            bg.dataset.name = achievements[i];
            achievements_block.addEventListener("click", (event) => { app.openModal(event) })
        }
    },
    fillContactContent: () => {
        const contentContact = document.querySelector('#content-contact');
        const logoDiv = utilities.createElement(contentContact,"div",["contact_logos"])
        const linkedInLogoLink = utilities.createElement(logoDiv,"a")
        linkedInLogoLink.setAttribute("href","https://linkedin.com/in/kevin-blyweert")
        linkedInLogoLink.setAttribute("target","_blank")
        const linkedInLogo = new Image()
        linkedInLogo.src = "./data/images/linkedin_logo.png"
        linkedInLogoLink.appendChild(linkedInLogo)
        const gitHubLogoLink = utilities.createElement(logoDiv,"a")
        gitHubLogoLink.setAttribute("href","https://github.com/KevinBlyweert")
        gitHubLogoLink.setAttribute("target","_blank")
        const gitHubLogo = new Image()
        gitHubLogo.src = "./data/images/github_logo.png"
        gitHubLogoLink.appendChild(gitHubLogo)
    },
    showTime: () => {
        const time = document.querySelector('#time');
        setInterval(() => {
            const date = new Date();
            const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
            const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`
            const hours = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`
            const minutes = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
            const seconds = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`
            time.querySelector('#date').textContent = `${day}/${month}/${date.getFullYear()}`;
            time.querySelector('#hour').textContent = `${hours}h${minutes}:${seconds}'`;
        }, 1000)
    },
    inView: (elt) => {
        const { top } = elt.getBoundingClientRect();
        const { offsetTop, offsetHeight } = elt.closest('main');
        return (top > offsetTop && top < offsetTop + (offsetHeight - 50))
    },
    init: () => {
        app.showTime();
        app.dragElement(document.getElementById('backpack'));
        app.fillExperiencesContent();
        app.fillFormationContent();
        app.fillSkillsContent();
        app.fillRealisationsContent();
        app.fillContactContent();
        document.querySelector('.buttonClose').addEventListener('click', app.closeModal)
        document.querySelector('.overlay').addEventListener('click', app.closeModal)
        document.querySelector('ul').addEventListener("scroll", (event) => {
            document.querySelectorAll('.list-element').forEach((e) => {
                app.inView(e) ? document.querySelector(`nav a[href="#${e.id}"]`).classList.add('selected') : document.querySelector(`nav a[href="#${e.id}"]`).classList.remove("selected");
            })
        })
    }
}

window.addEventListener('DOMContentLoaded', app.init);