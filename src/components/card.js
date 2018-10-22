import React, { Component } from 'react';

import './css/cards.css';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalImageLoaded: 0
        };
        this.loadedImage = this.loadedImage.bind(this);
    }
    loadedImage() {
        this.props.checkTotalLoadedImages(this.props.photoIndex);
    }
    render() {
        const info = this.props.info;
        const farmId = info.farm,
            server = info.server,
            photoId = info.id,
            secret = info.secret;
        let imageSrc = {
            small: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_s.jpg`,
            medium: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_m.jpg`
        };
        return (
            <div className="card-holder">
                <div className="card" data-card={photoId}>
                    <div className="text-center preloader">
                        <img
                            className="card-img-top"
                            onLoad={this.loadedImage}
                            src={imageSrc.medium}
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title" />
                        <div className="card-text">{this.props.info.title}</div>
                        <small className="text-muted card-time">
                            Last updated 3 mins ago
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}
