import React, { Component } from 'react';

import Moment from 'react-moment';
import Img from 'react-image';
import Link from 'react-router-dom/Link';

import './css/cards.css';

export default class Card extends Component {
    render() {
        const info = this.props.info;
        const farmId = info.farm,
            server = info.server,
            photoId = info.id,
            ownerName = info.ownername,
            secret = info.secret,
            nsid = info.owner,
            title = info.title || '',
            datePosted = info.datetaken, //new Date(info.dateposted || '').toISOString(),
            description = info.description._content;
        const photoSrc = {
            small: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_s.jpg`,
            medium: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_m.jpg`,
            large: `https://farm${farmId}.staticflickr.com/${server}/${photoId}_${secret}_b.jpg`
        };
        //const { iconfarm, iconserver, nsid } = this.props.info.user; //this.props.userInfo;
        //const userImgSrc = `http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`;
        const userImgSrc = `http://flickr.com/buddyicons/${nsid}.jpg`;
        return (
            <div className="card-holder">
                <div className="card" data-card={photoId}>
                    <div className="card-header">
                        <img
                            title={ownerName}
                            alt={ownerName}
                            src={userImgSrc}
                        />
                        <div className="name-area">
                            <Link
                                to={'/profile/'.concat(nsid)}
                                className="name">
                                <strong title={ownerName}>{ownerName}</strong>
                            </Link>
                            <small className="text-muted card-time">
                                <Moment
                                    fromNow
                                    withTitle
                                    titleFormat="D MMM YYYY hh:mm A">
                                    {datePosted}
                                </Moment>
                            </small>
                        </div>
                    </div>
                    <div className="text-center card-img-wrapper">
                        <Img
                            className="card-img-top"
                            src={photoSrc.large}
                            loader={
                                <div className="card-img-loader">
                                    <div className="card-img-loader-circle" />
                                    Loading...
                                </div>
                            }
                        />
                        <div className="card-body">
                            <h6
                                title={title}
                                className="card-subtitle mb-1">
                                {title.substr(0, 25)}
                            </h6>
                            <div className="card-text">
                                {description.substr(0, 150)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
