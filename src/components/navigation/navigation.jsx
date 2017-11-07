import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from 'react-bootstrap'

import NavigationHeader from './header'
import NavigationCollapse from './collapse'

const mapStateToProps = (state) => {
    return {
        authorized: state.authentication.isAuthenticated    
    }
}

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        console.log("load navigation")
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

export default connect(mapStateToProps)(Navigation)