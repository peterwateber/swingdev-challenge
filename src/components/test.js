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
            payload: process.env.REACT_APP_FLICKR_API_KEY
        });
        
    }
    render() {
        const farmId=2, server='1949', photoId='44696912084', secret='c095103430';
        const imageSrc = {
            small: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_s.jpg`,
            medium: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_m.jpg`
        }
        return (
            <div>
                <h1>
                    {this.props.test.aw}
                </h1>
                
                <img src={imageSrc.small}/>
                <img src={imageSrc.medium}/>
                <div>
                    <button onClick={this.onClick}>Update</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Test);
