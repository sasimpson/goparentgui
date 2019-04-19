import React from 'react'
import {FormGroup, FormControl, HelpBlock, ControlLabel, Button} from 'react-bootstrap'


class Contact extends React.Component {

    stopSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Contact</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>Let us know how we're doing, good or bad.  If you need something, just send a message with the form and we'll create a ticket.</p>
                    <FormGroup controlId="name">
                          <ControlLabel>Name:</ControlLabel>
                          <FormControl type="text" placeholder="Jane Doe" />
                          <HelpBlock>Enter your full name</HelpBlock>
                        <FormGroup controlId="email">
                            <ControlLabel>Email Address:</ControlLabel>
                            <FormControl type="text" placeholder="me@example.com" />
                            <HelpBlock>Enter your email address</HelpBlock>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Message:</ControlLabel>
                        <br/>
                        <textarea cols="100" rows="6"></textarea>
                        <HelpBlock>Enter your message.</HelpBlock>
                    </FormGroup>
                    <Button type="submit" onClick={this.stopSubmit}>Submit</Button>
                </div>
            </div>
        </div>  )
    }
}

export default Contact;

