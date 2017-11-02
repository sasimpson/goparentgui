import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Datetime from 'react-datetime'
import { Button, ButtonGroup, FormGroup } from 'react-bootstrap'

import { postDiaper } from '../../actions/diaper'

const mapStateToProps = (state) => ({
    authentication: state.authentication,
    currentChild: state.settings.currentChild
})

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        postDiaper: postDiaper
    }, dispatch)
}

class DiaperForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wasteType: 1,
            timestamp: new Date(),
            childID: ""
        }
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleOptionChange = (event) => {
        return this.setState({wasteType: parseInt(event.target.value, 10)});
    }

    handleDateChange = (newDate) => {
        newDate = new Date(newDate);
        return this.setState({timestamp: newDate});
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        console.log("current child: " + this.props.currentChild)
        this.setState({childID: this.props.currentChild}, function () {this.props.postDiaper(this.props.authentication.auth.token, this.state)})
    }

    render() {
        if (this.props.currentChild === null) {
            return (
                <div className="col-md-6">
                    Please select a child
                </div>
            )
        }
        return (
                <div className="col-md-6">    
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Datetime defaultValue={new Date()} onChange={this.handleDateChange}/>
                        </FormGroup>
                        <ButtonGroup justified>
                            <ButtonGroup>
                                <Button bsStyle="primary" value="1" active={this.state.wasteType === 1} onClick={this.handleOptionChange}>&#8470; 1</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button bsStyle="primary" value="2" active={this.state.wasteType === 2} onClick={this.handleOptionChange}>&#8470; 2</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button bsStyle="primary" value="3" active={this.state.wasteType === 3} onClick={this.handleOptionChange}>Both</Button>
                            </ButtonGroup>
                        </ButtonGroup>
                        <Button type="submit" bsStyle="primary">Submit</Button>
                    </form>
                </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaperForm)
