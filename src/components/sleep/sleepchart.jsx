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
 
    componentWillMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getSleepGraphData(this.props.token, this.props.currentChild)
    }
 
    render() {
        console.log("datasets", this.state.data.datasets)
        if (Object.keys(this.state.data).length > 0 && Object.keys(this.state.data.datasets).length > 0) {
            return (
                <div className="col-md-6">
                    <h3>total sleep</h3>
                    <SleepChartError>
                    <HorizontalBar data={this.state.data} options={this.state.options}/>
                    </SleepChartError>
                </div>
            )
        } else {
            return (
                <div className="col-md-6">
                <h4>No Data Available</h4>
                </div>
            )
        }
       
    }
}

class SleepChartError extends React.Component {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError){
            return <h3>Something went wrong</h3>
        }

        return this.props.children
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepChart)