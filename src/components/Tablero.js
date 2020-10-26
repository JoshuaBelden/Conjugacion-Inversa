import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { obtenerVerbos } from '../actions/verbos';

const ComponenteVerbo = (params) => {
    if (!params.verboSeleccionado) {
        return <Fragment></Fragment>
    }

    console.log('params', params);

    switch (params.formaSeleccionada) {
        case 'yo':
            return <Fragment>{params.verboSeleccionado.form_1s}</Fragment>;
        case 'tu':
            return <Fragment>{params.verboSeleccionado.form_2s}</Fragment>;
        case "usted":
            return <Fragment>{params.verboSeleccionado.form_3s}</Fragment>;
        case "nosotros":
            return <Fragment>{params.verboSeleccionado.form_1p}</Fragment>;
        case "ustedes":
            return <Fragment>{params.verboSeleccionado.form_3p}</Fragment>;
        default: 
            return <Fragment></Fragment>;
    }
}

const Tablero = ({
    verbos,
    obtenerVerbos
}) => {

    useEffect(() => {
		obtenerVerbos();
    }, [obtenerVerbos]);
    
    const [formaSeleccionada, estabFormaSeleccionada] = useState();
    const [verboSeleccionado, estabVerboSeleccionado] = useState();

    const handleUsarPresenteCambiar = (checked) => {
        estabUsarPresente(checked);
    }

    const [usarPresente, estabUsarPresente] = useState(true);

    function next() {
        estabFormaSeleccionada(obtenerFormaSelecionada());
        estabVerboSeleccionado(obtenerVerboAleatoria());
    }

    function obtenerFormaSelecionada() {
        return ['yo','tu','usted','nosotros', 'ustedes'][obtenerAleatoria(5)];
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

    return (
        <Fragment>
            <div className="page-wrapper">
                <header id="header" className="alt">
                    <input type="checkbox" checked={usarPresente} onChange={(e) => handleUsarPresenteCambiar(e.target.checked)} value="presente" />Presente
                </header>
                <section id="main" className="container">
                    <ComponenteVerbo formaSeleccionada={formaSeleccionada} verboSeleccionado={verboSeleccionado}></ComponenteVerbo>
                </section>
                <footer>
                    <button onClick={next}>Next</button>
                </footer>
            </div>

        </Fragment>
    );
};

const mapStateToProps = estado => ({
    verbos: estado.datoDeVerbos.verbos
});

export default connect(mapStateToProps, { obtenerVerbos })(Tablero);