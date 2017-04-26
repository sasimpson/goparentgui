import React from 'react';

class DiaperData extends React.Component {
    constructor(props) {
         super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
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
                    rows.push(<DiaperDataRow data={d}/> )
                }
            )
        }
        console.log(this.state)
        return (
                <div className="col-md-6">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>Time</th>
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
                <td>{this.props.data.timestamp}</td>
                <td>{this.props.data.wasteType}</td>
            </tr>
        );
    }
}

export default DiaperData;
