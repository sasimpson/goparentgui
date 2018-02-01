import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {resetState} from '../actions/settings'

const mapStateToProps = (state) => ({state: state})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetState: resetState
    }, dispatch)
}

class Reset extends Component {

    componentDidMount() {
        this.props.resetState()
    }

    render() {
        return (
            <Redirect to="/home"/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
