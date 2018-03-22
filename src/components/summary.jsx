import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {Button} from 'react-bootstrap'

import {sprintf} from 'sprintf-js'

import {getStats} from '../actions/statistics'

const mapStateToProps = (state) => {
    return {
        children: state.entities.children,
        statistics: state.entities.statistics,
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getStats: getStats
    }, dispatch)
}

const FeedingSummary = (props) => {
    var totalFeedings = 0
    var feedingList = []
    console.log(props.stats.range)
    for (var x in props.stats.range) {
        totalFeedings += props.stats.range[x]
        feedingList.push({"key": x, "value": props.stats.range[x]})
    }
    var totalFeedingsRows = feedingList.map(x => {
        return (
            <li className="list-group-item" key={x.key}><span className="badge">{x.value}</span>{x.key}</li>
        )
    })
    return (
        <div>
            <strong>Feeding: </strong>
            <ul className="list-group">
                <li className="list-group-item"><span className="badge">{totalFeedings}</span>Total number of feedings</li>
                {totalFeedingsRows}
                <li className="list-group-item"><Button bsStyle="primary" bsSize="xsmall" href="/diaper">Add New</Button></li>
            </ul>
        </div>
    )
}

const SleepSummary = (props) => {
    return (
        <div>
            <strong>Sleep: </strong>
            <ul className="list-group">
                <li className="list-group-item"> <span className="badge">{props.stats.range}</span> Total sleep periods </li>
                <li className="list-group-item"><span className="badge">{sprintf("%.02f", props.stats.mean)}</span> Average sleep per period</li>
                <li className="list-group-item"><span className="badge">{props.stats.total}</span> Total amount of sleep</li>
                <li className="list-group-item"><Button bsStyle="primary" bsSize="xsmall" href="/sleep">Add New</Button></li>

            </ul>
            
        </div>
    )
}

const WasteSummary = (props) => {
    var totalWaste = 0
    var wasteList = []
    for (var x in props.stats.total) {
        totalWaste += props.stats.total[x]
        switch(x) {
            case "1":
                wasteList.push({"key": "No 1", "value": props.stats.total[x]})
                break
            case "2":
                wasteList.push({"key": "No 2", "value": props.stats.total[x]})
                break
            case "3":
                wasteList.push({"key": "Both", "value": props.stats.total[x]})
                break
            default:
        }
    }

    var wasteListRows = wasteList.map(x => {
        console.log("wastelistrow", x)
        return (
            <li className="list-group-item" key={x.key}><span className="badge">{x.value}</span>Total of {x.key}</li>
        )
    })
    return (
        <div>
            <strong>Waste: </strong>
            <ul className="list-group">
                <li className="list-group-item"><span className="badge">{totalWaste}</span>Total dirty diapers</li>
                {wasteListRows}
                <li className="list-group-item"><Button bsStyle="primary" bsSize="xsmall" href="/waste">Add New</Button></li>

            </ul>
            
        </div>
    )
}

const ChildSummary = (props) => {
    return (
        <div className="row">
            <div className="col-md-12">

                <h4>{props.name}</h4>
                <FeedingSummary stats={props.stats["feeding"]}/>
                <SleepSummary stats={props.stats["sleep"]} />
                <WasteSummary stats={props.stats["waste"]} />
            </div>
        </div>

    )
}

class Summary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stats: []
        }

        this.getChildrenStats = this.getChildrenStats.bind(this)
    }

    getChildrenStats = () => {
        this.props.children.allIDs.forEach((id)=>{
            this.props.getStats(this.props.token, id)
        });
    }

    componentDidMount = () => {
        this.getChildrenStats()
    }

    render() {
        if (this.props.isAuthenticated) {
            var childSummaryRows = this.props.statistics.allIDs.map(id => {
                return (
                    <ChildSummary key={id} name={this.props.children.byID[id].name} stats={this.props.statistics.byID[id]}/>
                )
            })
            return (

                <div className="col-md-6">
                    <h5>Summary</h5>
                    {childSummaryRows}
                </div>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);


