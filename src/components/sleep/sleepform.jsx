import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';

class SleepForm extends React.Component {
  
  handleChange = (newDate) => {
    console.log("newDate", newDate);
    return this.setState({date: newDate});
  }

  render() {
    return (
                    <div className="col-md-6">
                      <form>
                        <div className="form-group">
                            <DateTimeField onChange={this.handleChange} defaultText="Please select a date" />
                        </div>
                        <div className="form-group">
                            <DateTimeField onChange={this.handleChange}  defaultText="Please select a date" />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                      </form>
                    </div>
    );
  }

}

export default SleepForm;
