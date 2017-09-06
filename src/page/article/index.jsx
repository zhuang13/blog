import React from 'react'
import { Route } from 'react-router-dom'
import connect from 'utils/connect.js'
import marked from 'marked';
import './style.scss'

class Article extends React.Component {

    constructor(props) {
        super(props)

        let { id } = this.props.match.params
        this.props.actions.fetchArticle(id)
    }

    render() {
        if (!this.props.articles.article) {
            return null
        }
        return (
            <div className="article" dangerouslySetInnerHTML={{__html: marked(this.props.articles.article)}}>
            </div>
        )
    }
}

export default connect(Article)