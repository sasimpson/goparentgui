import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

import {getChildren} from '../actions/children'

const mapStateToProps = (state) => {
    return {
        authorized: state.authentication.isAuthenticated, 
        token: state.authentication.auth.token,
        children: state.data.children, 
        currentChild: state.settings.currentChild}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getChildren: getChildren
    }, dispatch)
}

const NavigationHeader = () => {
    return (
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Go Parent</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
    )
}

const ChildrenDropDown = (props) => {
    var rows = []
    if (Array.isArray(props.children) && props.children.length > 0) {
        props.children.forEach( 
            d => { rows.push(
                    <MenuItem key={d.id} eventKey={d.id}>{d.name}</MenuItem>
            )}
        )
    }
    return (
        <NavDropdown eventKey={5} title="Children" id="children-drop">
            <MenuItem eventKey={5.1} href="/children">All</MenuItem>
            {rows}
        </NavDropdown>
    )
    
}

const NavigationCollapse = (props) => {
    if (props.isAuthenticated) {        
        return (
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="/">Home</NavItem>
                    <NavItem eventKey={2} href="/diaper">Diaper</NavItem>
                    <NavItem eventKey={3} href="/feeding">Feeding</NavItem>
                    <NavItem eventKey={4} href="/sleep">Sleep</NavItem>
                    <ChildrenDropDown children={props.children}/>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/logout">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        )
    } else {
        return (
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/register">Register</NavItem>
                    <NavItem eventKey={2} href="/login">Login</NavItem>
                </Nav>
            </Navbar.Collapse>
        )
    }
}

const NavigationBar = (props) => {
    return (
        <Navbar inverse>
            <NavigationHeader/>
            <NavigationCollapse isAuthenticated={props.isAuthenticated} children={props.children}/>
        </Navbar>
    )
}

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.props.getChildren(this.props.token)
    }

    // componentDidMount = () => {
        
    // }

    render() {
        return (<NavigationBar isAuthenticated={this.props.authorized} children={this.props.children}/>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
