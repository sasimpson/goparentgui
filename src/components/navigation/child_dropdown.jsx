import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {NavDropdown, MenuItem} from 'react-bootstrap'

import {getChildren} from '../../actions/children'
import {setCurrentChild} from '../../actions/settings'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        children: state.entities.children, 
        currentChild: state.settings.currentChild}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getChildren: getChildren,
        setCurrentChild: setCurrentChild
    }, dispatch)
}

class ChildrenDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            children: this.props.children,
            currentChild: this.props.currentChild
        }
        console.log("ChildrenDropDown constructor")
    }

    render () {
        return (
            <NavDropdown eventKey={5} title="Children" id="children-drop">
                <MenuItem eventKey={5.1} href="/children">All</MenuItem>
                {
                    this.state.children.allIDs.map( 
                        (id) => { 
                            console.log(id)
                            var d = this.state.children.byID[id]
                            var selected = false
                            if (id === this.state.currentChild) {
                                selected = true
                            }
                            return (
                                <ChildRow key={id} data={d} selected={selected} setCurrentChild={this.state.setCurrentChild} />
                            )
                        }
                    )
                }
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


export default connect(mapStateToProps, mapDispatchToProps)(ChildrenDropDown);
