import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize';

class BarraNav extends Component {

    render() {

        return (
            <div className="nav-wrapper">
                <Navbar brand='Bienvenido a Flow!!!' left className="black">
                <NavItem href="/">Home</NavItem>
                </Navbar>
            </div>  
            
        );
    }
}

export default BarraNav;


