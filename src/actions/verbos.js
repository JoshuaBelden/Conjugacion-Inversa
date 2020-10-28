import verbos from '../data/verbos.json';
import { VERBOS_CARGADOS, CONJUGATIONS_LOADED } from './types';

export const obtenerVerbos = () => async dispatch => {
    dispatch({
        type: VERBOS_CARGADOS,
        payload: verbos
    })
};

export const getConjugations = (infinitive) => async dispatch => {
    dispatch({
        type: CONJUGATIONS_LOADED,
        payload: verbos.filter(v => {
            return v.infinitive === infinitive;
        })
    })
};
