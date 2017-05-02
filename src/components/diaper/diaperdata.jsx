import React from 'react';

class DiaperData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.getDataFromService();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myProp !== this.props.myProp) {
            console.log("triggering get new data");
            this.getDataFromService();
        }
    }
    getDataFromService() {
        console.log("getDataFromService");
        fetch("http://localhost:8000/api/waste", {method: "GET"}) 
            .then(r => r.json())
            .then(data => this.setState({data: data}))
            .catch((e) => console.log(e));
    }
    render() {
        var rows = [];
        if (this.state.data != null) {
            this.state.data.forEach(
                d => {
                    rows.push(<DiaperDataRow key={d.id} data={d}/> )
                }
            )
        }
        return (
                <div className="col-md-6">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>Date, Time</th>
                            <th>Type</th>
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

class DiaperDataRow extends React.Component {
    render() {
        return (
            <tr key={this.props.data.id}>
                <td>{new Date(this.props.data.timestamp).toLocaleString()}</td>
                <td>{this.props.data.wasteType}</td>
            </tr>
        );
    }
}

export default DiaperData;
