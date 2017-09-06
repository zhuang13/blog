import React from 'react'
import { Route, Link } from 'react-router-dom'
import connect from 'utils/connect.js'
import './style.scss'

class ArticlesItem extends React.Component {

    render() {
        const item = this.props.item;
        return (
            <article className="article-intro">
                <h2 className="article-title"> 
                    {
                        item.from ?
                            <a href={item.url} target="_blank">{item.title}</a> 
                            : <Link to={item.url}>{item.title}</Link>
                    }
                </h2>
                <blockquote className="article-from">
                   { item.from ? `from ${item.from}` : '原创' } 
                </blockquote>
                <p className="article-p">
                    {item.desc}
                </p>
            </article>
        )
    }
}

export default connect(ArticlesItem)