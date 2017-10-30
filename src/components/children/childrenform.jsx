import React from 'react';
import { connect }from 'react-redux'
import { bindActionCreators } from "redux"

import Datetime from 'react-datetime'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import { postChild, clearChildForm } from '../../actions/children'

const mapStateToProps = (state) => ({
    authentication: state.authentication,
    childForm: state.forms.childForm
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postChild: postChild,
        clearForm: clearChildForm
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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleNameChange = (event) => {
        return this.setState({name: event.target.value})
    }
    
    handleDateChange = (newDate) => {
        newDate = new Date(newDate)
        return this.setState({birthday: newDate})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting children data")
        this.props.postChild(this.props.authentication.auth.token, this.state)
    }

    handleClear = (event) => {
        console.log("clearing children form")
        this.props.clearForm()
    }

    render() {
        return (
            <div className="col-md-6">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel htmlFor="name">Name</ControlLabel>
                        <FormControl type="text" id="name" onChange={this.handleNameChange} value={this.state.name}/>
                    </FormGroup>
                    <div className="form-group">
                        <label htmlFor="birthday">Date/Time</label>  
                        <Datetime onChange={this.handleDateChange}/>
                    </div>
                    <div className="form-group">
                        <Button type="submit" bsStyle="primary">Submit</Button> <Button type="button" bsStyle="danger" onClick={this.handleClear}>Clear</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenForm)