import { Component } from 'react';

import { fetchRequested } from '../store/actions';

export default class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnWidth: ''
        };
        this.loadMore = this.loadMore.bind(this);
        this.currentPage = 1;
        this.userId = '';
        this.handleResize = this.handleResize.bind(this);
    }
    loadMore() {
        try {
            const totalPage = this.props.photos.photos.pages;
            if (
                !this.props.loading &&
                !this.props.error &&
                totalPage !== this.currentPage
            ) {
                this.currentPage++;
                this.props.dispatch(
                    fetchRequested({
                        page: this.currentPage,
                        perPage: 5,
                        userId: this.userId
                    })
                );
            }
        } catch (ex) {}
    }

    handleResize() {
        const width = window.outerWidth;
        let columnWidth = '50%';
        if (width > 567) {
            columnWidth = '33.3%';
        }
        if (width > 768) {
            columnWidth = '25%';
        }
        this.setState({
            columnWidth: columnWidth
        });
    }

    componentDidUpdate() {
        try {
            if (!this.props.loading) {
                window.grid.updateLayout();
            }
        } catch (ex) { }
    }
}
