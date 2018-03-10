import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import MdSave from 'react-icons/lib/md/save'
import MdCancel from 'react-icons/lib/md/cancel'
import {Button, ButtonGroup, FormControl} from 'react-bootstrap'
import Datetime from 'react-datetime'


import { 
    getChildren, 
    deleteChild, 
    editChild 
} from '../../actions/children'


const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        children: state.entities.children,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getChildren: getChildren,
        deleteChild: deleteChild,
        editChild: editChild
    }, dispatch)
}

//Presentation Components
const ChildrenList = (props) => {
    return (
        <div className="col-md-6">
            <table className="table table-condensed striped" id="childrenTable">
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

const EditButton = (props) => {
    return (
        <Button bsStyle="info" bsSize="xsmall" onClick={props.onClick}><MdEdit /></Button>
    )
}

var DeleteButton = (props) => {
    return (
        <Button bsStyle="danger" bsSize="xsmall" onClick={props.onClick} ><MdDelete /></Button>
    )
}

var SaveButton = (props) => {
    return (
        <Button type="submit" bsStyle="primary" bsSize="small" onClick={props.onClick}><MdSave /></Button>
    )
}

var CancelButton = (props) => {
    return (
        <Button bsStyle="danger" bsSize="small" onClick={props.onClick}><MdCancel /></Button>
    )
}

const ChildEditRow = (props) => {
    return (
        <tr key={props.data.id}>
            <td><FormControl defaultValue={props.data.name} onChange={props.updateName} /></td>
            <td><Datetime defaultValue={props.data.birthday} onChange={props.updateBirthday} /></td>
            <td>
                <ButtonGroup>
                    <SaveButton onClick={props.onSave}/>
                    <CancelButton onClick={props.onCancel}/>
                </ButtonGroup>
            </td>
        </tr>
    )
}

const ChildDisplayRow = (props) => {
    return (
        <tr key={props.data.id}>
            <td>{props.data.name}</td>
            <td>{new Date(props.data.birthday).toLocaleString()}</td>
            <td> 
                <ButtonGroup> 
                    <EditButton onClick={props.onEdit}/> 
                    <DeleteButton onClick={props.onDelete} /> 
                </ButtonGroup>
            </td>
        </tr>
    )
}

//Container Components
class ChildDataRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.data.id,
            name: this.props.data.name,
            birthday: this.props.data.birthday,
            parentID: this.props.data.parentID,
            editStatus: false,
            editValues: {
                birthday: this.props.data.birthday,
                name: this.props.data.name
            }
        }

        this.editMe = this.editMe.bind(this)
        this.deleteMe = this.deleteMe.bind(this)
        this.cancelMe = this.cancelMe.bind(this)
        this.saveMe = this.saveMe.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
    }

    editMe = (event) => {
        this.setState({editStatus: true})
    }

    deleteMe = () => {
        this.props.deleteChild(this.props.token, this.state.id)
    }

    cancelMe = () => {
        this.setState({editStatus: false})
    }

    saveMe = (event) => {
        this.setState({editStatus: false})
        this.setState({
            name: this.state.editValues.name, 
            birthday: this.state.editValues.birthday
        })
        this.props.editChild(this.props.token, this.state)
    }

    updateName = (event) => {
        this.setState({editValues: { name: event.target.value}})
    }

    updateBirthday = (dateInt) => {
        var newEditVals = this.state.editValues
        newEditVals.birthday = new Date(dateInt)
        this.setState({editValues: newEditVals})
    }

    render () {
        if (this.state.editStatus) {
            return (
                <ChildEditRow data={this.state} onSave={this.saveMe} onCancel={this.cancelMe} updateName={this.updateName} updateBirthday={this.updateBirthday} />
            )
        } else {
            return (
                <ChildDisplayRow data={this.state} onEdit={this.editMe} onDelete={this.deleteMe} />
            )
        }
    }
}

class ChildrenData extends React.Component {
    constructor(props) {
        super(props)
        this.getDataFromService = this.getDataFromService.bind(this)
    }
    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getChildren(this.props.token)
    }

    render() {
        return (
            <ChildrenList rows={
                this.props.children.allIDs.map(
                    (id) => {
                        var d = this.props.children.byID[id]
                        return (
                            <ChildDataRow key={id} data={d} 
                                          editChild={this.props.editChild} 
                                          deleteChild={this.props.deleteChild} 
                                          token={this.props.token}/>)
                    }
                )
            } />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenData)