import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Layout from './layout';

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout></Layout>
            </Provider>
        );
    }
}

//const mapStateToProps = state => state;
export default Main;
