import React, { Component, Fragment } from "react";
import "./Game.css";
import * as breakout from "../../games/breakout/game";
import * as jewelThief from "../../games/jewel-thief/game";
import * as cupcakeCatcher from "../../games/cupcake-catcher/game";
import * as snake from "../../games/snake/game";

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
            } case "cupcake-catcher" : {
                this.game = new cupcakeCatcher.CupcakeCatcherGame();
                break;
            } case "snake" : {
                this.game = new snake.SnakeGame();
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
            } case "cupcake-catcher" : {
                height = cupcakeCatcher.SCREEN_HEIGHT;
                width = cupcakeCatcher.SCREEN_WIDTH;
                break;
            } case "snake" : {
                height = snake.SCREEN_HEIGHT;
                width = snake.SCREEN_WIDTH;
                break;
            }
            
            default : {
                height = 600;
                width = 1000;
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