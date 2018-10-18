import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Test from './test';

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <Test />
            </Provider>
        );
    }
}

//const mapStateToProps = state => state;
export default Main;
