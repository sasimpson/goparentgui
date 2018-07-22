import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFeedingGraphData } from '../../actions/feeding'
import { Bar } from 'react-chartjs-2';

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        graphData: state.entities.feeding.graphData,
        currentChild: state.settings.currentChild
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getFeedingGraphData: getFeedingGraphData
    }, dispatch)
}

class FeedingChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bottle: {
                // labels: this.props.feeding.graphData.labels,
                // datasets: this.props.feeding.graphData.datasets.bottle
            },
            breast: {
                // labels: this.props.feeding.graphData.labels,
                // datasets: this.props.feeding.graphData.datasets.breast
            },
            options: {
                elements: {
                    line: {
                      fill: false
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true
                        },
                        stacked: true
                    }],
                    yAxes: [
                        {
                          type: 'linear',
                          display: true,
                          position: 'left',
                          id: 'y-axis-1',
                          gridLines: {
                            display: false
                          },
                          labels: {
                            show: true
                          }
                        },
                        {
                          type: 'linear',
                          display: true,
                          position: 'right',
                          id: 'y-axis-2',
                          gridLines: {
                            display: false
                          },
                          labels: {
                            show: true
                          }
                        }
                  ]
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
        this.props.getFeedingGraphData(this.props.token, this.props.currentChild)
        console.log(this.props.graphData)
        if (this.props.graphData.chartReady === true){
            this.setState({bottle: {
                labels: this.props.graphData.labels,
                datasets: this.props.graphData.datasets.bottle
            },
            breast: {
                labels: this.props.graphData.labels,
                datasets: this.props.graphData.datasets.breast
            }})
        }
    }

    render() {
        console.log(this.state)
        console.log(this.props.graphData)
        if (this.props.graphData.chartReady === true) {
            console.log("chart ready, need to render")
            return (
                <div className="col-md-6">
                    <div>
                        <h3>bottle feedings</h3>
                        <Bar data={this.state.bottle} options={this.state.options} />
                    </div>
                    <div>
                        <h3>breast feedings</h3>
                        <Bar data={this.state.breast} options={this.state.options} />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedingChart);