// @flow
import {Map} from 'immutable';
import {
  SET_CURRENT_IMAGE
} from '../actions/imageview';

export type imageviewStateType = {
  +path: string,
  name: string,
  ratio: number,
  index: number
};

const initialState = Map({
  path: '',
  name: '',
  ratio: 0.5,
  index: 0
});

export default function imageviewReducer(
  state = initialState,
  action: actionType
) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_IMAGE: {
      return state.set('path', payload[0])
                  .set('name', payload[1])
                  .set('ratio', payload[2])
                  .set('index', payload[3]);
    }
    default:
      return state;
  }
}
