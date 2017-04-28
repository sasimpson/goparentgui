import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Button, ButtonGroup} from 'react-bootstrap';


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
        newDate = parseInt(newDate, 10);
        console.log("newDate", newDate);
        console.log("formatted", new Date(newDate));
        return this.setState({timestamp: new Date(newDate)});
    }
    
    handleSubmit = (event) => {
        console.log("submit clicked");
        console.log(this.state);
        event.preventDefault();
        fetch("http://localhost:8000/api/waste", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wasteData: {wasteType: this.state.wasteType, timestamp: this.state.timestamp.toISOString()}
            })
        });
    }

    render() {
        return (
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <ButtonGroup justified>
                                <ButtonGroup>
                                    <Button bsStyle="primary" bsSize="large" value="1" onClick={this.handleOptionChange}>&#8470; 1</Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button bsStyle="primary" bsSize="large" value="2" onClick={this.handleOptionChange}>&#8470; 2</Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button bsStyle="primary" bsSize="large" value="3" onClick={this.handleOptionChange}>Both</Button>
                                </ButtonGroup>
                            </ButtonGroup>
                        </div>
                        <div className="form-group">
                            <DateTimeField onChange={this.handleDateChange}/>
                        </div>
                        <Button type="submit" bsSize="large" bsStyle="primary">Submit</Button>
                    </form>
                </div>
        );
    }

}

export default DiaperForm;
