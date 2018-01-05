import React from 'react'
import connect from 'utils/connect.js'

 class Css extends React.Component {

    render() {
        let cssCode = this.props.cssCode.replace(/\n/g, '').replace(/\"/g, '\\\"')
        return (
            <style dangerouslySetInnerHTML={{__html: cssCode}}></style>
        )
    }
}

export default connect(Css)