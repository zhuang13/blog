import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'app/actions/index.js'

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)