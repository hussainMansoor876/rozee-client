import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../Components/Login/Login';
import { connect } from 'react-redux'
import SessionStorageManager from './SessionStorageManager';

import Dashboard from '../Components/Dashboard/Dashboard'
import AllJobs from '../Components/AllJobs/Alljobs'
import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => isLoggedIn === true ? (
                <Component {...props} />
            ) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
            }
        />
    );
}


class Routes extends Component {

    state = {
        isLoggedIn: false,
        user: null,
    }

    UNSAFE_componentWillMount() {
        const user = SessionStorageManager.getUser();
        if (user) {
            this.setState({ isLoggedIn: true, user })
        }
    }


    render() {
        const user = SessionStorageManager.getUser();


        return (
            <Router>

                {user && <React.Fragment>
                    <Header user={this.state.user} />
                    <Navbar />
                </React.Fragment>}



                <Switch>
                    <Route path="/" exact component={Login} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/alljobs" component={AllJobs} />

                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(Routes)

