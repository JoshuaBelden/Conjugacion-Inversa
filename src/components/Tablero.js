import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { obtenerVerbos } from '../actions/verbos';

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComponenteAudio = (params) => {

    if (!params.audioSrc) {
        return <Fragment></Fragment>;
    }

    const playAudio = () => {
        var elem = document.getElementById('audio-element-params-' + params.audioSrc);
        elem.play();
    }

    return <Fragment>
        <audio id={"audio-element-params-" + params.audioSrc} className="audio-element">
            <source src="https://audio1.spanishdict.com/audio?lang=es&format=mp3&text={params.audioSrc}"></source>
        </audio>
        <FontAwesomeIcon onClick={(e) => playAudio()} icon={faPlay}></FontAwesomeIcon>
    </Fragment>;
}

const ComponenteVerbo = (params) => {
    if (!params.verboSeleccionado) {
        return <Fragment></Fragment>;
    }

    const verbo = obtenerFormaDelVerbo(params.formaSeleccionada, params.verboSeleccionado);

    return <Fragment>
        <h2>{verbo}</h2>
    </Fragment>;
};

const ComponenteDetallesDelVerbo = (params) => {
    if (!params.mostrarDetalles || !params.verboSeleccionado) {
        return <Fragment></Fragment>;
    }
    return <Fragment>
        <h2>{obtenerFormaDelIngles(params.formaSeleccionada)} {params.verboSeleccionado.verb_english.replace('am/are', obtenerGerundoCorrecto(params.formaSeleccionada))}</h2>
        <h3>{params.verboSeleccionado.infinitive} ({params.verboSeleccionado.tense} {params.verboSeleccionado.mood})</h3>
        <p>{params.verboSeleccionado.infinitive_english}</p>
        <p>{params.verboSeleccionado.form_1s}</p>
        <p>{params.verboSeleccionado.form_2s}</p>
        <p>{params.verboSeleccionado.form_3s}</p>
        <p>{params.verboSeleccionado.form_1p}</p>
        <p>{params.verboSeleccionado.form_3p}</p>

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

const obtenerFormaDelIngles = (forma) => {
    switch (forma) {
        case 'yo':
            return 'I';
        case 'tu':
            return 'You';
        case "usted":
            return 'He/She/It';
        case "nosotros":
            return 'We';
        case "ustedes":
            return 'They';
        default:
            return "";
    }
};

const obtenerGerundoCorrecto = (forma) => {
    switch (forma) {
        case 'yo':
            return 'am';
        case 'tu':
            return 'are';
        case "usted":
            return 'are';
        case "nosotros":
            return 'are';
        case "ustedes":
            return 'are';
        default:
            return "";
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
    const [mostrarDetalles, estabMostrarDetalles] = useState();

    const [usarPresente, estabUsarPresente] = useState(true);
    const [usarPretérito, estabUsarPretérito] = useState(true);

    const handleUsarPresenteCambiar = (checked) => {
        estabUsarPresente(checked);
    };

    const handleUsarPréterioCambiar = (checked) => {
        estabUsarPretérito(checked);
    }

    function siguiente() {
        estabFormaSeleccionada(obtenerFormaSelecionada());
        estabVerboSeleccionado(obtenerVerboAleatoria());
        estabMostrarDetalles(false);
    }

    function obtenerFormaSelecionada() {
        return ['yo', 'tu', 'usted', 'nosotros', 'ustedes'][obtenerAleatoria(5)];
    }

    function obtenerVerboAleatoria() {
        const available = verbos.filter(v => {
            return (usarPresente && v.mood === 'Indicativo' && v.tense === 'Presente')
                || (usarPretérito && v.mood === 'Indicativo' && v.tense === 'Pretérito');
        });

        return available[obtenerAleatoria(available.length)];
    }

    function obtenerAleatoria(máx) {
        return Math.floor((Math.random() * máx) + 0);
    }

    function mostrarDetallesDelVerbo() {
        estabMostrarDetalles(!mostrarDetalles);
    }

    return (
        <Fragment>
            <div className="page-wrapper">
                <h1 className="title">Conjugación Inversa</h1>
                <header id="header" className="alt">
                    <div className="opciones-tenso">
                        <input type="checkbox" checked={usarPresente} onChange={(e) => handleUsarPresenteCambiar(e.target.checked)} value="presente indicativo" />Presente
                        <input type="checkbox" checked={usarPretérito} onChange={(e) => handleUsarPréterioCambiar(e.target.checked)} value="pretérito indicativo" />Pretérito
                    </div>
                </header>
                <section id="main" className="container">
                    <div>
                        <input type="button" onClick={siguiente} value="Siguiente Verbo" />
                        <input type="button" onClick={(e) => mostrarDetallesDelVerbo()} value="Mostrar Detalles" />
                    </div>
                    <div className="verbo-contenedor">
                        <div className="verbo-conjugado">
                            <ComponenteVerbo formaSeleccionada={formaSeleccionada} verboSeleccionado={verboSeleccionado}></ComponenteVerbo>
                        </div>
                        <div>
                            <ComponenteDetallesDelVerbo formaSeleccionada={formaSeleccionada} verboSeleccionado={verboSeleccionado} mostrarDetalles={mostrarDetalles}></ComponenteDetallesDelVerbo>
                        </div>
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