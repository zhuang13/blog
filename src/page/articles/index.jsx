import React from 'react'
import connect from 'utils/connect.js'
import './style.scss'

import ArticleItem from 'components/ArticleItem/index.jsx'

class Articles extends React.Component {

    constructor(props) {
        super(props)

        !this.props.articles.list 
            && this.props.actions.fetchArticles()
    }

    render() {
        const { list } = this.props.articles;

        return (
            <section className="articles">
                {
                    list && list.map((item, i) => 
                        <ArticleItem key={i} item={item} />
                    )
                }
            </section>
        )
    }
}

export default connect(Articles)