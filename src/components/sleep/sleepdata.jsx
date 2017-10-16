import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({...state})

class SleepData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [] 
        };
    }

    componentDidMount = () => {
        this.getDataFromService();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.status !== nextProps.status) {
            this.getDataFromService()
        }
    }

    getDataFromService = () => {
        fetch("http://localhost:8000/api/sleep", {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + this.props.auth.token
            }
        }) 
            .then(r => r.json())
            .then(data => {
                this.setState({data: data})
            })
            .catch((e) => console.log(e))
    }

    render() {
    var rows = [];
        if (this.state.data != null) {
            this.state.data.forEach(
                d => {
                    rows.push(<SleepDataRow key={d.id} data={d}/> )
                }
            )
    }
    return (
        <div className="col-md-6">
            <table className="table table-condensed table-striped">
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            </table>
        </div>
      )
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

export default connect(mapStateToProps)(SleepData)
