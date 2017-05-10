import React from 'react';

import SleepForm from './sleepform';
import SleepData from './sleepdata';
import SleepToggle from './sleeptoggle';

class Sleep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 0
        }
    }

    updateStatus = () => {
        this.setState({status: this.state.status + 1});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Sleep</h3>
                    </div>
                </div>
                <div className="row">
                    <SleepToggle updateFunc={this.updateStatus.bind(this)} />
                </div>
                <div className="row">
                    <div className="col-md-6"><h4>or</h4></div>
                </div>
                <div className="row">
                    <SleepForm updateFunc={this.updateStatus.bind(this)} />
                </div>
                <div className="row">
                    <SleepData status={this.state.status} />
                </div>
            </div>
        );
  }
}

export default Sleep;
