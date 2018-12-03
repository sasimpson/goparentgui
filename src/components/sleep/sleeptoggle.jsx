import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

import { getSleepStatus } from '../../actions/sleep'

// import {getUrl} from '../../utils/index'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        currentChild: state.settings.currentChild,
        currentStatus: state.entities.sleep.sleepStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSleepStatus: getSleepStatus
    }, dispatch)
}

class SleepToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sleepStatus: false };
        // this.handleToggleStatus = this.handleToggleStatus.bind(this)
    }
    
    componentDidMount = () => {
        this.props.getSleepStatus(this.props.token, this.props.currentChild)

    }

    handleToggleStatus = (event) => {
        console.log("current status:", this.props.currentStatus)
        /*
        if (this.state.sleepStatus === false) {
            fetch(getUrl("/api/sleep/start"), {
            method: "POST", 
            headers: {
                'Authorization': "Bearer " + this.props.auth.token
            }
        })
            .then( r => r.status )
            .then( statusCode => {
                if (statusCode === 200) {
                    this.setState(prevState =>({
                        sleepStatus: !prevState.sleepStatus
                    }));
                }
            })
            .then(() => this.props.updateFunc())
            .catch( e => console.log(e));
        }
        else if (this.state.sleepStatus === true) {
            fetch(getUrl("/api/sleep/end"), {
            method: "POST", 
            headers: {
                'Authorization': "Bearer " + this.props.auth.token
            }
        })
            .then( r => r.status )
            .then( statusCode => {
                if (statusCode === 200) {
                    this.setState(prevState =>({
                        sleepStatus: !prevState.sleepStatus
                    }));
                }
            })
            .then(() => this.props.updateFunc())
            .catch( e => console.log(e));
        }
        this.props.updateFunc();
        */
        // this.setState(prevState => ({
        //     sleepStatus: !prevState.sleepStatus
        // }));
    }
    

    render() {
        return (
            <div className="col-md-6">
                <h4>Toggle Sleep</h4>
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button 
                            bsSize="large" 
                            bsStyle="primary" 
                            value="start" 
                            onClick={this.handleToggleStatus}
                            disabled={this.props.currentStatus}>
                            Start
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button 
                            bsSize="large" 
                            bsStyle="danger" 
                            value="end" 
                            onClick={this.handleToggleStatus}
                            disabled={!this.props.currentStatus}>
                            End
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepToggle)
