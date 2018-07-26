import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WeatherBox extends Component {

    constructor() {
        super();
    }

    render() {
        let iconClass = "ion";
        if (this.props.iconClass) {
            iconClass += ' ' + this.props.iconClass;
        }
        let bgColorClass = "info-box-icon";
        if (this.props.bgColorClass) {
            bgColorClass += ' ' + this.props.bgColorClass;
        } else {
            bgColorClass += ' bg-aqua';
        }

        return (
            <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                    <span className={bgColorClass}><i className={iconClass}/></span>

                    <div className="info-box-content">
                        <span className="info-box-text">{this.props.title}</span>
                        <span className="info-box-number">{this.props.value}</span>
                    </div>
                </div>
            </div>
        );
    }
}

WeatherBox.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    iconClass: PropTypes.string,
    bgColorClass: PropTypes.string
};
export default WeatherBox;