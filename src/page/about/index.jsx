import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import MarkDown from 'components/Markdown/index.jsx'
import './style.scss'


class About extends React.Component {

    constructor(props) {
        super(props)

        this.props.actions.fetchArticle('about')
    }

    render() {
        return this.props.articles.article ? <MarkDown markdown={this.props.articles.article} /> : null
    }
}

export default connect(About)