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
                        item.source ?
                            <a href={item.url} target="_blank">{item.title}</a> 
                            : <Link to={item.url}>{item.title}</Link>
                    }
                </h2>
                {
                    !!item.tags && item.tags.map((tag) => 
                        <span className="article-tag" key={tag.id}>{tag.name}</span>
                    )
                }
                {
                    !!item.source &&
                        <blockquote className="article-from">
                            from {item.source}
                        </blockquote>
                }
                <p className="article-p">
                    {item.description}
                </p>
            </article>
        )
    }
}

export default connect(ArticleItem)
