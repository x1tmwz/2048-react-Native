import {copyBoard} from '../../game/utils/helpFunctions';
import {LEFT,RIGHT,DOWN,UP} from './slidingDirection';

const setAnimation = (direction, matrix = []) => {
    const copy = copyBoard(matrix);
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy[i].length; j++) {
            if (copy[i][j].value !== 0) {
                const index = i * copy.length + j;
                let delta = 0;
                let canContinue=true;
                if (direction === RIGHT) {
                    for (let z = j + 1; z < copy[i].length && canContinue; z++) {
                        if (copy[i][z].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (direction === LEFT) {
                    for (let z = j - 1; z >= 0 && canContinue; z--) {
                        if (copy[i][z].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (direction === UP) {
                    for (let z = i - 1; z >= 0 && canContinue; z--) {
                        if (copy[z][j].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (direction === DOWN) {
                    for (let z = i + 1; z < copy[j].length && canContinue; z++) {
                        if (copy[z][j].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (delta !== 0) {
                    copy[i][j].setMovment(delta,direction);
                }
            }
        }
    }
    return copy;
}
export {setAnimation};