import { VERBOS_CARGADOS, CONJUGATIONS_LOADED } from '../actions/types';

const estadoInicial = {
    verbos: null
};

export default function (estado = estadoInicial, acción) {
    const { type, payload } = acción;
    switch (type) {
        case VERBOS_CARGADOS:
            return {
                ...estado,
                verbos: payload
            };
        case CONJUGATIONS_LOADED:
            return {
                ...estado,
                conjugations: payload
            };
        default:
            return estado;
    }
}
