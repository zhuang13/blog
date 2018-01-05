import React from 'react'
import connect from 'utils/connect.js'
import Css from 'utils/css.jsx'
import cssCode from './style.scss'

class Loading extends React.Component {

    render() {
        return (
            <div className="loading">
                <Css cssCode={cssCode} />
                <div className="loading-icon"></div>
            </div>
        )
    }
}

export default connect(Loading)