import {Box,Pose} from './utils/helpClasses';
import {tempArray,pickRandomNumber,copyBoard,boardToString} from './utils/helpFunctions';

let score = 0;
const zeroScore = () => {
    score = 0;
}
const isWinner = (matrix = []) => {
    return matrix.find((item) => item.value === 2048);
}
const isLoser = (matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].value === 0) {
                return false;
            }
            if (matrix[i][j].value !== 0) {
                let z = j + 1
                if (z < matrix[i].length && matrix[i][j].value === matrix[i][z].value) {
                    return false;
                }
                z = i + 1
                if (z < matrix.length && matrix[i][j].value === matrix[z][j].value) {
                    return false;
                }
            }
        }
    }
    return true;
}
// const boardIsChange = (oldBoard,newBoard)=>{
//     const oldBoardStr = boardToString(oldBoard);
//     const newBoard = boardToString(newBoard);
    
// }

const insertRandomNumber = (matrix = [], xMin, xMax, yMin, yMax) => {
    let options = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].value === 0) {
                options.push({ x: i, y: j })
            }
        }
    }
    options = options.filter((option) => {
        const xMatch = xMin <= option.x && xMax >= option.x
        const yMatch = yMin <= option.y && yMax >= option.y
        return xMatch && yMatch;
    })
    if (options.length === 0) {
        return matrix;
    }
    const randomNumber = pickRandomNumber(options.length);
    const value = pickRandomNumber(3) < 2 ? 2 : 4;
    const chosen = options[randomNumber];
    const copy = copyBoard(matrix);
    copy[chosen.x][chosen.y].value = value;
    copy[chosen.x][chosen.y].new = true;
    return copy;
}

const startGame = (size) => {
    const game = [];
    for (let y = 0; y < size; y++) {
        let row = []
        for (let x = 0; x < size; x++) {
            row.push(new Box(0));
        }
        game.push(row);
    }
    let pose1 = new Pose(pickRandomNumber(4), pickRandomNumber(4))
    let pose2 = new Pose(pickRandomNumber(4), pickRandomNumber(4))
    while (pose1.x === pose2.x && pose1.y === pose2.y) {
        pose1 = new Pose(pickRandomNumber(4), pickRandomNumber(4));
    }
    game[pose1.y][pose1.x].value = 2;
    game[pose2.y][pose2.x].value = 2;
    return game;
}

const arrange = (arr = []) => {
    const arr2 = tempArray(arr.length);
    for (let i = 0, j = 0; i < arr.length; i++) {
        if (arr[i].value !== 0) {
            arr2[j] = arr[i];
            j++;
        }
    }
    return arr2;
}
const merge = (arr = []) => {
    const copy = arr.slice(0);
    for (let i = 0, j = i + 1; j < copy.length; i++, j++) {
        if (copy[i].value !== 0) {
            if (copy[j].value === copy[i].value) {
                copy[i].value = copy[i].value * 2;
                score = score + copy[i].value;
                copy[i].merge = true;
                copy[j].value = 0;
            }
        }
    }
    return copy;
}

const doGameLogicOnArray = (arr = [], reverseDirection = false) => {
    //reverseDirection=true then is left and down if false then is righ and up
    let fixArray = reverseDirection ? arrange(arr.reverse()) : arrange(arr);
    fixArray = merge(fixArray);
    return reverseDirection ? arrange(fixArray).reverse() : arrange(fixArray);
}

const moveRight = (matrix = []) => {
    let copy = copyBoard(matrix);
    for (let i = 0; i < copy.length; i++) {
        copy[i] = doGameLogicOnArray(copy[i], true);
    }
    return copy;
}
const moveLeft = (matrix = []) => {
    const copy = copyBoard(matrix);
    for (let i = 0; i < copy.length; i++) {
        copy[i] = doGameLogicOnArray(copy[i]);
    }
    return copy;
}
const moveUp = (matrix = []) => {
    const copy = copyBoard(matrix);
    let column = [];
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length; j++) {
            column.push(copy[j][i]);
        }
        column = doGameLogicOnArray(column);
        for (let j = 0; j < column.length; j++) {
            copy[j][i] = column[j];
        }
        column = [];
    }
    return copy;
}
const moveDown = (matrix = []) => {
    const copy = copyBoard(matrix);
    let column = [];
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length; j++) {
            column.push(copy[j][i]);
        }
        column = doGameLogicOnArray(column, true);
        for (let j = 0; j < column.length; j++) {
            copy[j][i] = column[j];
        }
        column = [];
    }
    return copy;
}
export {
    startGame,
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    isLoser,
    isWinner,
    score,
    zeroScore,
    insertRandomNumber,
}




