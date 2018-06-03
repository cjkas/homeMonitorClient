import React, {Component} from 'react';
import './App.css';
import {IntlProvider} from 'react-intl';
import SimpleLoadingBar from 'react-simple-loading-bar'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Weather from './Weather';
import WeatherCharts from './WeatherCharts';
import fetchIntercept from 'fetch-intercept';
import Error from "./Error";

class App extends Component {

    constructor() {
        super();
        this.state = {activeRequests: 0};
        const unregister = fetchIntercept.register({
            request:  (url, config) => {
                // Modify the url or config here
                this.setState({activeRequests: this.state.activeRequests + 1});
                console.log("req");
                return [url, config];
            },

            requestError: (error) => {
                // Called when an error occured during another 'request' interceptor call
                this.setState({activeRequests: this.state.activeRequests - 1, error: error.stack});
                console.log("req err");
                return Promise.reject(error);
            },

            response: (response) => {
                // Modify the reponse object
                this.setState({activeRequests: this.state.activeRequests - 1});
                console.log("resp ");
                return response;
            },

            responseError: (error) => {
                // Handle an fetch error
                this.setState({activeRequests: this.state.activeRequests - 1, error: error.stack});
                console.log("resp err");
                return Promise.reject(error);
            }
        });

    }

    render() {
        return (
            <IntlProvider locale="en">
                <div className="wrapper">
                    {/* Main Header */}
                    <header className="main-header">

                        {/* Logo */}
                        <a href="index.html" className="logo">
                            {/* mini logo for sidebar mini 50x50 pixels */}
                            <span className="logo-mini"><b>H</b>MON</span>
                            {/* logo for regular state and mobile devices */}
                            <span className="logo-lg"><b>Home</b>MONITOR</span>
                        </a>

                        {/* Header Navbar: style can be found in header.less */}
                        <nav className="navbar navbar-static-top" role="navigation">
                            {/* Sidebar toggle button*/}
                            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    {/* User Account: style can be found in dropdown.less */}
                                    <li className="dropdown user user-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            <img src="https://developers.google.com/experts/img/user/user-default.png"
                                                 className="user-image" alt="User Image"/>
                                            <span className="hidden-xs">Admin</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <Router>
                        <div>
                            {/* Left side column. contains the logo and sidebar */}
                            <aside className="main-sidebar">
                                {/* sidebar: style can be found in sidebar.less */}
                                <section className="sidebar" styles={{height: "auto"}}>
                                    {/* sidebar menu: : style can be found in sidebar.less */}
                                    <ul className="sidebar-menu">
                                        <li className="header">NAWIGACJA</li>
                                        <li className="treeview active">
                                            <a href="#">
                                                <i className="fa fa-dashboard"></i> <span>Stacja pogody</span> <i className="fa fa-angle-left pull-right"></i>
                                            </a>
                                            <ul className="treeview-menu menu-open" styles={{display: "block"}}>
                                                <li><Link to="/weather"><i className="fa fa-circle-o"></i> Ostatni odczyt</Link></li>
                                                <li><Link to="/weatherCharts"><i className="fa fa-circle-o"></i> Wykresy</Link></li>
                                            </ul>
                                        </li>
                                        <li className="treeview active">
                                            <a href="#">
                                                <i className="fa fa-gears"></i> <span>Administracja</span> <i className="fa fa-angle-left pull-right"></i>
                                            </a>
                                            <ul className="treeview-menu menu-open" styles={{display: "block"}}>
                                                <li><a href="/users"><i className="fa fa-circle-o"></i> Użytkownicy</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </section>
                                {/* /.sidebar */}
                            </aside>

                            {/* Content Wrapper. Contains page content */}
                            <div className="content-wrapper">
                                <Error error={this.state.error}/>
                                <SimpleLoadingBar activeRequests={this.state.activeRequests} color="red"></SimpleLoadingBar>
                                <Route exact path="/" component={Weather}/>
                                <Route path="/weather" component={Weather}/>
                                <Route path="/weatherCharts" component={WeatherCharts}/>
                            </div>
                        </div>
                    </Router>
                    {/* /.content-wrapper */}

                </div>
            </IntlProvider>
        );
    }
}

export default App;
