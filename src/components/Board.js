import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        display: "flex"
    },
    column: {
        backgroundColor: "#CDC1B4",
        borderColor: "#BBADA0",
        borderWidth: 4,
        display: "flex",
        flexDirection: 'column',
    },
    row: {
        borderColor: "#BBADA0",
        borderWidth: 2,
        display: "flex",
        flexDirection: "row",
    },

});
const reversArray = (arr=[])=>{
    const copy =[];
    for(let i = arr.length-1;i>=0;i--){
        copy.push(arr[i]);
    }
    return copy;
}


const Board = ({ board }) => {

    return (
        <View style={styles.center}>
            <View style={styles.column}>
                {board.map((row = [], indexColumn) => {
                    row = reversArray(row);
                    return (
                        <View key={indexColumn} style={styles.row}>
                            {row.map((cell, indexRow) => <Cell
                                key={(row.length * indexColumn) + indexRow}
                                number={cell.value}
                                isNew={cell.new}
                                isMerge={cell.merge}
                                delta={cell.delta}
                                direction={cell.direction}
                            />)}
                        </View>)
                })}
            </View>
        </View>

    );
}
export default Board;