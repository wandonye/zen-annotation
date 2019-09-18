// @flow
import React, { Component } from 'react';
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

  showImage(path, name, ratio) {
    const { history } = this.props;
    share.store.dispatch(setCurrentImage(path, name, ratio));
    history.push(`/imageview`);
  }

  itemsJsx() {
    const { images } = this.album;

    return images.map(item => (
      <div className={styles.item} key={item.name}>
        <div className={styles.inner} onClick={()=>{
            const img = document.getElementById(item.name);
            this.showImage(item.path, item.name, img.width/img.height);
          }}>
          <img id={item.name} className={styles.image} src={item.path} alt="cover"/>
        </div>
      </div>
    ));
  }

  back = () => {
    window.history.back();
  };

  render() {
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
        <div className={styles.content}>{this.itemsJsx()}</div>
      </div>
    );
  }
}
