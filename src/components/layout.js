import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Contents from './contents';

import { fetchRequested } from '../store/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/layout.css';
import Profile from './profile';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            search: ''
        };
        this.toggle = this.toggle.bind(this);
        this.sort = this.sort.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    sort(sort) {
        if (!this.props.error && !this.props.loading) {
            try {
                this.userId = window.location.pathname.substr(1).split('/')[1];
            } catch (ex) {
                this.userId = '';
            }
            this.props.dispatch(
                fetchRequested({
                    onLoad: true,
                    page: 1,
                    sort: sort,
                    userId: this.userId
                })
            );
        }
    }
    onSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
            this.props.dispatch(
                fetchRequested({
                    onLoad: true,
                    page: 1,
                    search: this.state.search
                })
            );
        }, 200);
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({
            search: value
        });
    }
    render() {
        return (
            <Router>
                <div>
                    <div className="header d-flex flex-column flex-md-row align-items-center justify-content-between p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                        <h5 className="font-weight-normal project">
                            <Link to="/">Dogstagram</Link>
                        </h5>
                        <nav className="filter-area">
                            <form
                                onSubmit={this.onSubmit}
                                className="form-inline">
                                <input
                                    readOnly={this.props.loading}
                                    className="form-control mr-sm-2"
                                    type="text"
                                    name="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={this.state.search}
                                    onChange={this.handleChange}
                                />
                                <button
                                    className="btn btn-outline-success ml-2"
                                    type="submit">
                                    Search
                                </button>
                                <button
                                    disabled={this.props.loading}
                                    onClick={() => this.sort('date-taken-desc')}
                                    type="button"
                                    className="btn btn-link">
                                    Most Recent
                                </button>
                                <button
                                    disabled={this.props.loading}
                                    onClick={() => this.sort('date-taken-asc')}
                                    type="button"
                                    className="btn btn-link">
                                    Older
                                </button>
                            </form>
                        </nav>
                    </div>
                    <Route path="/" exact component={Contents} />
                    <Route path="/profile/" component={Profile} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = ({ store }) => ({
    photos: store.photos,
    loading: store.loading
});

export default connect(mapStateToProps)(Layout);
