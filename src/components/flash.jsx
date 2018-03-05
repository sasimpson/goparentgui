import React from 'react'
import {connect} from 'react-redux'
import { getLatestMessage, removeMessage } from 'redux-flash/lib/reducer'
import {bindActionCreators} from 'redux'
import {Alert,Button} from 'react-bootstrap'

 class FlashMessage extends React.Component {
     constructor(props){
        super(props)

        this.state = {
            show:true,
            flash: this.props.flash
        }

        this.handleDismiss = this.handleDismiss.bind(this)
     }

     handleDismiss = () => {
        // console.log(this.state.flash.id)
        // this.props.removeMessage(this.state.flash.id)
        console.log(this.props)
      }

     render() {
        if(this.state.flash !== undefined) {
            return (
                <div className="alerts">
                    <Alert bsStyle={this.state.flash.props.style}>
                        { this.state.flash.message }
                        <p></p>
                        <Button onClick={this.handleDismiss}>Hide Alert</Button>
                    </Alert>
                </div>
            )
         } 
         return <div></div>
     }  
 }

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

 export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)