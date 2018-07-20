import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDiaperGraphData } from '../../actions/diaper'
import { HorizontalBar } from 'react-chartjs-2';

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        diaper: state.entities.diaper,
        currentChild: state.settings.currentChild
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDiaperGraphData: getDiaperGraphData
    }, dispatch)
}

class DiaperChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.diaper.graphData,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true
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

    componentDidCatch = (error, info) => {
        console.log(error)
        console.log(info)
    }

    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getDiaperGraphData(this.props.token, this.props.currentChild)
        console.log(this.props.diaper.graphData)
    }

    render() {
        if (this.props.diaper.graphData.chartReady === true) {
            console.log("chart ready, need to render")
            return (
                <div className="col-md-6">
                    <h3>chart</h3>
                    <HorizontalBar data={this.state.data} options={this.state.options} />
                </div>
            )
        } else {
            return (
                <div className="col-md-6">
                    <h3>No data available</h3>
                </div>
            )
        }
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaperChart);