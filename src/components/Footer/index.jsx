import React from 'react'
import connect from 'utils/connect.js'
import './style.scss'

class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                © 2017 zhuang13.me, powered by zhuang
            </footer>
        )
    }
}

export default connect(Footer)