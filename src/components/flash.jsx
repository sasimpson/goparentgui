import React from 'react'
import {connect} from 'react-redux'
import { getLatestMessage, removeMessage } from 'redux-flash/lib/reducer'
import {bindActionCreators} from 'redux'
import {Alert,Button} from 'react-bootstrap'

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
    // console.log(this.state.flash.id)
        this.props.removeMessage(this.props.flash.id)
        console.log(this.props)
    }

    render() {
        if(this.props.flash !== undefined) {
            return (
                <div className="alerts">
                    <Alert bsStyle={this.props.flash.props.style}>
                        { this.props.flash.message }
                        <p></p>
                        <Button onClick={this.handleDismiss}>Hide Alert</Button>
                    </Alert>
                </div>
            )
        } 
        return <div></div>
     }  
 }

 export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)