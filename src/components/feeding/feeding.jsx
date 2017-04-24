import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
// import ReactBootstrapSlider from 'react-bootstrap-slider';

class Feeding extends React.Component {
    constructor() {
        super();
        this.state = {
            currentValue: 0
        }
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
                            <div className="btn-group btn-group-justified" data-toggle="buttons">
                                <label className="btn btn-primary active">
                                    <input type="radio" name="options" id="option1" autoComplete="off"/>Breast
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" id="option2" autoComplete="off"/>Bottle
                                </label>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="">Date/Time</label>                            
                            <DateTimeField onChange={this.handleChange}  defaultText="Please select a date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="answer">Amount <br/>
                            {/*<input type="range" value="20" min="0" max="100" step="10"/>*/}
                            {/*<ReactBootstrapSlider min={this.state.min} max={this.state.max} step={this.state.step} value={myValue}/>*/}
                            {/*<ReactBootstrapSlider max={7} min={1} step={1} ticks={[1, 2, 3, 4, 5, 6, 7]} tooltip="hide" name="answer" value={this.state.currentValue} />*/}
                                <input type="text" name="amount" id="amount" maxLength={5}/> fl oz.
                            </label>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default Feeding;
