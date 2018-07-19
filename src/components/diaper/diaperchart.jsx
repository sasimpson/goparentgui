import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDiaperGraphData } from '../../actions/diaper'
import { Bar } from 'react-chartjs-2';

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
            data: {
                labels: ['a', "b", "c", "d", "e"],
                datasets: [{
                    label: 'no 1', 
                    data: [1,2,3,4,5],
                    backgroundColor: 'rgba(233, 224, 92, 0.2)'
                },
                {
                    label: 'no 2',
                    data: [5,4,3,2,1],
                    backgroundColor: 'rgba(70, 70, 11, 0.2)'
                },
                {
                    label: 'both',
                    data: [1,4,1,2,1],
                    backgroundColor: 'rgba(200, 150, 11, 0.2)'
                }]
            },
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

    componentDidMount = () => {
        this.getDataFromService()
    }

    getDataFromService = () => {
        this.props.getDiaperGraphData(this.props.token, this.props.currentChild)
    }

    render() {
        return (
            <div className="col-md-6">
                <h3>chart</h3>
                <Bar data={this.state.data} options={this.state.options} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaperChart);