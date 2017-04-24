import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';

class DiaperForm extends React.Component {

  render() {
    return (
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <div className="btn-group btn-group-justified" data-toggle="buttons">
                                <label className="btn btn-primary active">
                                    <input type="radio" name="options" id="option1"/>No 1
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" id="option2"/>No 2
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" id="option3"/>Both 
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <DateTimeField/>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
    );
  }

}

export default DiaperForm;
