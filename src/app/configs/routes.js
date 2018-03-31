const routes = [
    { 
        path: '/',
        name: 'Articles',
        src: 'page/articles/index.jsx',
        exact: true,
        initStore: 'articles'
    },
    {
        path: '/about',
        name: 'About',
        src: 'page/about/index.jsx',
        initStore: 'about'
    },
    {
        path: '/article/:id',
        name: 'Article',
        src: 'page/article/index.jsx',
        initStore: 'article'
    }
]

export default routes