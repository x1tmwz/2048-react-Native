import React, { useState, useEffect} from 'react';
import { StyleSheet, Animated } from 'react-native';
import { color } from '../game/utils/helpFunctions';
import { createMovementAnimation } from './utils/createAnimation';
import {WIDTH,HEIGHT,FONT} from './utils/constants';

const styles = StyleSheet.create({
    cellContainer: {
        width: WIDTH,
        height: HEIGHT,
        borderColor: "#BBADA0",
        borderWidth: 3,
    },
    cell: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        position: "relative",
    },
    text: {
        fontSize: FONT,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        zIndex:5
    }

});
const Cell = ({ number, isNew, isMerge, delta, direction }) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const text = number.toString();
        const textSize = text.length * 20;
        if ((textSize / scale) >= 80) {
            return setScale(80 / (textSize / scale))
        }
        return setScale(1);
    }, [number])

    let transform = [
        { translateX: 0 },
        { translateY: 0 }
    ];
   
    if (number !== 0 && delta !== 0) {
        const { animation, animationMove } = createMovementAnimation(delta, direction, 80);
        transform = animation.getTranslateTransform();
        animationMove.start();
    }
    let newBoxAnimation = new Animated.Value(1);
    if(isNew){
        newBoxAnimation = new Animated.Value(0);
        Animated.timing(newBoxAnimation,{toValue:1,duration:100,useNativeDriver:false}).start();
    }
    if(isMerge){
        newBoxAnimation = new Animated.Value(0);
        Animated.sequence([
            Animated.timing(newBoxAnimation,{toValue:1.3,duration:50,useNativeDriver:false}),
            Animated.timing(newBoxAnimation,{toValue:1,delay:50,duration:50,useNativeDriver:false})
        ]).start();
    }

    return (
        <Animated.View style={styles.cellContainer}>
            <Animated.View
                style={[styles.cell, { backgroundColor: color(number), transform:[...transform,{scale:newBoxAnimation}],opacity:isNew?newBoxAnimation:1}]}
            >
                <Animated.Text
                    style={{ ...styles.text, transform: [{ scale }] }}
                >
                    {number === 0 ? "" : number}
                </Animated.Text>
            </Animated.View>
        </Animated.View>


    );
}
export default Cell;