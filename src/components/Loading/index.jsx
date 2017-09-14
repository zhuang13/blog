import React from 'react'
import connect from 'utils/connect.js'
import './style.scss'

class Loading extends React.Component {

    render() {
        return (
            <div className="loading">
                <div className="loading-icon"></div>
            </div>
        )
    }
}

export default connect(Loading)