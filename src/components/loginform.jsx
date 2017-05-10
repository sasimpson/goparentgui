import React from 'react'
import {Redirect} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loginNow, UPDATE_FIELD_AUTH } from '../actions/index'

const mapStateToProps = (state) => ({ ...state });

class LoginForm extends React.Component {

    onChangeInput = (event) => {
        console.log(event.target.id, ":", event.target.value)
        this.props.dispatch({type: UPDATE_FIELD_AUTH, key: event.target.id, value: event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { dispatch, auth } = this.props
        dispatch(loginNow(auth.email, auth.password))
    }

    render() {
        const email = this.props.auth.email
        const password = this.props.auth.password
        if (!this.props.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" className="form-control" id="email" onChange={this.onChangeInput} value={email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" onChange={this.onChangeInput} value={password}/>
                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}

export default connect(mapStateToProps)(LoginForm);
