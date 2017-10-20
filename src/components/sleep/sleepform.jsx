import React from 'react'
import { connect } from 'react-redux'
import Datetime from 'react-datetime'
import { Button } from 'react-bootstrap'

const mapStateToProps = (state) => ({...state})

class SleepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
    }
  
    handleStartChange = (newDate) => {
        newDate = new Date(parseInt(newDate, 10))
        return this.setState({startDate: newDate})
    }

    handleEndChange = (newDate) => {
        newDate = new Date(parseInt(newDate, 10))
        return this.setState({endDate: newDate})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/api/sleep", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.auth.token
            },
            body: JSON.stringify({
                sleepData: {
                    start: this.state.startDate, 
                    end: this.state.endDate
                }
            })
        }).then(r => this.props.updateFunc());
    }

    render() {
        return (
            <div className="col-md-6">
                <h4>Enter a time:</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Datetime onChange={this.handleStartChange} id="start" name="start"/>
                    </div>
                    <div className="form-group">
                        <Datetime onChange={this.handleEndChange} id="end" name="end" />
                    </div>
                    <Button type="submit" bsStyle="primary">Submit</Button>
                </form>
            </div>
        );
    }

}

export default connect(mapStateToProps)(SleepForm);
