import React, {Component} from 'react';
import {FormattedNumber} from 'react-intl';
import Moment from "moment";
import {connect} from 'react-redux';
import WeatherBox from './WeatherBox';

class Weather extends Component {

    constructor() {
        super();
    }

    check() {
        const elapsed = new Date() - Moment(this.props.probe.created);
        this.setState({remaining: parseInt(600 - elapsed / 1000, 10)});
        if (this.state.remaining <= 0) {
            clearInterval(this.state.interval);
            this.fetchLast();
        }
    }

    fetchLast() {
        this.props.fetchData('https://hmb.sczaja.synology.me/weather/last');
        // this.setState({
        //     interval: setInterval(() => {
        //         this.check()
        //     }, 30000)
        // });
    }

    componentDidMount() {
        this.fetchLast();
    }

    componentWillUnmount() {
        // clearInterval(this.state.interval);
    }

    render() {
        Moment.locale('en');
        if (this.props.error) {
            return (<span>error</span>)
        }
        if (this.props.loading) {
            return (<span>loading</span>);
        }
        if (!this.props.probe) {
            return (<span>no data</span>);
        }
        return (
            <div>
                <section className="content-header">
                    <h1>Temperatura {Moment(this.props.probe.created).format('YYYY-MM-DD HH:mm:ss')} {this.props.remaining}</h1>
                </section>

                <section className="content">

                    <div className="row">
                        <WeatherBox title="Wiatr"
                                    iconClass="ion-flag"
                                    value={this.props.probe.windSpeed + " m/s"}/>
                        <WeatherBox title="Ciśnienie"
                                    iconClass="ion-ios-timer-outline"
                                    value={this.props.probe.pressure + " hPa"}/>

                        {/*fix for small devices only */}
                        <div className="clearfix visible-sm-block"/>

                        <WeatherBox title="Temperatura"
                                    iconClass="ion-thermometer"
                                    value={this.props.probe.tempExternal + " &deg;C"}/>
                        <WeatherBox title="Wilgotność %"
                                    iconClass="ion-waterdrop"
                                    value={this.props.probe.humidity + " %"}/>

                        <WeatherBox bgColorClass="bg-yellow" title="Temperatura bateri %"
                                    iconClass="ion-thermometer"
                                    value={this.props.probe.tempBattery + " &deg;C"}/>
                        <WeatherBox bgColorClass="bg-yellow" title="Napięcie baterii / Procent naładowania"
                                    iconClass="ion-battery-low"
                                    value={this.props.probe.batteryVoltage + ' V / ' + (((this.props.probe.batteryVoltage - 3.3) / (4.2 - 3.3)) * 100) + ' %'}/>

                    </div>

                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        probe: state.probe,
        error: state.error,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch({type: "FETCH_WEATHER"})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Weather);