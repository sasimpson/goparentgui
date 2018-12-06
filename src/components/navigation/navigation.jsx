import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from 'react-bootstrap'

import NavigationHeader from './header'
import NavigationCollapse from './collapse'
import { bindActionCreators } from 'redux';

import { checkAuthentication } from '../../actions/authentication'

const mapStateToProps = (state) => {
    return {
        authorized: state.authentication.isAuthenticated,
        auth: state.authentication.auth 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        checkAuthentication: checkAuthentication
    }, dispatch)
}

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.props.checkAuthentication(this.props.auth)
    }
    render() {
        return (
            <Navbar inverse >
                <NavigationHeader/>
                <NavigationCollapse isAuthenticated={this.props.authorized}/>
            </Navbar>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)