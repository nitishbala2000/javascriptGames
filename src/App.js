import React from 'react';
import {Link, Switch, Route} from "react-router-dom";
import Game from "./components/Game/Game";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  return (
    <div className="App">

      <div style={{textAlign:"center"}}>

       <Dropdown/>

        <Switch>
          <Route path="/breakout" render={(props) => <Game {...props} game="breakout"/>  }/>
          <Route path="/jewel-thief" render={(props) => <Game {...props} game="jewel-thief"/>  }/>
          <Route path="/cupcake-catcher" render={(props) => <Game {...props} game="cupcake-catcher"/>  }/>
          <Route path="/snake" render={(props) => <Game {...props} game="snake"/>  }/>

          <Route path="/" render={(props) => <Game {...props} height="600" width="1000"/>}/>
        </Switch>


       

      </div>
    </div>
  );
}

export default App;
