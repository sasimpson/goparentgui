import React from 'react';

import ChildrenForm from './childrenform'
import ChildrenData from './childrendata'

class Children extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Children</h3>
                    </div>
                </div>
                <div className="row">
                    <ChildrenForm/>
                </div>
                <div className="row">
                    <ChildrenData/>
                </div>
            </div>
        );
    }
}

export default Children