import utilities from "./utilities.js";
const inputValue = 4, minValue = 1, maxValue = 15, colors = ["#000", "#fff", "#0FF", "#0F0", "#F00", "#F0F", "#00F"];
let colorBoard = undefined, sectionBoard = undefined, playBoard = undefined;

export function createPlayground() {
    const modalContent = document.querySelector('.modalContent')
    modalContent.classList.add('ColorTiles');
    const sizes = utilities.createElement(modalContent, "div", ["sizes"])
    const label = utilities.createElement(sizes,"label",[],"Dimensions (lxL) (max. 15)")
    label.setAttribute("for","boxesInput")
    const horizontalInput = utilities.createElement(sizes, "input", ["colorInputValue"], "", "boxesInput")
    horizontalInput.type = "number"
    horizontalInput.defaultValue = inputValue
    horizontalInput.min = minValue
    horizontalInput.max = maxValue
    colorBoard = utilities.createElement(modalContent, "div", [], "", "colorBoard")
    sectionBoard = utilities.createElement(modalContent, "div", [], "", "sectionBoard")
    playBoard = utilities.createElement(sectionBoard, "div", [], "", "board")
    document.querySelectorAll(".colorInputValue").forEach(element => {
        element.addEventListener("change", (e) => {
            switch (true) {
                case (e.target.value > maxValue):
                    e.target.value = maxValue
                    break;
                case (e.target.value < minValue):
                    e.target.value = minValue
                    break;
                case (e.target.value.includes("<")):
                    e.target.value = minValue
                    break;
                default:
                    break;
            }
            const nb_box = document.querySelector('#boxesInput').value;
            if (nb_box > 0) {
                playBoard.replaceChildren('')
                colorBoard.replaceChildren('')
                createPlayBoard(nb_box)
            }
        })
    });

    const nb_box = document.querySelector('#boxesInput').value;
    if (nb_box > 0) {
        playBoard.replaceChildren('')
        colorBoard.replaceChildren('')
        createPlayBoard(nb_box)
    }
}

function changeColor(event) {
    let color = document.querySelectorAll(".colorFocused");
    color.forEach(function (elem) {
        if (event.target.style.backgroundColor != elem.style.backgroundColor) {
            event.target.style.backgroundColor = elem.style.backgroundColor;
        } else {
            event.target.style.backgroundColor = '#fff';
        }
    });
}

function createColorPad() {
    for (let i = 0; i < colors.length; i++) {
        let colorSelector = utilities.createElement(colorBoard, "button", ["color"], "", `color${i}`)
        colorSelector.style.backgroundColor = colors[i];
        colorSelector.addEventListener("click", buttonHighlight);
    }
}

function buttonHighlight(element) {
    let colorButton = document.querySelectorAll(".color");
    colorButton.forEach(function (elem) {
        elem.classList.remove("colorFocused");
    });
    element.target.classList.add("colorFocused")
}

function createPlayBoard(nbBox) {
    for (let i = 1; i <= nbBox; i++) {
        const boardRow = utilities.createElement(playBoard, "div", ["boardRow"])
        for (let j = 1; j <= nbBox; j++) {
            let colorDiv = utilities.createElement(boardRow, "div", ["colorDiv"], "");
            colorDiv.classList.add("colorDiv");
            colorDiv.textContent = '';
            colorDiv.style.backgroundColor = "#fff";
            colorDiv.style.width = `calc(100% / ${nbBox})`
            colorDiv.style.height = colorDiv.offsetWidth + "px"
            colorDiv.addEventListener("click", changeColor);
        }
    }
    createColorPad();
}