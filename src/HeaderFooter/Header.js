import React from 'react';
import './CSS.css';

class Header extends React.Component {
  render() {
    return (
      <div>
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand">Web Development Project</span>
      </nav>
      <div class = "space-box"></div>
      </div>
    );
  }
}
export default Header;
