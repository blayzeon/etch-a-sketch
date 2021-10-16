/* 
    Creating an Etch-A-Sketch using a 16x16 grid.  
*/

// The main div that the Etch-A-Sketch will be put inside 
const GRID = 700;
let userSize = 16; // input from the user
let gridSize = userSize*userSize; // input times itself
let gridItem = GRID/userSize; // how wide each item should be
const CONTAINER = document.querySelector('#container');

CONTAINER.setAttribute('style', `height: ${GRID}px; width: ${GRID}px`);


// Creating the grid items
function createGrid(){
    killChildren(CONTAINER);
    birthChildren(CONTAINER);
}

// Setting the desired grid item size
function setGrid(){
    let answer = prompt('How large of a grid would you like?  Max: 100', 50);
    console.log(answer)
    if (isNaN(answer)){
        alert('Please enter a number');
        setGrid();
    } else if (answer > 100){
        alert('Please try again with a smaller number');
    } else if (answer < 5){
        alert('Please try again with a larger number');
    }else {
        userSize = answer;
        gridSize = userSize*userSize;
        let tempSize = GRID/userSize;
        gridItem = Math.floor(tempSize * 100) / 100; // for rounding
        createGrid();
    }
}

// shake the div 
function shakeDiv(id){
    let div = document.getElementById(id);
    div.classList.add('shakeDiv');
}

// remove nodes
function killChildren(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

// add nodes
function birthChildren(parent){
    for (i = 0; i < gridSize; i++){
        let nodeName = "div"+i;
        nodeName = document.createElement('div');
        nodeName.setAttribute("style", `width: ${gridItem}px; height: ${gridItem}px`);
        parent.appendChild(nodeName);
    }
    setHoverBg(CONTAINER);
    shakeDiv('etch-a-sketch');
}

// adds the etch a sketch functionality
function setHoverBg(container){
    // grabs all the divs inside of the container
    let divs = container.querySelectorAll('div');

    divs.forEach((div)=>{
        // applies css so that when there is a mouseover event, it will fill the space
        div.addEventListener('mouseover', (e)=>{
            div.classList.add('black');
        });
    });
}

// listen for the shake button
document.addEventListener('click', ()=>{
    document.getElementById('etch-a-sketch').classList.remove('shakeDiv');
    setGrid();
});

createGrid(CONTAINER);
setHoverBg(CONTAINER);