const routes = [
    { 
        path: '/',
        name: 'Articles',
        src: './articles/index.jsx',
        exact: true,
        initStore: 'articles'
    },
    {
        path: '/about',
        name: 'About',
        src: './about/index.jsx',
        initStore: 'about'
    },
    {
        path: '/article/:id',
        name: 'Article',
        src: './article/index.jsx',
        initStore: 'article'
    }
]

export default routes