let firstElement = 0;
let borderSize = 2;
let ListCoordsElements = [];
let div_element = document.querySelectorAll('.div-element');

class CoordsElement {
    constructor(divElement){
       this.Element = divElement;
       let coords = this.Element.getBoundingClientRect();
       this.X = coords.left;
       this.Y = coords.top;
    }
}

function CreateCoordsElements(div_elements){
    div_elements.forEach((element) => {
        ListCoordsElements.push(new CoordsElement(element));
    })
}

let moveElement = document.querySelector('.div-move');

/**
 * @return {number}
 */
function GetCoordinateX(event) {
    return event.pageX - moveElement.offsetWidth / 2;
}

/**
 * @return {number}
 */
function GetCoordinateY(event) {
    return event.pageY - moveElement.offsetWidth / 2;
}

/**
 * @return {number}
 */
function GetWatToPoint(event , item) {
    return Math.sqrt((Math.pow(GetCoordinateX(event) - item.X, 2) + Math.pow(GetCoordinateY(event) - item.Y, 2)));
}

function SetPositionToMoveDiv(newRootElement) {
    newRootElement[firstElement].Element.appendChild(moveElement);
    moveElement.style.left = newRootElement[firstElement].X + borderSize + 'px';
    moveElement.style.top = newRootElement[firstElement].Y + borderSize + 'px';
}

moveElement.onmousedown = function (event) {
    event.preventDefault();
    moveAt(event);
    document.onmousemove = function (event) {
        moveAt(event);
    };

    moveElement.onmouseup = function() {
        document.onmousemove = null;
        moveElement.onmouseup = null;

        let newRootElement = ListCoordsElements.sort(CustomSortToPath);
        SetPositionToMoveDiv(newRootElement);
    };
};

function CustomSortToPath(first , second) {
    if(GetWatToPoint(event , first) > GetWatToPoint(event , second)){
        return 1;
    }
    if(GetWatToPoint(event , first) < GetWatToPoint(event , second)){
        return -1
    }
    return 0;
}

moveElement.ondragstart = function () {
    return false;
};

function moveAt(event) {
    moveElement.style.left = GetCoordinateX(event) + 'px';
    moveElement.style.top = GetCoordinateY(event) + 'px';
}

function Init() {
    CreateCoordsElements(div_element);
}

Init();
