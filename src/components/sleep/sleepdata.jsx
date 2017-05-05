import React from 'react';

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

    getDataFromService = () => {
        console.log("getDataFromService");
        fetch("http://localhost:8000/api/sleep", {method: "GET"}) 
            .then(r => r.json())
            .then(data => {
                console.log(data);
                this.setState({data: data})
            })
            .catch((e) => console.log(e));
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
      );
    }
}

class SleepDataRow extends React.Component {
    msToTime = (duration) => {
        var minutes = parseInt((duration/(1000*60))%60,10)
            , hours = parseInt((duration/(1000*60*60))%24,10);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + ":" + minutes;
    }
    render() {
        return (
            <tr key={this.props.data.id}>
                <td><DateTimeFormat date={new Date(this.props.data.start)}/></td>
                <td><DateTimeFormat date={new Date(this.props.data.end)}/></td>
                <td>
                    {this.msToTime(new Date(this.props.data.end) - new Date(this.props.data.start))}
                </td>
            </tr>
        );  
    }
}

function DateTimeFormat(props) {
    return (
        <span>
            {props.date.getMonth()+1}/{props.date.getDate()}/{props.date.getFullYear()} {props.date.getHours()}:{props.date.getMinutes() < 10 ? "0"+props.date.getMinutes() : props.date.getMinutes()}
        </span>
    )
}

export default SleepData;
