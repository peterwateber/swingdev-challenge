import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Layout from './layout';
import Contents from './contents';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Layout>
                    <div className="container">
                        <Contents />
                    </div>
                </Layout>
            </Provider>
        );
    }
}

//const mapStateToProps = state => state;
export default Main;
