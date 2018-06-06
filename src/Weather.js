import React, {Component} from 'react';
import {FormattedNumber} from 'react-intl';
import Moment from "moment";

class Weather extends Component {

    constructor() {
        super();
        this.state = {
            probe: {
                created: new Date(),
                windSpeed: 0,
                pressure: 0,
                tempExternal: 0,
                humidity: 0,
                tempBattery: 0,
                batteryVoltage: 0
            },
            remaining: 0
        };
    }

    check() {
        const elapsed = new Date() - Moment(this.state.probe.created);
        this.setState({remaining: parseInt(600 - elapsed / 1000, 10)});
        if (this.state.remaining <= 0) {
            clearInterval(this.state.interval);
            this.fetchLast();
        }
    }

    fetchLast() {
        const URL = "https://hmb.sczaja.synology.me";
        const REST_SERVICE_URI = URL + '/weather';
        fetch(REST_SERVICE_URI + "/last")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    probe: data, interval: setInterval(() => {
                        this.check()
                    }, 1000)
                });
            });
    }

    componentDidMount() {
        this.fetchLast();
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        Moment.locale('en');
        return (
            <div>
                <section className="content-header">
                    <h1>Temperatura {Moment(this.state.probe.created).format('YYYY-MM-DD HH:mm:ss')} {this.state.remaining}</h1>
                </section>

                <section className="content">
                    {/*Main content */}

                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-aqua"><i className="ion ion-flag"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Wiatr</span> <span
                                    className="info-box-number">{this.state.probe.windSpeed}
                                    <small>m/s</small></span>
                                </div>
                                {/*/.info-box-content */}
                            </div>
                            {/*/.info-box */}
                        </div>
                        {/*/.col */}
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                            <span className="info-box-icon bg-aqua"><i
                                className="ion ion-ios-timer-outline"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Ciśnienie</span> <span
                                    className="info-box-number">{this.state.probe.pressure}
                                    <small>hPa</small></span>
                                </div>
                                {/*/.info-box-content */}
                            </div>
                            {/*/.info-box */}
                        </div>
                        {/*/.col */}

                        {/*fix for small devices only */}
                        <div className="clearfix visible-sm-block"></div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                            <span className="info-box-icon bg-aqua"><i
                                className="ion ion-thermometer"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Temperatura</span> <span
                                    className="info-box-number">{this.state.probe.tempExternal}
                                    <small>&deg;C</small></span>
                                </div>
                                {/*/.info-box-content */}
                            </div>
                            {/*/.info-box */}
                        </div>
                        {/*/.col */}
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                            <span className="info-box-icon bg-aqua"><i
                                className="ion ion-waterdrop"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Wilgotność %</span> <span
                                    className="info-box-number">{this.state.probe.humidity}
                                    <small>%</small></span>
                                </div>
                                {/*/.info-box-content */}
                            </div>
                            {/*/.info-box */}
                        </div>
                        {/*/.col */}
                        {/*/.col */}
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                            <span className="info-box-icon bg-yellow"><i
                                className="ion ion-thermometer"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Temperatura baterii</span> <span
                                    className="info-box-number">{this.state.probe.tempBattery}
                                    <small>&deg;C</small></span>
                                </div>
                                {/*/.info-box-content */}
                            </div>
                            {/*/.info-box */}
                        </div>
                        {/*/.col */}
                        {/*/.col */}
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                            <span className="info-box-icon bg-yellow"><i
                                className="ion ion-battery-low"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Napięcie baterii / Procent naładowania</span> <span
                                    className="info-box-number">{this.state.probe.batteryVoltage}
                                    <small>V / <FormattedNumber value={((this.state.probe.batteryVoltage - 3.3) / (4.2 - 3.3)) * 100}/> %</small></span>
                                </div>
                                {/*/.info-box-content */}
                            </div>
                            {/*/.info-box */}
                        </div>
                        {/*/.col */}
                    </div>

                    {/*Your Page Content Here */}

                </section>
            </div>
        );
    }
}

export default Weather;