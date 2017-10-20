import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getChildren } from '../../actions/children'


const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        children: state.data.children
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getChildren: getChildren
    }, dispatch)
}


const ChildrenList = (props) => {
    return (
        <div className="col-md-6">
            <table className="table table-condensed striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        </div>
    );
}

const ChildDataRow = (props) =>  {
    return (
        <tr key={props.data.id}>
            <td>{props.data.name}</td>
            <td>{new Date(props.data.birthday).toLocaleString()}</td>
        </tr>
    )
}

class ChildrenData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        this.getDataFromService();
    }

    getDataFromService = () => {
        this.props.getChildren(this.props.authentication.auth.token)
    }

    render() {
        var rows = [];
        if (this.props.children != null) {
            this.props.children.forEach(
                d => {
                    rows.push(<ChildDataRow key={d.id} data={d}/>)
                }
            )
        }
        return (
            <ChildrenList rows={rows}/>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChildrenData);