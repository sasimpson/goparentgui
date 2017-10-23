import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import {Button, ButtonGroup} from 'react-bootstrap'

import { getChildren, deleteChild } from '../../actions/children'


const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        children: state.data.children
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getChildren: getChildren,
        deleteChild: deleteChild
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
    )
}

const EditButton = () => {
    return (
        <Button bsStyle="info" bsSize="xsmall" href="#"><MdEdit /></Button>
    )
}

class ChildDataRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.data.id,
            name: this.props.data.name,
            birthday: this.props.data.birthday
        }
        this.deleteMe = this.deleteMe.bind(this)
    }

    deleteMe = () => {
        console.log("delete " + this.state.id)
        this.props.deleteChild(this.props.token, this.state.id)
    }

    render () {
        return (
            <tr key={this.state.id}>
                <td>{this.state.name}</td>
                <td>{new Date(this.state.birthday).toLocaleString()}</td>
                <td> <ButtonGroup> <EditButton /> <DeleteButton deleteMe={this.deleteMe} /> </ButtonGroup></td>
            </tr>
        )
    }
}

var DeleteButton = (props) => {
        return (
            <Button bsStyle="danger" bsSize="xsmall" onClick={props.deleteMe} ><MdDelete /></Button>
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
                    rows.push(<ChildDataRow key={d.id} data={d} deleteChild={this.props.deleteChild} token={this.props.authentication.auth.token}/>)
                }
            )
        }
        return (
            <ChildrenList rows={rows} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenData)