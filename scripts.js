/* 
    Creating an Etch-A-Sketch using a 16x16 grid.  
*/

// Sizing the interface
const GRID = 500;
let uiGrid = GRID + GRID*0.4;

// Sizing the pixel density
let userSize = 16; // input from the user
let gridSize = userSize*userSize; // input times itself
let gridItem = GRID/userSize; // how wide each item should be

// Applying the sizes to the UI
const CONTAINER = document.querySelector('#container');
const UI = document.querySelector('#etch-a-sketch');
CONTAINER.setAttribute('style', `height: ${GRID}px; width: ${GRID}px`);
UI.setAttribute('style', `height: ${uiGrid + 70}px; width: ${uiGrid + 20}px`);


// Creating the grid items
function createGrid(){
    // clears the container of all DIVS
    killChildren(CONTAINER); 

    // populates the container with as many DIVS as specified with userSize
    birthChildren(CONTAINER); 
}

// Setting the desired grid item size
function setGrid(){
    let answer = prompt('To shake the Etch A Sketch, enter a grid amount:', 16);
    console.log(answer)
    if (isNaN(answer)){
        alert('Please enter a number');
        setGrid();
    } else if (answer > 100){
        alert('Please try again with a number no greater than 100.');
    } else if (answer < 1){
        alert('Please enter at least 1 and click OK (or press enter).');
    }else {
        // Since the user provided a valid amount, we will adjust everything
        userSize = answer;
        gridSize = userSize*userSize; // the total for the grid
        let tempSize = GRID/userSize;
        gridItem = Math.floor(tempSize * 100) / 100; // rounding down so it all fits

        // once it is all done, we can apply it
        createGrid();
    }
}

// shake the div 
function shakeDiv(id){
    // Applies a CSS shake animation.  This needs to be removed before resetting.
    let div = document.getElementById(id);
    div.classList.add('shakeDiv');
}

// remove nodes
function killChildren(parent){
    // loops through the parent and removes all the child divs
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

// add nodes
function birthChildren(parent){
    // loops until we reach the desired grid amount and creates new grid divs
    for (i = 0; i < gridSize; i++){
        let nodeName = "div"+i;
        nodeName = document.createElement('div');
        nodeName.setAttribute("style", `width: ${gridItem}px; height: ${gridItem}px`);
        parent.appendChild(nodeName);
    }
    // applies the etch a sketch effect
    setHoverBg(CONTAINER);

    // shakes the etch a sketch
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

// listen for a click in order to offer the user to clear/reset the grid
document.addEventListener('click', ()=>{
    document.getElementById('etch-a-sketch').classList.remove('shakeDiv');
    setGrid();
});

createGrid(CONTAINER);
setHoverBg(CONTAINER);