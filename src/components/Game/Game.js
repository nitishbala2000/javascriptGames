import React, { Component, Fragment } from "react";
import "./Game.css";
import * as breakout from "../../games/breakout/game";
import * as jewelThief from "../../games/jewel-thief/game";


class Game extends Component {

    game = null;

    startGame = () => {
        if (this.game) {
            this.game.stop();
        }


        switch (this.props.game) {
            case "breakout" : {
                this.game = new breakout.BreakoutGame();
                break;
            } case "jewel-thief" : {
                this.game = new jewelThief.JewelThiefGame();
                break;
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

        let height, width;
        switch (this.props.game) {
            case "breakout" : {
                height = breakout.SCREEN_HEIGHT;
                width = breakout.SCREEN_WIDTH;
                break;
            } case "jewel-thief" : {
                height = jewelThief.SCREEN_HEIGHT;
                width = jewelThief.SCREEN_WIDTH;
                break;
            }
        }

        return (
            <Fragment>
                <canvas height={height} width={width}>
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