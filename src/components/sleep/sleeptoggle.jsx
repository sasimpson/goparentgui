import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

class SleepToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sleepStatus: false };
        this.handleToggleStatus = this.handleToggleStatus.bind(this)
    }

    componentDidMount = () => {
        fetch("http://localhost:8000/api/sleep/status")
            .then( r => r.status )
            .then( statusCode => {
                if (statusCode === 200) {
                    this.setState({ sleepStatus: true })
                } else {
                    this.setState({ sleepStatus: false })
                }
            })
            // .catch( (error) => console.log(error));
    }

    handleToggleStatus = (event) => {
        if (this.state.sleepStatus === false) {
            fetch("http://localhost:8000/api/sleep/start")
            .then( r => r.status )
            .then( statusCode => {
                if (statusCode === 200) {
                    this.setState(prevState =>({
                        sleepStatus: !prevState.sleepStatus
                    }));
                }
            })
            .catch( (e) => console.log(e));
        }
        else if (this.state.sleepStatus === true) {
            fetch("http://localhost:8000/api/sleep/end")
            .then( r => r.status )
            .then( statusCode => {
                if (statusCode === 200) {
                    this.setState(prevState =>({
                        sleepStatus: !prevState.sleepStatus
                    }));
                }
            })
            .catch( (e) => console.log(e));
        }
        this.props.updateFunc();
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
                            disabled={this.state.sleepStatus}>
                            Start
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button 
                            bsSize="large" 
                            bsStyle="danger" 
                            value="end" 
                            onClick={this.handleToggleStatus}
                            disabled={!this.state.sleepStatus}>
                            End
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
        );
    }
}

export default SleepToggle;
