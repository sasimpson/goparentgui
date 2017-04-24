import React from 'react';
import DiaperForm from './diaperform';
import DiaperData from './diaperdata';

class Diaper extends React.Component {
  render() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Diapers</h3>
                </div>
            </div>
            <div className="row">
                <DiaperForm/>
            </div>
            <div className="row">
                <DiaperData/>
            </div>
        </div>
    );
  }

}

export default Diaper;
