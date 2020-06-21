import {RIGHT,LEFT,DOWN,UP} from './slidingDirection';
import {
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    insertRandomNumber
} from '../../game/game';
import {Range} from '../../game/utils/helpClasses';
import {boardToString} from '../../game/utils/helpFunctions';

const makeMove =(board,direction)=>{
    let newBoard;
    // this range is for insert number logic
    let xRange = new Range(0, 4);
    let yRange = new Range(0, 4)
    switch (direction) {
      case DOWN:
        newBoard = moveDown(board);
        xRange.set(0, 1)
        yRange.set(0, 3)
        break;
      case UP:
        newBoard = moveUp(board);
        xRange.set(2, 3)
        yRange.set(0, 3)
        break;
      case RIGHT:
        newBoard = moveRight(board);
        xRange.set(0, 3)
        yRange.set(0, 1)
        break;
      case LEFT:
        newBoard = moveLeft(board);
        xRange.set(0, 3)
        yRange.set(2, 3)
        break;
      default:
        return;
    }
    return newBoard;
}
const insertNumberByDirection =(matrix,direction)=>{
  let xRange = new Range(0, 4);
    let yRange = new Range(0, 4)
    switch (direction) {
      case DOWN:
        xRange.set(0, 1)
        yRange.set(0, 3)
        break;
      case UP:
        xRange.set(2, 3)
        yRange.set(0, 3)
        break;
      case RIGHT:
        xRange.set(0, 3)
        yRange.set(0, 1)
        break;
      case LEFT:
        xRange.set(0, 3)
        yRange.set(2, 3)
        break;
      default:
        return matrix;
    }
    return insertRandomNumber(matrix,xRange.min,xRange.max,yRange.min,yRange.max)
}
const isBoardChange = (oldBoard,newBoard)=>{
  const oldBoardString = boardToString(oldBoard);
  const newBoardString = boardToString(newBoard);
  return oldBoardString !== newBoardString;
}
export {makeMove,insertNumberByDirection,isBoardChange};