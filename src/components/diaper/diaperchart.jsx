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
    }

    render() {
        if (Object.keys(this.state.data).length > 0 && Object.keys(this.state.data.datasets).length > 0) {
            return (
                <div className="col-md-6">
                    <h3>chart</h3>
                    <WasteChartError>
                        <HorizontalBar data={this.state.data} options={this.state.options} />
                    </WasteChartError>
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

class WasteChartError extends React.Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(DiaperChart);