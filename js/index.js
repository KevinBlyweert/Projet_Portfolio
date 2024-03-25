import { experiences } from "../data/experiences.js";
import { scolarship } from "../data/scolarship.js";
import { skills } from "../data/skills.js";
import { achievements } from "../data/achievements.js";
import { RPS } from './rock-paper-scisors.js'
import { createPlayground } from "./color_tiles.js";

const app = {
    openModal: (event) => {
        document.querySelector('.modal').classList.remove('hidden')
        document.querySelector('.overlay').classList.remove('hidden')
        document.querySelector('.modalTitle').textContent = event.target.dataset.name;
        switch (event.target.dataset.name) {
            case "Color tiles":
                createPlayground();
                break;
            case "Rock Paper Scissors":
                RPS()
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
            let elementToAppear = 0, imgSrc = "./images/backpack_s.png";
            const level = (elmnt.offsetTop * 100) / axis.offsetHeight
            switch (true) {
                case (Math.floor(level) > 90):
                    document.querySelector(".finalBlock").classList.remove("hidden")
                    imgSrc = "./images/backpack_xl.png"
                    break;
                case (Math.floor(level) > 60):
                    elementToAppear = 3;
                    imgSrc = "./images/backpack_xl.png"
                    break;
                case (Math.floor(level) > 40):
                    elementToAppear = 2;
                    imgSrc = "./images/backpack_l.png"
                    break;
                case (Math.floor(level) > 20):
                    elementToAppear = 1;
                    imgSrc = "./images/backpack_m.png"
                    break;
                case (Math.floor(level) > 0):
                    elementToAppear = 0;
                    imgSrc = "./images/backpack_s.png"
                    break;
                default:
                    break;
            }
            xpBlocks[elementToAppear].classList.remove("hidden")
            document.querySelector("#backpack").src = imgSrc
        }
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
        const finalBlock = document.createElement("div");
        finalBlock.textContent = "Votre entreprise ?"
        finalBlock.classList.add("finalBlock", "hidden")
        contentXP.append(finalBlock)
    },
    fillFormationContent: () => {
        const contentXP = document.querySelector('#content-formation');
        scolarship.forEach((object) => {
            const block = document.createElement('div')
            contentXP.prepend(block)
            const when = document.createElement('p');
            when.textContent = `Quand? ${object['start']}`;
            when.textContent += object['end'] ? ` - ${object['end']}` : '';
            block.appendChild(when);
            const what = document.createElement('p');
            what.textContent = `Quoi? ${object['label']}`;
            block.appendChild(what);
            const where = document.createElement('p');
            where.textContent = `Où? ${object['location']}`;
            block.appendChild(where);
        });
    },
    fillSkillsContent: () => {
        const contentSkills = document.querySelector('#content-skills');
        skills.forEach((object) => {
            for (let key of Object.keys(object)) {
                const block = document.createElement('div')
                contentSkills.appendChild(block)
                const title = document.createElement('div');
                title.textContent = key;
                title.style.textTransform = 'uppercase'
                title.style.textDecoration = 'underline'
                block.appendChild(title);
                const skillsDetail = document.createElement('p');
                // for (let i=0;i<object[key].length;i++){
                //     skillsDetail.textContent += object[key][i];
                //     if(i<object[key].length-1){skillsDetail.textContent += ', ';}
                // }
                block.appendChild(skillsDetail)
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
            achievements_block.addEventListener("click", (event) => { app.openModal(event) })
        }
    },
    fillContactContent: () => {

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
        // app.fillFormationContent();
        // app.fillSkillsContent();
        // app.fillRealisationsContent();
        // app.fillContactContent();
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