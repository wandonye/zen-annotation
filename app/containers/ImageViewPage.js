// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageViewActions from '../actions/imageview';
import ImageView from '../components/ImageView';

function mapStateToProps(state) {
  const imageview = state.imageview.toJS();
  const pathTokens = state.router.location.pathname.split('/');
  
  return {
    imageview,
    annotations: state.albums.find(item => item.id === pathTokens[pathTokens.length - 2]).images[imageview.index].annotations
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ImageViewActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageView);