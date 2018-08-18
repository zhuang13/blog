import React from 'react'
import connect from 'utils/connect.js'
import Css from 'utils/css.jsx'
import cssCode from './style.scss'

class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <Css cssCode={cssCode} />
                © 2018 zhuang13.me, powered by zhuang13
            </footer>
        )
    }
}

export default connect(Footer)