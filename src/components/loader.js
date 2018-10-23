import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import './css/loader.css';


class Loading extends Component {
    render() {
        return (
            <div className="loading">
                {this.props.hideImage && <Loader type="Triangle" color="#000" height={80} width={80} />}
                Loading...
            </div>
        );
    }
}

Loading.propTypes = {
    hideImage: PropTypes.bool
};

export default Loading;