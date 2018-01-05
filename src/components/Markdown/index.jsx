import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import marked from 'marked'
import Css from 'utils/css.jsx'
import cssCode from './style.scss'

class Markdown extends React.Component {

    render() {

        return (
            <div>
                <Css cssCode={cssCode} />
                <div className="markdown" dangerouslySetInnerHTML={{__html: marked(this.props.markdown)}}>
                </div>
            </div>
        )
    }
}

export default connect(Markdown)
