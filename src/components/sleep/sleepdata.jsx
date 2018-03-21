import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import {getSleep} from '../../actions/sleep'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        currentChild: state.settings.currentChild,
        sleep: state.entities.sleep
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSleep: getSleep
    }, dispatch)
}

//presentational components
const SleepList = (props) => {
    return (
        <div className="col-md-6">
            <table id="sleepTable" className="table table-condensed table-striped">
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
            </table>
        </div>
      )
}

//container components
class SleepData extends React.Component {
    constructor(props) {
        super(props);

        this.getDataFromService = this.getDataFromService.bind(this)
    }

    componentWillMount = () => {
        console.log("componentWillMount")
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getSleep(this.props.token)
    }

    render() {
        console.log("item length", this.props.sleep.allIDs.length)
        var rowComponents = this.props.sleep.allIDs.filter(id => {
            return this.props.sleep.byID[id].childID === this.props.currentChild
        }).map(id => {
            return <SleepDataRow key={id} data={this.props.sleep.byID[id]} />
        })
        
        console.log("rowComponents", rowComponents)
        if (rowComponents.length > 0) {
            return (<SleepList rows={rowComponents} />)
        } else {
            return (<div/>)
        }
    }
}

class SleepDataRow extends React.Component {
    msToTime = (duration) => {
        var minutes = parseInt((duration/(1000*60))%60,10)
            , hours = parseInt((duration/(1000*60*60))%24,10)

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes

        return hours + ":" + minutes
    }
    render() {
        const startTime = new Date(this.props.data.start)
        const endTime = new Date(this.props.data.end)
        return (
            <tr key={this.props.data.id}>
                <td><DateTimeFormat date={startTime}/></td>
                <td><DateTimeFormat date={endTime}/></td>
                <td>
                    {endTime.getTime() >= startTime.getTime() ? this.msToTime(endTime - startTime) : null}
                </td>
            </tr>
        );  
    }
}

function DateTimeFormat(props) {
    if (props.date.getTime() < 0) {
        return (
            <span>still sleeping...</span>
        )
    }
    return (
        <span>
            {props.date.getMonth()+1}/{props.date.getDate()}/{props.date.getFullYear()} {props.date.getHours()}:{props.date.getMinutes() < 10 ? "0"+props.date.getMinutes() : props.date.getMinutes()}
        </span>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepData)
