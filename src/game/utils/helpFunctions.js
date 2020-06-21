const {Box} = require('./helpClasses');

const tempArray = (length) => {
    const arry = [];
    for (let i = 0; i < length; i++) {
        arry.push(new Box(0));
    }
    return arry;
}
const pickRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}
const copyBoard = (matrix) => {
    const copy = []
    for (let i = 0; i < matrix.length; i++) {
        const row = []
        for (let j = 0; j < matrix[i].length; j++) {
            const atLocation = matrix[i][j]
            row.push(new Box(atLocation.value,atLocation.merge,atLocation.new,atLocation.delta,atLocation.direction))
        }
        copy.push(row);
    }
    return copy;
}
const resetBoxesSpeacialValues =(matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j].resetSpeacialValues();
        }
    }
    return matrix;
}
const boardToString = (matrix = []) => {
    let str = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            str += matrix[i][j].value
        }
    }
    return str;
}
const color = (num) => {
    const color2 = "#EEE4DA";
    const color8 = "#F2B179";
    const color16 = "#F59563";
    const color64 = "#F65E3B";
    const color32 = "#F67C5F";
    const color128 = "#EDCF72";
    const color256 = "#EDCC61";
    const color512 = "#D7C18A";
    const color1024 = "#00cc66";
    const color2084 = "#009933";
    switch (num) {
        case 2:
            return color2;
        case 4:
            return color2;
        case 8:
            return color8;
        case 16:
            return color16;
        case 32:
            return color32;
        case 64:
            return color64;
        case 128:
            return color128;
        case 256:
            return color256;
        case 512:
            return color512;
        case 1024:
            return color1024;
        case 2048:
            return color2084;
        default:
            return "#00000000"

    }
}

module.exports ={tempArray,pickRandomNumber,resetBoxesSpeacialValues,boardToString,copyBoard,color}