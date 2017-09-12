import React from 'react'
import { Route } from 'react-router-dom'
import connect from 'utils/connect.js'
import MarkDown from 'components/Markdown/index.jsx'
import './style.scss'

class Article extends React.Component {

    constructor(props) {
        super(props)

        let { id } = this.props.match.params
        this.props.actions.fetchArticle(id)
    }

    componentWillUnmount() {
        this.props.actions.resetArticle();
    }

    render() {
        return this.props.articles.article.markdown ? <MarkDown markdown={this.props.articles.article.markdown} /> : null
    }
}

export default connect(Article)