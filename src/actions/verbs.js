import verbs from '../data/verbs.json';
import { LOAD_VERBS } from './types';

export const getVerbs = () => async (dispatch) => {
  dispatch({
    type: LOAD_VERBS,
    payload: verbs,
  });
};
