import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

class SleepToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sleepStatus: false };
        this.handleToggleStatus = this.handleToggleStatus.bind(this)
    }

    handleToggleStatus = (event) => {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
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
                            disabled={this.state.isToggleOn}>
                            Start
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button 
                            bsSize="large" 
                            bsStyle="danger" 
                            value="end" 
                            onClick={this.handleToggleStatus}
                            disabled={!this.state.isToggleOn}>
                            End
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
        );
    }

    componentDidMount() {
        this.setState({ sleepStatus: 'end' });
    }
}

export default SleepToggle;
