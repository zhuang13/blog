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

    render() {
        return this.props.articles.article ? <MarkDown markdown={this.props.articles.article} /> : null
    }
}

export default connect(Article)