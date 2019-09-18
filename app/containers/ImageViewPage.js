// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageViewActions from '../actions/imageview';
import ImageView from '../components/ImageView';

function mapStateToProps(state) {
  return {
    imageview: state.imageview.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ImageViewActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageView);