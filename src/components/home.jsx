import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Summary from './summary'

const mapStateToProps = (state) => {
    return {
        children: state.entities.children,
        isAuthenticated: state.authentication.isAuthenticated,
        user: state.authentication.user,
        token: state.authentication.auth.token
    }
};

class Home extends React.Component {
    render() {
        if (this.props.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Welcome {this.props.user.name}</h3>
                        </div>
                    </div>
                    <div className="row">
                    <Summary/>
                        <div className="col-md-6">
                            <p>Welcome to GoParent, a site dedicated to helping you gather and make decisions based off information about your kiddos!</p>
                            <p>We help you track three major events in your child's day.  <strong>Feeding</strong> is for when your child eats, you can 
                            record both main kinds, bottle and breast feeding.  <strong>Sleep</strong> is for tracking how your kid is sleeping, and lets 
                            you know if there are any major changes.  <strong>Diapers</strong> helps you to track what and when.  More help can be found 
                            on each function.</p>
                            <p>This page, the summary, helps you to get a 24 hour glimpse into what is going on with your kid(s). </p>
                            <p>We support multiple kids, remember to select which one you want to enter data for on the top menu, under <strong>children</strong>.</p>
                        </div>
                    </div>
                </div>  
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default connect(mapStateToProps)(Home);

