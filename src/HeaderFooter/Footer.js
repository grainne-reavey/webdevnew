import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div class="card-footer text-center text-muted">
                 <img src={require('./logoQ-Netic1.png')} width="100" ></img>
                 <div></div>
                © 2020: q-Netic Dashboard
            </div>
        );
    }
}
export default Footer;