import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import InputRange from 'react-input-range';
import {Button, ButtonGroup} from 'react-bootstrap';
import FeedingData from './feedingdata';

import 'react-input-range/lib/css/index.css';

class Feeding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedingAmount: 0,
            feedingType: "",
            feedingSide: "",
            showForm: "",
            timestamp: new Date(),
            status: 0
        };
    }

    handleDateChange = (newDate) => {
        newDate = parseInt(newDate, 10);
        console.log("newDate", newDate);
        console.log("formatted", new Date(newDate));
        return this.setState({timestamp: new Date(newDate)});
    }
    handleAmountChange = (newAmount) => {
        console.log(newAmount);
        return this.setState({feedingAmount: newAmount});
    }

    handleTypeChange = (event) => {
        this.setState({feedingType: event.target.id});
        switch (event.target.id) {
            case 'breast':
                this.setState({showForm: "breast"});
                break;
            case 'bottle':
                this.setState({showForm: "bottle"});
                break;
            default:
                this.setState({showForm: ""});
        }
    }

    handleSideChange = (event) => {
        console.log("changed to", event.target.id);
        this.setState({feedingSide: event.target.id});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit");
        fetch("http://localhost:8000/api/feeding", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedingData: {
                    feedingType: this.state.feedingType, 
                    timestamp: this.state.timestamp.toISOString(), 
                    feedingSide: this.state.feedingSide, 
                    feedingAmount: parseFloat(this.state.feedingAmount, 10)
                }
            })
        }).then(r => this.updateStatus());
        
    }

    updateStatus = () => {
        this.setState({status: this.state.status + 1});
    }
  
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Feeding</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="timestamp">Date/Time</label>                            
                                <DateTimeField onChange={this.handleDateChange} />
                            </div>
                            <div className="form-group">
                                <ButtonGroup justified>
                                    <ButtonGroup>
                                        <Button bsStyle="primary" id="breast" active={this.state.feedingType === "breast"} onClick={this.handleTypeChange}>Breast</Button>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button bsStyle="primary" id="bottle" active={this.state.feedingType === "bottle"} onClick={this.handleTypeChange}>Bottle</Button>
                                    </ButtonGroup>
                                </ButtonGroup>
                            </div>
                            {this.state.showForm === "breast" ? 
                                <BreastForm 
                                    feedingAmount={this.state.feedingAmount} 
                                    handleAmountChange={this.handleAmountChange} 
                                    feedingSide={this.state.feedingSide} 
                                    handleSideChange={this.handleSideChange} /> 
                                : null}
                            {this.state.showForm === "bottle" ?
                                <BottleForm
                                    feedingAmount={this.state.feedingAmount}
                                    handleAmountChange={this.handleAmountChange}
                                    />
                                : null }
                            <Button type="submit" bsStyle="primary">Submit</Button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <FeedingData status={this.state.status}/>
                </div>
            </div>
        );
    }
}


class BottleForm extends React.Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="amount"/>Amount
                    <InputRange
                        maxValue={8}
                        minValue={0}
                        step={0.5}
                        value={this.props.feedingAmount}
                        onChange={this.props.handleAmountChange} 
                        id="amount"/>
                </div>
            </div>
        );
    }

}

class BreastForm extends React.Component {
  render() {
    return (
        <div>
            <div className="form-group">
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button bsStyle="primary" id="left" active={this.props.feedingSide === "left"} onClick={this.props.handleSideChange}>Left</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="primary" id="right" active={this.props.feedingSide === "right"} onClick={this.props.handleSideChange}>Right</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
            <div className="form-group">
                <label htmlFor="amount"/>Time (minutes):
                <InputRange
                    maxValue={30}
                    minValue={0}
                    step={1}
                    value={this.props.feedingAmount}
                    onChange={this.props.handleAmountChange} 
                    id="amount"/>
            </div>
        </div>
    );
  }
}

export default Feeding;
