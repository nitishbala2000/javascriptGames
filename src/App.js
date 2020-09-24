import React from 'react';
import {Link, Switch, Route} from "react-router-dom";
import Game from "./components/Game/Game";

function App() {
  return (
    <div className="App">

      <div style={{textAlign:"center"}}>

        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Choose your game
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="/jewel-thief">Jewel Thief</Link>
            <Link className="dropdown-item" to="/cupcake-catcher">Cupcake catcher</Link>
            <Link className="dropdown-item" to="/breakout">Breakout</Link>
            <Link className="dropdown-item" to="/snake">Snake</Link>
          </div>
        </div>

        <Switch>
          <Route path="/breakout" render={(props) => <Game {...props} game="breakout"/>  }/>
          <Route path="/jewel-thief" render={(props) => <Game {...props} game="jewel-thief"/>  }/>

          <Route path="/" render={(props) => <Game {...props} height="600" width="1000"/>}/>
        </Switch>


       

      </div>
    </div>
  );
}

export default App;
