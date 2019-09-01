import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../Components/Login/Login';
import Home from '../Components/Home/Home'
import { connect } from 'react-redux'
import SessionStorageManager from './SessionStorageManager';


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
        isLoggedIn: false
    }

    UNSAFE_componentWillMount() {
        const user = SessionStorageManager.getUser();
        if (user) {
            this.setState({ isLoggedIn: true })
        }
    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/dashboard" component={Home} />
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

