
const container = document.querySelector("#container");
const resize = document.querySelector("#resize");
const singleColor = document.querySelector("#single");
const randomColor = document.querySelector("#random");
const gradientColor = document.querySelector("#gradient");
const eraseColor = document.querySelector("#erase");
const clear = document.querySelector("#clear");

const defaultNumberOfCells = 16;
let colorScheme = 'single';

resize.addEventListener('click', getNewSize);
singleColor.addEventListener('click', setColorScheme);
randomColor.addEventListener('click', setColorScheme);
gradientColor.addEventListener('click', setColorScheme);
eraseColor.addEventListener('click', setColorScheme);
clear.addEventListener('click', clearGrid);

makeGrid(defaultNumberOfCells);

function makeGrid(newSize) {
    container.style.setProperty('--grid-rows', newSize);
    container.style.setProperty('--grid-columns', newSize);
    for (i = 0; i < (newSize*(newSize)); i++) {
        const div = document.createElement("div");
        container.appendChild(div).className = "grid-item";
    };
    const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(function(gridItem) {
            gridItem.addEventListener('mouseover', changeColor);
        });
};

function getNewSize() {
    let newSize = prompt("Please, enter how many squares per side do you want (from 1 to 64) to make a new grid");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    makeGrid(newSize);
};

function setColorScheme(e) {
    colorScheme = e.target.id;
}

function changeColor(e){
    if (colorScheme == 'single') {
        e.target.style.backgroundColor = 'black';
    } else if (colorScheme == 'random') {
        e.target.style.backgroundColor = ("#" + (Math.floor(Math.random()*16777215).toString(16)));
    } else if (colorScheme == 'gradient') {
        let opacity = Number(e.target.style.opacity);
        e.target.style.opacity = opacity += 0.1;
        e.target.style.backgroundColor = '#000';
        e.target.style.transition = 'background-color 0.25s';
    } else if (colorScheme == 'erase') {
        e.target.style.backgroundColor = 'white';
    }
}

function clearGrid() {
    for (i = 0; i < container.children.length; i++) {
        container.children[i].style.backgroundColor = "white";
      }
}
