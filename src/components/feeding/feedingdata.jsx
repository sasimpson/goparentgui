import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {getFeedings} from '../../actions/feeding'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        currentChild: state.settings.currentChild,
        feedings: state.entities.feeding
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getFeedings: getFeedings
    }, dispatch)
}

//presentational components
const FeedingsList = (props) => {
    return (
        <div className="col-md-6">
            <table id="feedingTable" className="table table-condensed table-striped">
                <thead>
                <tr>
                    <th>Date/Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        </div>
    )
}

var FeedingDataRow = (props) => {
    return (
        <tr key={props.data.id}>
            <td>{new Date(props.data.timestamp).toLocaleString()}</td>
            <td>
                {props.data.feedingType}
                {props.data.feedingType === "breast" ? " - " + props.data.feedingSide : null}
            </td>
            <td>
                {props.data.feedingAmount}
                {props.data.feedingType === "bottle" ? "fl oz" : "mins"}
            </td>
        </tr>
    )
}

//container components
class FeedingData extends React.Component {
    constructor(props) {
        super(props);

        this.getDataFromService = this.getDataFromService.bind(this)
    }

    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getFeedings(this.props.token)
    }

    render() {
        var rowComponents = this.props.feedings.allIDs.filter(id => {
            return this.props.feedings.byID[id].childID === this.props.currentChild
        }).map((id) =>{
            return <FeedingDataRow key={id} data={this.props.feedings.byID[id]}/>
        })

        if (rowComponents.length > 0) {
            return (<FeedingsList rows={rowComponents} />)
        } else {
            return( <div/>)
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FeedingData)
