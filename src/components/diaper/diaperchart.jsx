import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        token: state.authentication.auth.token,
        diaper: state.entities.diaper,
        currentChild: state.settings.currentChild
    }
}

class DiaperChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            data: {
                counts: {
                    "no1": 0,
                    "no2": 0,
                    "both": 0
                }
            }
        }

        this.massageData = this.massageData.bind(this)
    }

    massageData = () => {
        var counts = {
            "no1": 0,
            "no2": 0,
            "both": 0
        }
        this.props.diaper.allIDs.forEach((id) => {
            if (this.props.diaper.byID[id].childid === this.props.currentChild) {
                switch (this.props.diaper.byID[id].wasteType) {
                    case 1:
                        counts["no1"]++
                        break;
                    case 2:
                        counts["no2"]++
                        break;
                    case 3:
                        counts["both"]++
                        break;
                    default:
                        break;
                }
            }
        })

        console.log(counts)
    }

    componentDidMount() {
        this.massageData()
    }

    render() {
        return (
            <div className="col-md-6">
                <h3>chart</h3>
            </div>
        )
    }
}

export default connect(mapStateToProps)(DiaperChart);