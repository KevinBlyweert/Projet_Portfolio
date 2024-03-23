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
    fillExperiencesContent: () => {
        const contentXP = document.querySelector('#content-XP');
        experiences.forEach((object) => {
            const block = document.createElement('div')
            contentXP.prepend(block)
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
        });
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
        // app.fillExperiencesContent();
        // app.fillFormationContent();
        // app.fillSkillsContent();
        // app.fillRealisationsContent();
        // app.fillContactContent();
        document.querySelector('.buttonClose').addEventListener('click', app.closeModal)
        document.querySelector('.overlay').addEventListener('click', app.closeModal)
        document.querySelector('ul').addEventListener("scroll", (event) => {
            document.querySelectorAll('.list-element').forEach((e) => {
                app.inView(e)?document.querySelector(`nav a[href="#${e.id}"]`).classList.add('selected'):document.querySelector(`nav a[href="#${e.id}"]`).classList.remove("selected");
            })
        })
    }
}

window.addEventListener('DOMContentLoaded', app.init);