import { LOAD_VERBS } from './types';
import { getAllVerbs } from 'lib/query';

export const getVerbs = () => async (dispatch) => {
  const allVerbs = await getAllVerbs();

  dispatch({
    type: LOAD_VERBS,
    payload: allVerbs,
  });
};
