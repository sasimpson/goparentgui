import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {getFeedings} from '../../actions/feeding'

const mapStateToProps = (state) => ({
    authentication: state.authentication,
    currentChild: state.settings.currentChild
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getFeedings: getFeedings
    }, dispatch)
}

class FeedingData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [] 
        };
    }

    componentDidMount = () => {
        this.getDataFromService();
    }

    getDataFromService = () => {
        this.props.getFeedings(this.props.authentication.auth.token, this.props.currentChild)
    }

    render() {
        var rows = [];
        if (this.state.data != null) {
            this.state.data.forEach(
                d => {
                    rows.push(<FeedingDataRow key={d.id} data={d}/> )
                }
            )
        }
        return (
            <div className="col-md-6">
                <table className="table table-condensed table-striped">
                    <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

class FeedingDataRow extends React.Component {
    render() {
        return (
            <tr key={this.props.data.id}>
                <td>{new Date(this.props.data.timestamp).toLocaleString()}</td>
                <td>
                    {this.props.data.feedingType}
                    {this.props.data.feedingType === "breast" ? " - " + this.props.data.feedingSide : null}
                </td>
                <td>
                    {this.props.data.feedingAmount}
                    {this.props.data.feedingType === "bottle" ? "fl oz" : "mins"}
                </td>
            </tr>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedingData)
