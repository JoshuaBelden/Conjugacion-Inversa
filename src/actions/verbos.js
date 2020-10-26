import verbos from '../data/verbos.json';
import { VERBOS_CARGADOS } from './types';

export const obtenerVerbos = () => async dispatch => {
    dispatch({
        type: VERBOS_CARGADOS,
        payload: verbos
    })
};
