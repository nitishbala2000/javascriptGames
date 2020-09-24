import React, { Component, Fragment } from "react";
import "./Game.css";
import {BreakoutGame} from "../../games/breakout/game";



class Game extends Component {

    game = null;

    startGame = () => {
        if (this.game) {
            this.game.stop();
        }


        switch (this.props.game) {
            case "breakout" : {
                this.game = new BreakoutGame();
            }
        }
    }

    componentDidUpdate() {
       this.startGame();
    }

    componentDidMount() {
      this.startGame();
    }

    render() {
        return (
            <Fragment>
                <canvas id={this.props.canvasId} height={this.props.height} width={this.props.width}>
                    It seems like your browser doen't support canvas. Stop using internet explorer!!
                </canvas>


                <div className="alert alert-danger" role="alert">
                    You need a screen of at least 1000px to play this game
                </div>


            </Fragment>
        )
      
    }

}

export default Game;