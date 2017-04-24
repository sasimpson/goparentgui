import React from 'react';

class DiaperData extends React.Component {
  render() {
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
                        <tr>
                            <td>2000-01-01 00:00:00</td>
                            <td>No 1</td>
                        </tr>
                        <tr>
                            <td>2000-01-01 00:00:00</td>
                            <td>No 2</td>
                        </tr>
                        <tr>
                            <td>2000-01-01 00:00:00</td>
                            <td>Both</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
    );
  }
}

export default DiaperData;
