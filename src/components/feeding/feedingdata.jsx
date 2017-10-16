import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({...state})

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
    componentWillReceiveProps = (nextProps) => {
        if (this.props.status !== nextProps.status) {
            this.getDataFromService();
        }
    }
  
    getDataFromService = () => {
        fetch("http://localhost:8000/api/feeding", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.auth.token
            }
        }) 
            .then(r => r.json())
            .then(data => {
                this.setState({data: data})
            })
            .catch((e) => console.log(e));
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

export default connect(mapStateToProps)(FeedingData)
