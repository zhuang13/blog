import React from 'react'
import { Route } from 'react-router-dom'
import connect from 'utils/connect.js'
import MarkDown from 'components/Markdown/index.jsx'
import Loading from 'components/Loading/index.jsx'
// import './style.scss'

class Article extends React.Component {

    constructor(props) {
        super(props)

        let { id } = this.props.match.params
        let { article } = this.props.articles;

        ( !article.id || article.id != id ) &&
            this.props.actions.fetchArticle(id)
    }

    componentWillUnmount() {
        this.props.actions.resetArticle();
    }

    render() {
        const markdown = this.props.articles.article.markdown
        return ( markdown ? <MarkDown markdown={this.props.articles.article.markdown} /> 
            : <Loading />)
    }
}

export default connect(Article)