import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import './css/loader.css';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <Loader type="Triangle" color="#000" height={80} width={80} />
                Loading...
            </div>
        );
    }
}
