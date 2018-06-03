import React, {Component} from 'react';
import AmCharts from '@amcharts/amcharts3-react';

function generateData() {
    var firstDate = new Date();

    var dataProvider = [];

    for (var i = 0; i < 100; ++i) {
        var date = new Date(firstDate.getTime());

        date.setDate(i);

        dataProvider.push({
            date: date,
            value: Math.floor(Math.random() * 100)
        });
    }

    return dataProvider;
}

export default class WeatherCharts extends Component {

    constructor() {
        super();
        this.state = {
            probes: 100,
            title: '',
            type: '',
            dataProvider: []
        };

    }

    filter(type) {
        const URL = "http://192.168.0.33:8080";
        const REST_SERVICE_URI = URL + '/weather';
        fetch(REST_SERVICE_URI + "/filter/" + type + "/" + this.state.probes)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    dataProvider: data
                });
            });
    }

    load(type, title) {
        this.setState({type: type, title: title});
        this.filter(type);
    }

    handleProbesChange = (e) => {
        this.setState({probes: e.target.value});
    }

    componentDidMount() {
        this.load('tempExt', 'Temperatura');
    }

    render() {
        const config = {
            type: "serial",
            theme: "light",
            marginRight: 80,
            valueAxes: [{
                position: "left",
                title: this.state.title
            }],
            graphs: [{
                id: "g1",
                fillAlphas: 0.4,
                valueField: "value",
                balloonText: "<div style='margin:5px; font-size:19px;'><b>[[value]]</b></div>"
            }],
            chartScrollbar: {
                graph: "g1",
                scrollbarHeight: 80,
                backgroundAlpha: 0,
                selectedBackgroundAlpha: 0.1,
                selectedBackgroundColor: "#888888",
                graphFillAlpha: 0,
                graphLineAlpha: 0.5,
                selectedGraphFillAlpha: 0,
                selectedGraphLineAlpha: 1,
                autoGridCount: true,
                color: "#AAAAAA"
            },
            chartCursor: {
                categoryBalloonDateFormat: "JJ:NN, DD/MM",
                cursorPosition: "mouse"
            },
            categoryField: "date",
            categoryAxis: {
                minPeriod: "mm",
                parseDates: true
            },
            export: {
                enabled: true
            },
            dataProvider: this.state.dataProvider
        };

        return (<div>
            <section className="content-header">
                <h1>
                    Stacja pogody wykresy
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-group">
                            <div className="col-sm-9">
                                <button type="button" className="btn btn-primary" onClick={() => this.load('wind', 'Wiatr')}>Wiatr</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.load('pressure', 'Ciśnienie')}>Ciśnienie</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.load('tempExt', 'Temperatura')}>Temperatura</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.load('humidity', 'Wilgotność')}>Wilgotność</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.load('tempBat', 'Temperatura baterii')}>Temperatura baterii</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.load('batVol', 'Napięcie baterii')}>Napięcie baterii</button>
                            </div>
                            <div className="col-sm-1" styles={{'line-height': '30px'}}>
                                <label htmlFor="size">Probes</label>
                            </div>
                            <div className="col-sm-2">
                                <input value={this.state.probes} onChange={this.handleProbesChange} type="number" min="0" step="100" id="size" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title"> {this.state.title}</h3>
                            </div>
                            <div className="box-body">
                                <div className="chart">
                                    <div styles={{height: '500px'}}>
                                        <AmCharts.React style={{width: '100%', height: '500px'}} options={config}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>);
    }

}