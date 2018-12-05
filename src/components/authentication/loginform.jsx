import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loginNow } from '../../actions/authentication'

const mapStateToProps = (state) => {
    return {
        // auth: state.auth,
        isAuthenticated: state.authentication.isAuthenticated,
    }
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onChangeInput = (event) => {
        var stateObject = function() {
            var returnObj = {};
            returnObj[this.target.id] = this.target.value;
               return returnObj;
          }.bind(event)();
        this.setState(stateObject)
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch(loginNow(this.state.email, this.state.password))
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" onChange={this.onChangeInput} value={this.state.email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" onChange={this.onChangeInput} value={this.state.password}/>
                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps)(LoginForm);
