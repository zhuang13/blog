import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import MarkDown from 'components/Markdown/index.jsx'
import Loading from 'components/Loading/index.jsx'
// import './style.scss'


class About extends React.Component {

    constructor(props) {
        super(props)

        let { article } = this.props.articles;

        ( !article.id || article.id != 'about' ) &&
            this.props.actions.fetchArticle('about')
    }

    componentWillUnmount() {
        this.props.actions.resetArticle();
    }

    render() {
        return this.props.articles.article.markdown ? 
            <MarkDown markdown={this.props.articles.article.markdown} /> 
            : <Loading />
    }
}

export default connect(About)