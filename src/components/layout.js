import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render() {
        return (
            <div className="container">
                <header className="blog-header py-3">
                    <div className="row flex-nowrap justify-content-between align-items-center">
                        <div className="col-4">
                            <a className="blog-header-logo text-dark" href="#">
                                Dogs
                            </a>
                        </div>
                    </div>
                </header>
                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex flex-row">
                        <a className="p-2 text-muted" href="#">
                            
                        </a>
                    </nav>
                </div>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Layout);
