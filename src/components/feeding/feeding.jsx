import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Feeding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        feedingAmount: 0,
        feedingType: "breast",
        showBreastButtons: false,
    };
  }

  handleDateChange = (newDate) => {
    console.log(newDate);
    return this.setState({date: newDate});
  }

  handleAmountChange = (newAmount) => {
      console.log(newAmount);
      return this.setState({feedingAmount: newAmount});
  }

  handleTypeChange = (event) => {
    this.setState({feedingType: event.target.id});
    if (this.state.feedingType === "breast") {
        this.setState({showBreastButtons: true});
    } else {
        this.setState({showBreastButtons: false});
    }
  }

  isActive = (event) => {
      if (this.state.feedingType === event.target.id){
          return "active";
      }
  }

  handleSideChange = (event) => {
      this.setState({feedingSide: event.target.id});
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
                    <form>
                        <div className="form-group">
                            <div className="btn-group btn-group-justified" role="group">
                                <div className="btn-group" role="group"><button type="button" className="btn btn-primary {this.isActive}" id="breast" onClick={this.handleTypeChange}>Breast</button></div>
                                <div className="btn-group" role="group"><button type="button" className="btn btn-primary {this.isActive}" id="bottle" onClick={this.handleTypeChange}>Bottle</button></div>
                            </div>
                        </div>
                        {this.state.showBreastButtons ? <BreastButton /> : null}
                        <div className="form-group">
                            <label htmlFor="">Date/Time</label>                            
                            <DateTimeField onChange={this.handleDateChange}  defaultText="Please select a date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount"/>Amount <br/>
                            <InputRange
                                maxValue={10}
                                minValue={0}
                                step={0.5}
                                value={this.state.feedingAmount}
                                onChange={this.handleAmountChange} />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

class BreastButton extends React.Component {
  render() {
    return (
        <div className="form-group">
            <div className="btn-group btn-group-justified" role="group">
                <div className="btn-group" role="group"><button type="button" className="btn btn-primary" id="left" onClick={this.handleSideChange}>Left</button></div>
                <div className="btn-group" role="group"><button type="button" className="btn btn-primary" id="right" onClick={this.handleSideChange}>Right</button></div>
            </div>
        </div>
    );
  }
}

export default Feeding;
