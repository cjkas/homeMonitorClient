import React, {Component} from 'react';

class Error extends Component {

    render() {
        if (!!this.props.error) {
            return (<span className="alert alert-danger" role="alert">{this.props.error}</span>);
        } else {
            return null;
        }
    }
}

export default Error;