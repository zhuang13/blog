import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import marked from 'marked'
import './style.scss'

class Markdown extends React.Component {

    render() {

        return (
            <div className="markdown" dangerouslySetInnerHTML={{__html: marked(this.props.markdown)}}>
            </div>
        )
    }
}

export default connect(Markdown)
