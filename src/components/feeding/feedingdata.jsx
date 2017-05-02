import React from 'react';

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
        console.log("componentWillReceiveProps:", nextProps)
        if (this.props.status !== nextProps.status) {
            console.log("triggering get new data");
            this.getDataFromService();
        }
    }
    componentDidUpdate = () => {
        console.log("componentDidUpdate");
    }
    
    shouldComponentUpdate = (nextProps, nextState) => {
        console.log(nextProps, nextState);
        if (this.state.data === nextState.data) {
            return false;
        }
        return true;
    }
    
    getDataFromService = () => {
        console.log("getDataFromService");
        fetch("http://localhost:8000/api/feeding", {method: "GET"}) 
            .then(r => r.json())
            .then(data => {
                console.log(data);
                this.setState({data: data})
            })
            .catch((e) => console.log(e));
        console.log("shouldComponentUpdate", this.shouldComponentUpdate);
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
                <td>{this.props.data.feedingType}</td>
                <td>
                    {this.props.data.feedingAmount}
                    {this.props.data.feedingType === "bottle" ? "fl oz" : "mins"}
                </td>
            </tr>
        );
    }
}

export default FeedingData;
