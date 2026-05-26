import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // hoặc 'react-router' tùy phiên bản của bạn

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        // Nếu URL (pathname) thay đổi, cuộn lên đầu trang ngay lập tức
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);