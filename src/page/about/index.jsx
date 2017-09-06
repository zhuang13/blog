import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import './style.scss'


class About extends React.Component {

    render() {
        return (
            <div className="about">
                this is zhuang's blog.
            </div>
        )
    }
}

export default connect(About)