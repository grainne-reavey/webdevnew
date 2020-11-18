import React from 'react';
import './CSS.css';

class Header extends React.Component {
  render() {

    return (
<nav class="navbar navbar-expand-sm navbar-custom">
    <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
      <div class = "row">
        <img src={require('./logoQ-Netic1.png')} width="200" ></img>
        {/* <a class="navbar-brand" href="#"><h3> Dashboard</h3></a> */}
        </div>
    </div>
</nav>
    );
  }
}
export default Header;
