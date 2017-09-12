import React from 'react'
import connect from 'utils/connect.js'
import './style.scss'

class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                © 2017 zhuangbob.com, powered by zhuang13 
            </footer>
        )
    }
}

export default connect(Footer)