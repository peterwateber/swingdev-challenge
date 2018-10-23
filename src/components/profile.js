import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StackGrid from 'react-stack-grid';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './card';
import Common from './class.common';
import { fetchRequested } from '../store/actions';

import './css/content.css';

class Contents extends Common {

    componentDidMount() {
        try {
            this.userId = window.location.pathname.substr(1).split('/')[1];
            this.props.dispatch(
                fetchRequested({
                    onLoad: true,
                    page: this.currentPage,
                    userId: this.userId
                })
            );
        } catch (ex) {}
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    UNSAFE_componentWillMount() {
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    cardsDisplay(photos) {
        try {
            return photos.map((card, index) => (
                <Card key={index} info={card} />
            ));
        } catch (ex) {
            return [];
        }
    }

    render() {
        /**
         * DO CALCULATION IN render INSTEAD OF componentDidMount().
         * since setState() calls componentDidMount() and re-render
         */
        let cards = [];
        let totalPage = 0;
        let photo = [];
        try {
            photo = this.props.photos.photos.photo;
            cards = this.cardsDisplay(photo);
            totalPage = this.props.photos.photos.pages;
        } catch (ex) {}
        return (
            <div className="container ifinite-scroller">
                {this.props.loading && (
                    <div className="loading">Loading some more...</div>
                )}
                {this.props.error && (
                    <div className="alert alert-warning">
                        {this.props.error}
                    </div>
                )}
                {!this.props.error && !this.props.loading && !photo.length && (
                    <div className="alert alert-success">
                        No results found for <strong>{this.props.search}</strong>
                    </div>
                )}
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={this.loadMore}
                    hasMore={totalPage !== this.currentPage}>
                    <StackGrid
                        monitorImagesLoaded={true}
                        columnWidth={this.state.columnWidth}
                        duration={0}
                        gridRef={grid => {
                            window.grid = grid;
                        }}>
                        {cards}
                    </StackGrid>
                </InfiniteScroll>
            </div>
        );
    }
}

Contents.propTypes = {
    photos: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => {
    const { search, photos, error, loading } = state.store;
    return {
        search,
        photos,
        error,
        loading
    };
};

export default connect(mapStateToProps)(Contents);
