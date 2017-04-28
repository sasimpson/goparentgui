import React from 'react';

import SleepForm from './sleepform';
import SleepData from './sleepdata';
import SleepToggle from './sleeptoggle';

class Sleep extends React.Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Sleep</h3>
                </div>
            </div>
            <div className="row">
                <SleepToggle/>
            </div>
            <div className="row">
                <div className="col-md-6"><h4>or</h4></div>
            </div>
            <div className="row">
                <SleepForm/>
            </div>
            <div className="row">
                <SleepData/>
            </div>
        </div>
    );
  }
}

export default Sleep;
