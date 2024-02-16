export function createPlayground(){
    const modalContent = document.querySelector('.modalContent')
    modalContent.classList.add('ColorTiles');
    const sizes = document.createElement('div')
    sizes.classList.add('sizes')
    modalContent.append(sizes)
    const horiztontalDiv = document.createElement('div')
    sizes.append(horiztontalDiv)
    const verticalDiv = document.createElement('div')
    sizes.append(verticalDiv)

    // let playBoard = document.querySelector("#board");
    // let colorBoard = document.querySelector("#colorBoard");
    // document.querySelector('#generate_form').addEventListener('submit',(event)=>{
    // event.preventDefault();
    // const nb_box_w = document.querySelector('#nb_box_w').value;
    // const nb_box_h = document.querySelector('#nb_box_h').value;
    // if(nb_box_w > 0 && nb_box_h > 0){
    //     playBoard.replaceChildren('')
    //     colorBoard.replaceChildren('')
    //     createPlayBoard(nb_box_w,nb_box_h)}
    // });
}

// function changeColor(event){
//     let color = document.querySelectorAll(".colorFocused");
//     color.forEach(function(elem){
//     if (event.target.style.backgroundColor!=elem.style.backgroundColor){
//         event.target.style.backgroundColor=elem.style.backgroundColor;
//     }else{
//         event.target.style.backgroundColor='#fff';
//     }
//     });
// }

// function createColorPad(){
//     for (let i=0;i<colors.length;i++){
//         let colorSelector = document.createElement("button");
//         colorSelector.setAttribute("id",`color${i}`);
//         colorSelector.setAttribute("class","color");
//         colorSelector.textContent=`${colors[i]}`;
//         colorSelector.style.backgroundColor=colors[i];
//         colorBoard.append(colorSelector);
//         colorSelector.addEventListener("click",buttonHighlight);
//     }
// }

// function buttonHighlight(element){
//     let colorButton = document.querySelectorAll(".color");
//     colorButton.forEach(function(elem){
//         elem.classList.remove("colorFocused");
//     });
//     element.target.classList.add("colorFocused")
// }

// function createPlayBoard(nbBoxWidth,nbBoxHeight){
//     for (i=1;i<=nbBoxHeight;i++){
//         for (j=1;j<=nbBoxWidth;j++)
//             {let colorDiv = document.createElement("div");
//             colorDiv.classList.add("colorDiv");
//             colorDiv.textContent='';
//             colorDiv.style.backgroundColor="#fff";
//             colorDiv.style.width = `calc(100% / ${nbBoxWidth}`
//             colorDiv.style.height = `calc(100% / ${nbBoxHeight}`
//             playBoard.append(colorDiv);
//             colorDiv.addEventListener("click",changeColor);
//         }
//     }
//     createColorPad();
// }

// let playBoard = document.querySelector("#board");
// let colorBoard = document.querySelector("#colorBoard");
// document.querySelector('#generate_form').addEventListener('submit',(event)=>{
//     event.preventDefault();
//     const nb_box_w = document.querySelector('#nb_box_w').value;
//     const nb_box_h = document.querySelector('#nb_box_h').value;
//     if(nb_box_w > 0 && nb_box_h > 0){
//         playBoard.replaceChildren('')
//         colorBoard.replaceChildren('')
//         createPlayBoard(nb_box_w,nb_box_h)}
// });