import React from 'react';
import DiaperForm from './diaperform';
import DiaperData from './diaperdata';

class Diaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propA: "hiA",
            propB: 0
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
                    <DiaperForm myProp={this.state.propA} myFunc={this.siblingFormFunc.bind(this)}/>
                </div>
                <div className="row">
                    <DiaperData myProp={this.state.propB} myFunc={this.siblingDataFunc.bind(this)}/>
                </div>
            </div>
        );
    }

    siblingFormFunc = () => {
        var b = this.state.propB;
        b++;
        this.setState({propB: b});
        console.log("siblingForm func");
    }

    siblingDataFunc = (x) => {
        console.log("siblingData func");
        return this.state.propB;
    }

}

export default Diaper;
