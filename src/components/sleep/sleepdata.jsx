import React from 'react';

class SleepData extends React.Component {
  render() {
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
                        <tr>
                            <td>2000-01-01 00:00:00</td>
                            <td>2000-01-01 00:00:00</td>
                            <td>2:00</td>
                        </tr>
                        <tr>
                            <td>2000-01-01 00:00:00</td>
                            <td>2000-01-01 00:00:00</td>
                            <td>2:00</td>
                        </tr>
                        <tr>
                            <td>2000-01-01 00:00:00</td>
                            <td>2000-01-01 00:00:00</td>
                            <td>2:00</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
    );
  }
}

export default SleepData;
