import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVerbs } from 'actions/verbs';
import Conjugation from './Conjugation';

import './style.scss';

const Verb = ({ verbs, getVerbs }) => {
  const { infinitive } = useParams();

  const searchTermRef = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const [viewData, setViewData] = useState();

  useEffect(() => {
    getVerbs();

    if (infinitive && verbs) {
      selectSearchResult(infinitive);
    }
  }, [getVerbs, verbs]);

  const buildViewData = (infinitive) => {
    if (!infinitive) throw new Error('Infinitive is required.');

    if (!verbs) {
      return;
    }

    let conjugations = verbs.filter((verb) => verb.infinitive === infinitive);
    const viewData = {
      infinitive: infinitive,
      indicative: {},
      subjunctive: {},
      imperative: {},
    };

    let firstConjugation = conjugations[0];
    viewData.infinitiveEnglish = firstConjugation.infinitive_english;
    viewData.gerund = firstConjugation.gerund;
    viewData.gerundEnlish = firstConjugation.gerund_english;
    viewData.pastParticiple = firstConjugation.pastparticiple;
    viewData.pastParticipleEnglish = firstConjugation.pastparticiple_english;
    viewData.indicative.present = conjugations.find(
      (c) => c.mood === 'Indicativo' && c.tense === 'Presente'
    );
    viewData.indicative.preterite = conjugations.find(
      (c) => c.mood === 'Indicativo' && c.tense === 'Pretérito'
    );
    viewData.indicative.imperfect = conjugations.find(
      (c) => c.mood === 'Indicativo' && c.tense === 'Imperfecto'
    );
    viewData.indicative.conditional = conjugations.find(
      (c) => c.mood === 'Indicativo' && c.tense === 'Condicional'
    );
    viewData.indicative.future = conjugations.find(
      (c) => c.mood === 'Indicativo' && c.tense === 'Futuro'
    );
    viewData.subjunctive.present = conjugations.find(
      (c) => c.mood === 'Subjuntivo' && c.tense === 'Presente'
    );
    viewData.subjunctive.imperfect = conjugations.find(
      (c) => c.mood === 'Subjuntivo' && c.tense === 'Imperfecto'
    );
    viewData.subjunctive.future = conjugations.find(
      (c) => c.mood === 'Subjuntivo' && c.tense === 'Futuro'
    );
    viewData.imperative.affirmative = conjugations.find(
      (c) => c.mood === 'Imperativo Afirmativo' && c.tense === 'Presente'
    );
    viewData.imperative.negative = conjugations.find(
      (c) => c.mood === 'Imperativo Negativo' && c.tense === 'Presente'
    );

    return viewData;
  };

  const filter = (verb, searchTerm) => {
    return (
      verb.infinitive.match(`.*${searchTerm}.*`) ||
      verb.infinitive_english.match(`.*${searchTerm}.*`) ||
      verb.form_1p.match(`.*${searchTerm}.*`) ||
      verb.form_1s.match(`.*${searchTerm}.*`) ||
      verb.form_2p.match(`.*${searchTerm}.*`) ||
      verb.form_2s.match(`.*${searchTerm}.*`) ||
      verb.form_3p.match(`.*${searchTerm}.*`) ||
      verb.form_3s.match(`.*${searchTerm}.*`) ||
      verb.gerund.match(`.*${searchTerm}.*`) ||
      verb.verb_english.match(`.*${searchTerm}.*`)
    );
  }

  const search = () => {
    setSearchResults([]);

    const results = verbs
      .filter((verb) => filter(verb, searchTermRef.current.value))
      .map((verb) => verb.infinitive)
      .filter((value, index, array) => array.indexOf(value) === index);

    if (results.length) {
      setSearchResults(results);
    }
  };

  const renderSearch = () => {
    return (
      <div>
        Infinitive: <input ref={searchTermRef} />
        <button onClick={search}>Search</button>
      </div>
    );
  };

  const renderSearchResults = () => {
    return searchResults.map((result) => {
      return (
        <div>
          <button onClick={() => selectSearchResult(result)}>{result}</button>
        </div>
      );
    });
  };

  const selectSearchResult = (infinitive) => {
    setSearchResults([]);
    setViewData(buildViewData(infinitive));
  };

  return (
    <div className="verb">
      <div>{renderSearch()}</div>
      <div>{searchResults && renderSearchResults()}</div>
      {viewData && (
        <div className="header">
          <h1>{viewData.infinitive}</h1>
          <label>{viewData.infinitiveEnglish}</label>
        </div>
      )}
      {viewData && (
        <div className="page-wrapper">
          <h3>Indicative</h3>
          <div className="verb-conjugation-wrapper">
            <div className="verb-conjugation">
              <h4>Presente</h4>
              <Conjugation conjugation={viewData.indicative.present} />
            </div>
            <div className="verb-conjugation">
              <h4>Pretérito</h4>
              <Conjugation conjugation={viewData.indicative.preterite} />
            </div>
            <div className="verb-conjugation">
              <h4>Imperfecto</h4>
              <Conjugation conjugation={viewData.indicative.imperfect} />
            </div>
            <div className="verb-conjugation">
              <h4>Condicional</h4>
              <Conjugation conjugation={viewData.indicative.conditional} />
            </div>
            <div className="verb-conjugation">
              <h4>Futuro</h4>
              <Conjugation conjugation={viewData.indicative.future} />
            </div>
          </div>
          <h3>Subjunctive</h3>
          <div className="verb-conjugation-wrapper">
            <div className="verb-conjugation">
              <h4>Presente</h4>
              <Conjugation conjugation={viewData.subjunctive.present} />
            </div>
            <div className="verb-conjugation">
              <h4>Imperfecto</h4>
              <Conjugation conjugation={viewData.subjunctive.imperfect} />
            </div>
            <div className="verb-conjugation">
              <h4>Futuro</h4>
              <Conjugation conjugation={viewData.subjunctive.future} />
            </div>
          </div>
          <h3>Imperative</h3>
          <div className="verb-conjugation-wrapper">
            <div className="verb-conjugation">
              <h4>Afirmative</h4>
              <Conjugation conjugation={viewData.imperative.affirmative} />
            </div>
            <div className="verb-conjugation">
              <h4>Negative</h4>
              <Conjugation conjugation={viewData.imperative.negative} />
            </div>
          </div>
          <div>
            <div className="verb-conjugation">
              <h3>{viewData.gerund}</h3>
              <label>{viewData.gerundEnlish}</label>
            </div>
            <div className="verb-conjugation">
              <h3>{viewData.pastParticiple}</h3>
              <label>{viewData.pastParticipleEnglish}</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    verbs: state.data.verbs,
  };
};

export default connect(mapStateToProps, { getVerbs })(Verb);
