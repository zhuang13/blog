import React from 'react'
import PropTypes from 'prop-types'
import connect from 'utils/connect.js'
import './style.scss'

import img from 'assets/images/test.png'

class Header extends React.Component {

    render() {
        return (
            <footer className="footer">
                © 2017 zhuangbob.com, powered by zhuang13 
            </footer>
        )
    }
}

export default connect(Header)