import { LOAD_VERBS } from '../actions/types';

const initialState = {
  verbs: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_VERBS:
      return {
        ...state,
        verbs: payload,
      };
    default:
      return state;
  }
}
