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
            data: {}
        }

        this.massageData = this.massageData.bind(this)
    }

    massageData = () => {
        var foo = this.props.diaper.allIDs.filter((id) => {
            if (this.props.diaper.byID[id].childid === this.props.currentChild) {
                return this.props.diaper.byID[id].wasteType
            }
        })
        console.log(foo)
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