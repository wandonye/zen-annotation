// @flow
import React, { Component } from 'react';
import Annotation from 'react-image-annotation';
import styles from './ImageView.scss';

type Props = {
  imageview: obj
};

export default class ImageView extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      annotations: [],
      annotation: {}
    }
  }

  onChange = (annotation) => {
    this.setState({ annotation })
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation
    const { annotations } = this.state;

    this.setState({
      annotation: {},
      annotations: annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    })
  }


  back = () => {
    window.history.back();
  };

  render() {
    const {annotation, annotations, type} = this.state;
    const { imageview } = this.props;
    const w = window.innerWidth;
    const h = window.innerHeight-40;
    let image_height = h;
    let image_width = h*imageview.ratio;
    if (w/h<imageview.ratio) {
      image_width = w;
      image_height = w/imageview.ratio;
    }

    return (
      <div className={styles.container}>
        <div className={styles.topBar}>
          <button
            type="button"
            className={`clean ${styles.action} fa fa-less-than fl-left`}
            title="go back"
            onClick={this.back}
          />
          <div className={styles.title}>{imageview.name}</div>
        </div>
          <div style={{position: 'relative', margin: 'auto', width: image_width, height: image_height, cursor: 'crosshair'}} key={imageview.name}>
            <Annotation
              src={imageview.path}
              alt={imageview.name}
              annotations={annotations}

              type={type}
              value={annotation}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          </div>
      </div>
    );
  }
}
