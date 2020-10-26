import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { obtenerVerbos } from '../actions/verbos';

const ComponenteVerbo = (params) => {
    if (!params.verboSeleccionado) {
        return <Fragment></Fragment>;
    }

    console.log('params', params);

    return <Fragment>
        <h2>{obtenerFormaDelVerbo(params.formaSeleccionada, params.verboSeleccionado)}</h2>
    </Fragment>;
};

const ComponenteDetallesDelVerbo = (params) => {
    if (!params.mostrarDetalles || !params.verboSeleccionado) {
        return <Fragment></Fragment>;
    }
    return <Fragment>
        <h3>{params.verboSeleccionado.infinitive}</h3>
        <p>
            Presente Indicativo para {params.formaSeleccionada}
        </p>
        <p>{params.verboSeleccionado.infinitive_english}</p>
        <p>{params.verboSeleccionado.verb_english}</p>
    </Fragment>;
};

const obtenerFormaDelVerbo = (forma, verbo) => {
    switch (forma) {
        case 'yo':
            return verbo.form_1s;
        case 'tu':
            return verbo.form_2s;
        case "usted":
            return verbo.form_3s;
        case "nosotros":
            return verbo.form_1p;
        case "ustedes":
            return verbo.form_3p;
        default:
            return "";
    }
};

const Tablero = ({
    verbos,
    obtenerVerbos
}) => {

    useEffect(() => {
        obtenerVerbos();
    }, [obtenerVerbos]);

    const [formaSeleccionada, estabFormaSeleccionada] = useState();
    const [verboSeleccionado, estabVerboSeleccionado] = useState();
    const [mostrarDetalles, estabMostrarDetalles] = useState();

    const handleUsarPresenteCambiar = (checked) => {
        estabUsarPresente(checked);
    };

    const [usarPresente, estabUsarPresente] = useState(true);

    function siguiente() {
        estabFormaSeleccionada(obtenerFormaSelecionada());
        estabVerboSeleccionado(obtenerVerboAleatoria());
        estabMostrarDetalles(true);
    }

    function obtenerFormaSelecionada() {
        return ['yo', 'tu', 'usted', 'nosotros', 'ustedes'][obtenerAleatoria(5)];
    }

    function obtenerVerboAleatoria() {
        const available = verbos.filter(v => {
            return usarPresente && v.mood === 'Indicativo' && v.tense === 'Presente';
        });

        return available[obtenerAleatoria(available.length)];
    }

    function obtenerAleatoria(máx) {
        return Math.floor((Math.random() * máx) + 0);
    }

    function mostrarDetallesDelVerbo() {
        estabMostrarDetalles(true);
    }

    return (
        <Fragment>
            <div className="page-wrapper">
                <header id="header" className="alt">
                    <input type="checkbox" checked={usarPresente} onChange={(e) => handleUsarPresenteCambiar(e.target.checked)} value="presente indicativo" />Presente
                </header>
                <section id="main" className="container">
                    <div>
                        <button onClick={siguiente}>Siguiente Verbo</button>
                        <button onClick={(e) => mostrarDetallesDelVerbo()}>Mostrar Detalles</button>
                    </div>
                    <div>
                        <ComponenteVerbo formaSeleccionada={formaSeleccionada} verboSeleccionado={verboSeleccionado}></ComponenteVerbo>
                    </div>
                    <div>
                        <ComponenteDetallesDelVerbo formaSeleccionada={formaSeleccionada} verboSeleccionado={verboSeleccionado} mostrarDetalles={mostrarDetalles}></ComponenteDetallesDelVerbo>
                    </div>
                </section>
                <footer>
                </footer>
            </div>

        </Fragment>
    );
};

const mapStateToProps = estado => ({
    verbos: estado.datoDeVerbos.verbos
});

export default connect(mapStateToProps, { obtenerVerbos })(Tablero);