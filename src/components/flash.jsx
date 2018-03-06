import React from 'react'
import {connect} from 'react-redux'
import { getLatestMessage, removeMessage } from 'redux-flash'
import {bindActionCreators} from 'redux'
import {Alert} from 'react-bootstrap'

const mapStateToProps = (state) => {
    return {
        flash: getLatestMessage(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
       removeMessage: removeMessage
    }, dispatch)
}

 class FlashMessage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            show:true,
        }

        this.handleDismiss = this.handleDismiss.bind(this)
    }

    handleDismiss = () => {
        this.props.removeMessage(this.props.flash.id)
    }

    render() {
        if(this.props.flash !== undefined) {
            return (
                <div className="col-md-offset-6 col-md-6">
                    <div className="alerts">
                        <Alert bsStyle={this.props.flash.props.style} onDismiss={this.handleDismiss}>
                            { this.props.flash.message }
                        </Alert>
                    </div>
                </div>
            )
        } 
        return <div></div>
     }  
 }

 export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)