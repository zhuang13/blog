import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import Css from 'utils/css.jsx'
import cssCode from './style.scss'

class ArticleItem extends React.Component {

    render() {
        const item = this.props.item;
        return (
            <article className="article-intro">
                <Css cssCode={cssCode} />
                <h2 className="article-title"> 
                    {
                        item.from ?
                            <a href={item.url} target="_blank">{item.title}</a> 
                            : <Link to={item.url}>{item.title}</Link>
                    }
                </h2>
                {
                    !!item.tags && item.tags.map((tag) => 
                        <span className="article-tag" key={tag}>{tag}</span>
                    )
                }
                {
                    !!item.from &&
                        <blockquote className="article-from">
                            from {item.from}
                        </blockquote>
                }
                <p className="article-p">
                    {item.desc}
                </p>
            </article>
        )
    }
}

export default connect(ArticleItem)
