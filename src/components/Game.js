import React from 'react';
import { Text, View, Dimensions, StyleSheet, PanResponder, Button, Alert } from 'react-native';
import {
    startGame,
    isLoser,
    isWinner,
    score,
    zeroScore,

} from '../game/game';
import Board from './Board';
import { slidingDirection } from './utils/slidingDirection';
import { setAnimation } from './utils/setDeltaAnimation';
import { makeMove, insertNumberByDirection, isBoardChange } from './utils/playFunction';
import { resetBoxesSpeacialValues } from '../game/utils/helpFunctions';


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        borderColor: "#ffffff",
        flexGrow: 1,
        borderWidth: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    newGameButton: {
        marginTop: 30,
    },
    gameTitle:{
        fontSize:60,
        fontFamily: "sans-serif",
        fontWeight: "bold",
    },
    score:{
        fontSize:30,
        fontFamily: "sans-serif",
        fontWeight: "bold",
    },
    winnerTitle:{
        fontSize:20,
        fontFamily: "sans-serif",
        fontWeight: "bold",
    }
})

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = startGame(4);
        this.state = { board, isWinner: false, score };
        this.newGame = this.newGame.bind(this);
    }
    panResponder() {
        return PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => !(gestureState.dx === 0 && gestureState.dy === 0),
            onPanResponderRelease: (evt, gestureState) => {
                if (isLoser(this.state.board)) {
                    Alert.alert(
                        'You Lose !!!!!',
                        'Please start a new game',
                        [
                            { text: 'Cancel', onPress: () => true },
                            { text: 'OK', onPress: () => this.newGame() },
                        ],
                        { cancelable: false }
                    )
                    return true
                }
                if (isWinner(this.state.board)) {
                    this.setState({ isWinner: true });
                }
                resetBoxesSpeacialValues(this.state.board);
                const direction = slidingDirection(gestureState.dx, gestureState.dy);
                let newBoard = setAnimation(direction, this.state.board);
                newBoard = makeMove(newBoard, direction);
                if (isBoardChange(this.state.board, newBoard)) {
                    newBoard = insertNumberByDirection(newBoard, direction);
                }
                this.setState({ board: newBoard, score });
                return true;
            },
        })
    }


    newGame() {
        zeroScore();
        this.setState({ board: startGame(4), score });
    }


    render() {
        return (
            <View
                style={styles.container}
                {...(this.panResponder().panHandlers)}
            >
                <Text style={styles.gameTitle}>2048</Text>
                <Text style={styles.score}>Score:{this.state.score}</Text>
                <Board board={this.state.board} />
                {this.state.isWinner && <Text style={styles.winnerTitle}>You reach 2048,Winner !!!!!</Text>}
                <View style={styles.newGameButton}>
                    <Button title="New game" onPress={this.newGame} color="green"/>
                </View>
                
            </View>
        );

    }
}
export default Game;