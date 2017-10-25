import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

import {getChildren} from '../actions/children'
import {setCurrentChild} from '../actions/settings'

const mapStateToProps = (state) => {
    return {
        authorized: state.authentication.isAuthenticated, 
        token: state.authentication.auth.token,
        children: state.data.children, 
        currentChild: state.settings.currentChild}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getChildren: getChildren,
        setCurrentChild: setCurrentChild
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

class ChildrenDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            children: this.props.children,
            currentChild: this.props.currentChild
        }
        this.reloadNav = this.reloadNav.bind(this)
    }

    reloadNav = (event, obj) => {
        console.log("forceUpdate")
        console.log(event)
        console.log(obj)
        this.forceUpdate()
    }

    render () {
        var rows = []
        if (Array.isArray(this.state.children) && this.state.children.length > 0) {
            this.state.children.forEach( 
                d => { 
                    var selected = false
                    if (d.id === this.state.currentChild) {
                        selected = true
                    }
                    rows.push(
                        <ChildRow key={d.id} data={d} selected={selected} setCurrentChild={this.props.setCurrentChild} />
                    )
                }
            )
        }

        return (
            <NavDropdown eventKey={5} title="Children" id="children-drop" onSelect={this.reloadNav}>
                <MenuItem eventKey={5.1} href="/children">All</MenuItem>
                {rows}
            </NavDropdown>
        )
    }
}

class ChildRow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.props.data
        }
        this.setMe = this.setMe.bind(this)
    }

    setMe = () => {
        this.props.setCurrentChild(this.state.id)
    }
    render () {
        return (
            <MenuItem key={this.state.id} eventKey={this.state.id} active={this.props.selected} onClick={this.setMe}>{this.state.name}</MenuItem>
        )
    }
    
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
                    <ChildrenDropDown children={props.children} currentChild={props.currentChild} setCurrentChild={props.setCurrentChild}/>
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

class Navigation extends React.Component {
    render() {
        return (
            <Navbar inverse >
                <NavigationHeader/>
                <NavigationCollapse isAuthenticated={this.props.authorized} children={this.props.children} currentChild={this.props.currentChild} setCurrentChild={this.props.setCurrentChild}/>
            </Navbar>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
