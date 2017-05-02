import React from 'react';
import FeedingForm from './feedingform';
import FeedingData from './feedingdata';

class Feeding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        };
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
                    <FeedingForm updateFunc={this.updateStatus.bind(this)}/>
                </div>
                <div className="row">
                    <FeedingData status={this.state.status}/>
                </div>
            </div>
        );
    }
}



export default Feeding;
