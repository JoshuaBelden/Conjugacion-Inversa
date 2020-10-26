import { VERBOS_CARGADOS } from '../actions/types';

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
        default:
            return estado;
    }
}
