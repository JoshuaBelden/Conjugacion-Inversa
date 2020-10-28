import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConjugations } from '../actions/verbos';

const VerbDetails = (params) =>
    !params.conjugation
        ? <Fragment></Fragment>
        : <Fragment>
            <label>{params.conjugation.verb_english}</label>
            <p>yo {params.conjugation.form_1s ? params.conjugation.form_1s : '-'}</p>
            <p>tu {params.conjugation.form_2s ? params.conjugation.form_2s : '-'}</p>
            <p>ud {params.conjugation.form_3s ? params.conjugation.form_3s : '-'}</p>
            <p>nos {params.conjugation.form_1p ? params.conjugation.form_1p : '-'}</p>
            <p>uds {params.conjugation.form_3p ? params.conjugation.form_3p : '-'}</p>
        </Fragment>;

const Infinitive = ({
    conjugations,
    getConjugations
}) => {

    const { infinitive } = useParams();

    useEffect(() => {
        getConjugations(infinitive);
    }, [getConjugations, infinitive]);

    const viewData = {
        infinitive: infinitive,
        "indicative": {},
        "subjunctive": {},
        "imperative": {}
    };

    if (conjugations) {
        let firstConjugation = conjugations[0];
        viewData.infinitiveEnglish = firstConjugation.infinitive_english;
        viewData.gerund = firstConjugation.gerund;
        viewData.gerundEnlish = firstConjugation.gerund_english;
        viewData.pastParticiple = firstConjugation.pastparticiple;
        viewData.pastParticipleEnglish = firstConjugation.pastparticiple_english;
        viewData.indicative.present = conjugations.filter(c => c.mood === 'Indicativo' && c.tense === 'Presente')[0];
        viewData.indicative.preterite = conjugations.filter(c => c.mood === 'Indicativo' && c.tense === 'Pretérito')[0];
        viewData.indicative.imperfect = conjugations.filter(c => c.mood === 'Indicativo' && c.tense === 'Imperfecto')[0];
        viewData.indicative.conditional = conjugations.filter(c => c.mood === 'Indicativo' && c.tense === 'Condicional')[0];
        viewData.indicative.future = conjugations.filter(c => c.mood === 'Indicativo' && c.tense === 'Futuro')[0];
        viewData.subjunctive.present = conjugations.filter(c => c.mood === 'Subjuntivo' && c.tense === 'Presente')[0];
        viewData.subjunctive.imperfect = conjugations.filter(c => c.mood === 'Subjuntivo' && c.tense === 'Imperfecto')[0];
        viewData.subjunctive.future = conjugations.filter(c => c.mood === 'Subjuntivo' && c.tense === 'Futuro')[0];
        viewData.imperative.affirmative = conjugations.filter(c => c.mood === 'Imperativo Afirmativo' && c.tense === 'Presente')[0];
        viewData.imperative.negative = conjugations.filter(c => c.mood === 'Imperativo Negativo' && c.tense === 'Presente')[0];

    }

    return (
        <Fragment>
            <div className="header">
                <h1>{viewData.infinitive}</h1>
                <label>{viewData.infinitiveEnglish}</label>
            </div>
            <div className="page-wrapper">
                <div>
                    <div>
                        <h3>{viewData.gerund}</h3>
                        <label>{viewData.gerundEnlish}</label>
                    </div>
                    <div>
                        <h3>{viewData.pastParticiple}</h3>
                        <label>{viewData.pastParticipleEnglish}</label>
                    </div>
                </div>
                <h3>Indicativo</h3>
                <div className="flex-container">
                    <div>
                        <h4>Presente</h4>
                        <VerbDetails conjugation={viewData.indicative.present} />
                    </div>
                    <div>
                        <h4>Pretérito</h4>
                        <VerbDetails conjugation={viewData.indicative.preterite} />
                    </div>
                    <div>
                        <h4>Imperfecto</h4>
                        <VerbDetails conjugation={viewData.indicative.imperfect} />
                    </div>
                    <div>
                        <h4>Condicional</h4>
                        <VerbDetails conjugation={viewData.indicative.conditional} />
                    </div>
                    <div>
                        <h4>Futuro</h4>
                        <VerbDetails conjugation={viewData.indicative.future} />
                    </div>
                </div>
                <h3>Subjunctive</h3>
                <div className="flex-container">
                    <div>
                        <h4>Presente</h4>
                        <VerbDetails conjugation={viewData.subjunctive.present} />
                    </div>
                    <div>
                        <h4>Imperfecto</h4>
                        <VerbDetails conjugation={viewData.subjunctive.imperfect} />
                    </div>
                    <div>
                        <h4>Futuro</h4>
                        <VerbDetails conjugation={viewData.subjunctive.future} />
                    </div>
                </div>
                <h3>Imperativo</h3>
                <div className="flex-container">
                    <div>
                        <h4>Afirmativo</h4>
                        <VerbDetails conjugation={viewData.imperative.affirmative} />
                    </div>
                    <div>
                        <h4>Negativo</h4>
                        <VerbDetails conjugation={viewData.imperative.negative} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = estado => {
    return{
        conjugations: estado.datoDeVerbos.conjugations
    };
}

export default connect(mapStateToProps, { getConjugations })(Infinitive);