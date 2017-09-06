import React from 'react'
import connect from 'utils/connect.js'

 class Bundle extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            comp: null
        }
    }

    componentWillMount() {
        this.props.load((comp) => {
            this.setState({
                comp: comp.default
            })
        })
    }

    render() {
        return this.state.comp ? <this.state.comp {...this.props} /> : this.props.loadingComp
    }
}

export default connect(Bundle)