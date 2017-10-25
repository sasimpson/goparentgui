import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import DiaperForm from './diaperform';
import DiaperData from './diaperdata';


const mapStateToProps = (state) => {
    return {
        settings: state.settings,
        authentication: state.authentication
    }

}

class Diaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        }
    }


    updateStatus = () => {
        this.setState({status: this.state.status + 1});
    }
    
    render() {
        if (!this.props.authentication.isAuthenticated) {
            return <Redirect to="/login"/>                
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Diapers</h3>
                        </div>
                    </div>
                    <div className="row">
                        <DiaperForm updateFunc={this.updateStatus.bind(this)} />
                    </div>
                    <div className="row">
                        <DiaperData status={this.state.status} />
                    </div>
                </div>
            )
        }
    }


}

export default connect(mapStateToProps)(Diaper)
