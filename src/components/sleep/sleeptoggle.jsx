import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

import { getSleep, getSleepStatus, setSleepStatus } from '../../actions/sleep'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        currentChild: state.settings.currentChild,
        currentStatus: state.entities.sleep.sleepStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSleepStatus: getSleepStatus,
        setSleepStatus: setSleepStatus,
        getSleep: getSleep
    }, dispatch)
}

class SleepToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sleepStatus: false };
        this.handleToggleStatus = this.handleToggleStatus.bind(this)
    }
    
    componentWillMount = () => {
        this.props.getSleepStatus(this.props.token, this.props.currentChild)

    }

    handleToggleStatus = (event) => {
        console.log("current status:", this.props.currentStatus)
        this.props.setSleepStatus(this.props.token, this.props.currentChild, event.target.value)
        this.props.getSleep(this.props.token)
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
