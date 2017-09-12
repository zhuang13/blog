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

    componentWillUnmount() {
        this.props.actions.resetArticle();
    }

    render() {
        return this.props.articles.article.markdown ? <MarkDown markdown={this.props.articles.article.markdown} /> : null
    }
}

export default connect(About)