import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_NAME } from '../store/constants';

class Test extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.dispatch({
            type: UPDATE_NAME,
            payload: 'World'
        });
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>
                    {this.props.test.aw}
                    <button onClick={this.onClick}>Update</button>
                </h1>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Test);
