import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        settings: state.settings,
    }
}

const divStyle = {
    backgroundColor: "lightcoral",
    borderStyle: "double",
    wordBreak: "break-all",
}

class Debug extends React.Component {
    
    render() {
        if (process.env.NODE_ENV !== "production") {
            var currentChild = this.props.settings != null ? this.props.settings.currentChild : "not set"
            return (
                <div id="debug" className="container">
                    <div className="row">
                        <div className="col-md-12" style={divStyle}>
                            <strong>token</strong>: {this.props.authentication.auth.token}<br/>
                            <strong>userid</strong>: {this.props.authentication.user.id}<br/>
                            <strong>current child</strong>: {currentChild}<br/>
                        </div>
                    </div>
                </div>
            )
        } else {
            console.log("no debug, prod")
            return (
                <br/>
            )
        }
    }
}

export default connect(mapStateToProps)(Debug)