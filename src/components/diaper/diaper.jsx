import React from 'react';
import DiaperForm from './diaperform';
import DiaperData from './diaperdata';

class Diaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Diapers</h3>
                    </div>
                </div>
                <div className="row">
                    <DiaperForm updateFunc={this.updateStatus.bind(this)}/>
                </div>
                <div className="row">
                    <DiaperData status={this.state.status}/>
                </div>
            </div>
        );
    }

    updateStatus = () => {
        var b = this.state.status;
        b++;
        this.setState({status: b});
        console.log("siblingForm func");
    }
}

export default Diaper;
