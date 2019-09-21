// @flow
import React, { Component } from 'react';
import ReactList from 'react-list';
import styles from './Detail.scss';
import share from '../share_in_renderer';
import { setCurrentImage } from '../actions/imageview';

type Props = {
  match: {},
  location: {},
  history: {}
};

export default class Detail extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const { match } = this.props;
    const { id } = match.params;
    const { albums } = share.store.getState();

    this.id = id;
    this.album = albums.find(item => item.id === id);
    this.showImage = this.showImage.bind(this);
  }

  showImage(item, index) {
    const { history } = this.props;
    share.store.dispatch(setCurrentImage(item.path, item.name, item.width/item.height, index));
    history.push(`/imageview/${this.id}/${index}`);
  }

  renderItem(index, key) {
    const item = this.album.images[index];
    return (<div className={styles.item} key={key} onClick={()=>{this.showImage(item, index)}}>
            {item.name}
            </div>);
  }

  back = () => {
    window.history.back();
  };

  render() {
    const { images } = this.album;
    return (
      <div className={styles.container}>
        <div className={styles.topBar}>
          <button
            type="button"
            className={`clean ${styles.action} fa fa-less-than fl-left`}
            title="go back"
            onClick={this.back}
          />
          <div className={styles.title}>{this.album.name}</div>
        </div>
        <div className={styles.content}>
          <ReactList
            itemRenderer={::this.renderItem}
            length={images.length}
            type='uniform' 
          />
        </div>
      </div>
    );
  }
}
