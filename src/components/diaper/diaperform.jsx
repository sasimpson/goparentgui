import React from 'react';
import { connect } from 'react-redux'
import Datetime from 'react-datetime';
import { Button, ButtonGroup, FormGroup } from 'react-bootstrap';

const mapStateToProps = (state) => ({...state})

class DiaperForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wasteType: 1,
            timestamp: new Date()
        }
    }

    handleOptionChange = (event) => {
        console.log("event", event.target.value)
        return this.setState({wasteType: parseInt(event.target.value, 10)});
    }

    handleDateChange = (newDate) => {
        newDate = new Date(parseInt(newDate, 10));
        return this.setState({timestamp: newDate});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/api/waste", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.props.authentication.auth.token
            },
            body: JSON.stringify({
                wasteData: {
                    wasteType: this.state.wasteType, 
                    timestamp: this.state.timestamp.toISOString()
                }
            })
        }).then(r => this.props.updateFunc());
    }

    render() {
        return (
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Datetime onChange={this.handleDateChange}/>
                        </FormGroup>
                        <ButtonGroup justified>
                            <ButtonGroup>
                                <Button bsStyle="primary" value="1" active={this.state.wasteType === 1} onClick={this.handleOptionChange}>&#8470; 1</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button bsStyle="primary" value="2" active={this.state.wasteType === 2} onClick={this.handleOptionChange}>&#8470; 2</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button bsStyle="primary" value="3" active={this.state.wasteType === 3} onClick={this.handleOptionChange}>Both</Button>
                            </ButtonGroup>
                        </ButtonGroup>
                        <Button type="submit" bsStyle="primary">Submit</Button>
                    </form>
                </div>
        )
    }
}

export default connect(mapStateToProps)(DiaperForm)
