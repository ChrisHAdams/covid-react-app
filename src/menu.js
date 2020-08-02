import React from 'react';
import {Link} from "react-router-dom"
import './menu.css';

function Menu() {
  return (
    <div className="Menu">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/graphs">Graphs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;