import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HorizontalBar } from 'react-chartjs-2/'
import { getSleepGraphData } from '../../actions/sleep'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        graphData: state.entities.sleep.graphData,
        currentChild: state.settings.currentChild
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSleepGraphData: getSleepGraphData
    }, dispatch)
}

class SleepChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.graphData,
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        stacked: true
                        
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        },
                        stacked: true
                    }]
                }
            }
        }
        this.getDataFromService = this.getDataFromService.bind(this)
    }
 
    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getSleepGraphData(this.props.token, this.props.currentChild)
    }
 
    render() {
        return (
            <div className="col-md-6">
                <h3>total sleep</h3>
                <HorizontalBar data={this.state.data} options={this.state.options}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepChart)