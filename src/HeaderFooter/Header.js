import React from 'react';
import './CSS.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div class="row">
            <div class="col"></div>
            <div class="navbar-brand"><h3>q-Netic Dashboard</h3></div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
