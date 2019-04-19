import React from 'react'

import {Nav, Navbar, NavItem} from 'react-bootstrap'

import ChildrenDropDown from './child_dropdown'

const NavigationCollapse = (props) => {
    if (props.isAuthenticated) {        
        return (
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="/">Home</NavItem>
                    <NavItem eventKey={2} href="/diaper">Diaper</NavItem>
                    <NavItem eventKey={3} href="/feeding">Feeding</NavItem>
                    <NavItem eventKey={4} href="/sleep">Sleep</NavItem>
                    <ChildrenDropDown />
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/profile">Profile</NavItem>
                    <NavItem eventKey={2} href="/contact">Contact</NavItem>
                    <NavItem eventKey={3} href="/about">About</NavItem>
                    <NavItem eventKey={4} href="/logout">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        )
    } else {
        return (
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/contact">Contact</NavItem>
                    <NavItem eventKey={2} href="/about">About</NavItem>
                    <NavItem eventKey={3} href="/register">Register</NavItem>
                    <NavItem eventKey={4} href="/login">Login</NavItem>
                </Nav>
            </Navbar.Collapse>
        )
    }
}

export default NavigationCollapse