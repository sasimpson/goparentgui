import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getDiaper } from '../../actions/diaper'

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        diaper: state.data.diaper,
        currentChild: state.settings.currentChild
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDiaper: getDiaper
    }, dispatch)
}

const DiaperList = (props) => {
    return (
        <div className="col-md-6">
            <table className="table table-condensed table-striped">
                <thead>
                <tr>
                    <th>Date/Time</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {props.rows}
                </tbody>
            </table>
        </div>
    )
}

const DiaperDataRow = (props) => {
    return (
        <tr key={props.data.id}>
            <td>{new Date(props.data.timestamp).toLocaleString()}</td>
            <td>{props.data.wasteType}</td>
        </tr>
    )
}

class DiaperData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        this.getDataFromService();
    }
    
    getDataFromService = () => {
       this.props.getDiaper(this.props.authentication.auth.token, this.props.currentChild)
    }

    render() {
        var rows = [];
        if (this.props.diaper != null) {
            this.props.diaper.forEach(
                d => {
                    rows.push(<DiaperDataRow key={d.id} data={d}/> )
                }
            )
        }
        return (
            <DiaperList rows={rows} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaperData)
