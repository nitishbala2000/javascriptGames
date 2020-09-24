import React from "react";
import {Link} from "react-router-dom";

const Dropdown = () => (
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
);

export default Dropdown;

