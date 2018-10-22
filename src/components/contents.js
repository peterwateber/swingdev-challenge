import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from './card';
import Loader from './loader';
import { fetchFlickrPhotos } from '../store/actions/flickrActions';
import { FETCH_FLICKR_LOADED } from '../store/constants';

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            showCards: 'd-none',
            indexesOfImagesLoaded: []
        };
        this.props.dispatch(fetchFlickrPhotos());
        this.checkTotalLoadedImages = this.checkTotalLoadedImages.bind(this);
    }
    componentDidMount() {
        this.showCards();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                loading: nextProps.loading,
                error: nextProps.error
            });
        }
    }

    /**
     *
     * @param integer imageLoadedIndex
     * Where:
     *      this.props.photos.photos.photo = [] //array of photos
     *      imageLoadedIndex = index of the image loaded
     * Then:
     */
    checkTotalLoadedImages(imageLoadedIndex) {
        this.state.indexesOfImagesLoaded.push(imageLoadedIndex);
        this.setState({
            indexesOfImagesLoaded: this.state.indexesOfImagesLoaded
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        const error = nextState.error || '';
        return this.props.photos.length !== nextProps.photos.length || error.length > 0;
    }
    cardsDisplay(photos) {
        const arrayOfPhotos = photos || [];
        const arrayOfCards = arrayOfPhotos.map((card, index) => (
            <Card
                checkTotalLoadedImages={this.checkTotalLoadedImages}
                photoIndex={index + 1}
                key={index}
                info={card}
            />
        ));
        return arrayOfCards;
    }
    showCards() {
        const expectedTotalPhotos = this.props.photos['photos']
            ? this.props.photos['photos'].photo.length
            : 0;
        if (this.state.indexesOfImagesLoaded.length === expectedTotalPhotos) {
            this.props.dispatch({
                type: FETCH_FLICKR_LOADED
            });
            this.setState({
                showCards: 'd-block',
                loading: false
            });
        }
    }
    render() {
        const photos = this.props.photos['photos']
            ? this.props.photos['photos'].photo
            : false;
        const cardsDisplay = this.cardsDisplay(photos);
        return (
            <div className="row">
                {this.state.loading && <Loader />}
                {this.state.error && (
                    <div className="alert alert-warning">
                        {this.state.error}
                    </div>
                )}
                <div className={this.state.showCards.concat(' card-flex')}>
                    {cardsDisplay}
                </div>
            </div>
        );
    }
}

Contents.propTypes = {
    photos: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => {
    const { photos, error, loading } = state.photos;
    return {
        photos,
        error,
        loading
    };
};

export default connect(mapStateToProps)(Contents);
