const listElement = document.querySelectorAll('.list-element');

const app = {
    openList:(element)=>{
        element.classList.add('list-element_active');
    },
    closeList:(element)=>{
        element.classList.remove('list-element_active');
    },
    fillExperiencesContent:()=>{
        const contentXP = document.querySelector('.content-XP');
        experiences.forEach((object)=>{
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
    fillFormationContent:()=>{
        const contentXP = document.querySelector('.content-formation');
        scolarship.forEach((object)=>{
            const block = document.createElement('div')
            contentXP.prepend(block)
            const when = document.createElement('p');
            when.textContent = `Quand? ${object['start']}`;
            when.textContent += object['end']?` - ${object['end']}`:'';
            block.appendChild(when);
            const what = document.createElement('p');
            what.textContent = `Quoi? ${object['label']}`;
            block.appendChild(what);
            const where = document.createElement('p');
            where.textContent = `Où? ${object['location']}`;
            block.appendChild(where);
        });
    },
    fillSkillsContent:()=>{
        const contentSkills = document.querySelector('.content-skills');
        skills.forEach((object)=>{
            for(key of Object.keys(object)){
            const block = document.createElement('div')
            contentSkills.appendChild(block)
            const title = document.createElement('p');
            title.textContent = key;
            title.style.textTransform = 'uppercase'
            title.style.textDecoration = 'underline'
            block.appendChild(title);
            const skillsDetail = document.createElement('div');
            for (i=0;i<object[key].length;i++){
                skillsDetail.textContent += object[key][i];
                if(i<object[key].length-1){skillsDetail.textContent += ', ';}
            }
            block.appendChild(skillsDetail)
            }
            
        });
    },
    fillRealisationsContent:()=>{
        const contentAchievements = document.querySelector('#content-achievements');
        for(i = 0; i < 5; i++){
        const achievements = document.createElement('div');
        achievements.classList.add('achievements');
        contentAchievements.append(achievements)
        }
    },
    fillContactContent:()=>{

    },
    showTime:()=>{
        const time = document.querySelector('#time');
        setInterval(()=>{
            const date = new Date();
            const day = `${date.getDate()<10?'0':''}${date.getDate()}`
            const month = `${date.getMonth()+1<10?'0':''}${date.getMonth()+1}`
            time.textContent = `Aujourd'hui, nous sommes le ${day}/${month}/${date.getFullYear()} et il est ${date.getHours()}h${date.getMinutes()}:${date.getSeconds()}'`;
        },1000)
    },
    init:()=>{
        listElement.forEach(element => {
            element.addEventListener('click',(e)=>{
                if(e.target.closest('.list-element').classList.contains('list-element_active') && e.target.localName != 'div'){
                    app.closeList(e.target.closest('.list-element'))
                }else{
                    listElement.forEach((element)=>{app.closeList(element)});
                    app.openList(e.target.closest('.list-element'))
                }
            })
        });
        app.fillExperiencesContent();
        app.fillFormationContent();
        app.fillSkillsContent();
        app.fillRealisationsContent();
        app.fillContactContent();
        app.showTime();
    }
}

window.addEventListener('DOMContentLoaded',app.init);