import { Animated, Easing } from 'react-native';
import { LEFT, RIGHT, DOWN, UP } from './slidingDirection'

const createMovementAnimation = (delta, direction, cellSize) => {
    let animation = new Animated.ValueXY();
    switch (direction) {
            case DOWN:
                animation = new Animated.ValueXY({x:0,y:delta*cellSize*-1});
                break;
            case UP:
                animation = new Animated.ValueXY({x:0,y:delta*cellSize});
                break;
            case RIGHT:
                animation = new Animated.ValueXY({x:cellSize*delta*-1,y:0});
                break;
            case LEFT:
                animation = new Animated.ValueXY({x:delta*cellSize,y:0});
                break;
            default:
                animation = new Animated.ValueXY();
                break;
    }
    const animationMove = ({ x, y }) => Animated.timing(animation, { toValue: { x, y }, useNativeDriver: false, duration:250 })
    // const animationMove = ({ x, y }) => Animated.spring(animation, { toValue: { x, y },velocity:1,speed:20, useNativeDriver: false});
    return {animation,animationMove:animationMove({x:0,y:0})};
    
}
export { createMovementAnimation };