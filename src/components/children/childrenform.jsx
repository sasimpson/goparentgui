import React from 'react';
import { connect }from 'react-redux'
import { bindActionCreators } from "redux";

import Datetime from 'react-datetime';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { postChild } from '../../actions/children'

const mapStateToProps = (state) => ({
    authentication: state.authentication
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postChild: postChild
    }, dispatch)
}

class ChildrenForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            name: "",
            birthday: new Date()
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }
    handleNameChange = (event) => {
        return this.setState({name: event.target.value})
    }
    handleDateChange = (newDate) => {
        newDate = new Date(parseInt(newDate, 10))
        return this.setState({birthday: newDate})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting children data")
        this.props.postChild(this.props.authentication.auth.token, this.state)
    }

    render() {
        return (
            <div className="col-md-6">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel htmlFor="name">Name</ControlLabel>
                        <FormControl type="text" id="name" onChange={this.handleNameChange}/>
                    </FormGroup>
                    <div className="form-group">
                        <label htmlFor="birthday">Date/Time</label>  
                        <Datetime onChange={this.handleDateChange}/>
                    </div>
                    <div className="form-group">
                        <Button type="submit" bsStyle="primary">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenForm)