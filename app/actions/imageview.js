// @flow
export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE'; 


export function setCurrentImage(path, name, ratio, index) {
  return {
    type: SET_CURRENT_IMAGE,
    payload: [path, name, ratio, index]
  };
}

