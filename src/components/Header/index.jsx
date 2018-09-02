import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import Css from 'utils/css.jsx'
import cssCode from './style.scss'

class Header extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }

    changePage(nav) {
        let currentNav = nav == 'about' ? nav : 'blog'
        this.props.actions.changeCurrentNav(currentNav);
        this.context.router.history.push('/'+nav)
    }

    render() {
        let currentNav = this.props.nav.current;
        let navClass = {};
        navClass[currentNav] = 'select';
        return (
            <header className="header">
                <Css cssCode={cssCode} />
                <a className="header-gohome">
                    <div className="header-logo logo1">Z</div>
                    <div className="header-logo logo2"></div>
                    <div className="header-logo logo3"></div>
                </a>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <li className="header-nav-item"><a onClick={this.changePage.bind(this, '')} className={navClass.blog}>BLOG</a></li>
                        <li className="header-nav-item"><a onClick={this.changePage.bind(this, 'about')} className={navClass.about}>ABOUT</a></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default connect(Header)