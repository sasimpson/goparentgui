import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Doughnut } from 'react-chartjs-2/'
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
        super(props);
        this.state = { 
            data: {
                labels: [
                    'Red',
                    'Green',
                    'Yellow'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ]
                }]
            }
        };
    }
 
    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getSleepGraphData(this.props.token, this.props.currentChild)
        console.log(this.props.graphData)
    }
 
    render() {
        return (
            <div className="col-md-6">
                <h3>total sleep</h3>
                <Doughnut data={this.state.data}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepChart)