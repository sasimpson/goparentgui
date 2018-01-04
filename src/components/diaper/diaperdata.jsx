import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getDiaper } from '../../actions/diaper'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
        diaper: state.entities.diaper,
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

        this.getDataFromService = this.getDataFromService.bind(this)
    }

    getDataFromService = () => {
       this.props.getDiaper(this.props.token)
    }

    render() {
        var rowComponents = this.props.diaper.allIDs.filter(id => {
            return this.props.diaper.byID[id].childid === this.props.currentChild
        }).map((id) => {
            return <DiaperDataRow key={id} data={this.props.diaper.byID[id]}/>
        })
        
        if (rowComponents.length > 0) {
            return ( <DiaperList rows={rowComponents}/> )
        }
        else {
            return ( <div/> )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaperData)
