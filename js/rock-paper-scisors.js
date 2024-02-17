const players = ['player','computer'];
const items = ['Paper','Rock','Scissors'];
let readyToPlay = true,scores,launchWord,playerScore,computerScore,computerChoices,computerChoice;

function getResult(player,computer){
    if (player === computer) return 0
    else if(player === 'Rock'){
        if(computer === 'Paper') return -1
        return 1
    }
    else if(player === 'Paper'){
        if(computer === 'Scissors') return -1
        return 1
    }
    else if(player === 'Scissors'){
        if(computer === 'Rock') return -1
        return 1
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkWinner() {
    computerChoice = getRandom(0,2);
    computerChoices[computerChoice].classList.add('selected')
    const pChoice = document.querySelector('.player .selected').dataset.name
    const cChoice = document.querySelector('.computer .selected').dataset.name
    return getResult(pChoice,cChoice);
}

function play(target) {
    readyToPlay = false
    let count = 1
    launchWord.classList.remove('hidden')
    const launch = setInterval(()=>{
        launchWord.textContent = items[count]
        count++
    },1000)
    setTimeout(()=>{
        clearInterval(launch)
        const result = checkWinner()
        switch (result) {
            case -1:
                launchWord.textContent = 'Perdu'
                computerScore++
                break;
            case 0:
                launchWord.textContent = 'Égalité'
                break;
            case 1:
                launchWord.textContent = 'Gagné'
                playerScore++
                break;
        }
        scores.textContent = `${playerScore} - ${computerScore}`
        scores.classList.remove('hidden')
        setTimeout(()=>{
            launchWord.classList.add('hidden')
            computerChoices[computerChoice].classList.remove('selected')
            target.classList.remove('selected')
            readyToPlay=true
            launchWord.textContent = items[0]
        },2000)
    },3000)
}
function createList(player) {
    const list = document.createElement('ul');
    document.querySelector('.modalContent').append(list);
    document.querySelector('.modalContent').classList.add('RPS');
    list.classList.add("RPSList");
    list.classList.add(player);
    items.forEach(item=>{
        const elts = document.createElement('li');
        list.append(elts)
        const img = new Image()
        // img.src=`/images/${item}.png`
        img.setAttribute('id',`${item}IMG`); 
        img.dataset.name = item
        elts.append(img)
        elts.addEventListener('click',(event)=>{
            if (event.target.closest('ul').classList[1] === 'player' && readyToPlay){
                document.querySelectorAll('.RPSList.player img').forEach(img=>img.classList.remove('selected'))
                event.target.classList.add('selected')
                play(event.target);
            }
        })
    })
    computerChoices = document.querySelectorAll('.computer img')
}

export function RPS (){
    playerScore=0;computerScore=0;
    launchWord = document.createElement('div')
    launchWord.textContent = items[0]
    launchWord.classList.add('launchword')
    launchWord.classList.add('hidden')
    document.querySelector('.modalContent').append(launchWord);
    scores = document.createElement('div')
    scores.textContent = ""
    scores.classList.add('scores')
    scores.classList.add('hidden')
    document.querySelector('.modalContent').append(scores);
    players.forEach(player=>{
        readyToPlay = true
        createList(player);
    })
}