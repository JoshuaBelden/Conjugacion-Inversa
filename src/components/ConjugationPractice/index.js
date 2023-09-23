import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';

import { getVerbs } from '../../actions/verbs';
import Details from './Details';
import Verb from './Verb';

import './style.scss';

const ConjugationPractice = ({ verbs, getVerbs }) => {
  useEffect(() => {
    getVerbs();
  }, [getVerbs]);

  const moodOptions = [
    {
      label: 'Indicative',
      ref: useRef(),
    },
    {
      label: 'Subjunctive',
      ref: useRef(),
    },
  ];

  const tenseOptions = [
    {
      label: 'Present',
      ref: useRef(),
    },
    {
      label: 'Preterite',
      ref: useRef(),
    },
    {
      label: 'Future',
      ref: useRef(),
    },
    {
      label: 'Imperfect',
      ref: useRef(),
    },
    {
      label: 'Conditional',
      ref: useRef(),
    },
    {
      label: 'Present Perfect',
      ref: useRef(),
    },
    {
      label: 'Future Perfect',
      ref: useRef(),
    },
    {
      label: 'Past Perfect',
      ref: useRef(),
    },
    {
      label: 'Conditional Perfect',
      ref: useRef(),
    },
  ];

  useEffect(() => {
    moodOptions.forEach((option) => {
      option.ref.current.checked = true;
    });
    tenseOptions.forEach((option) => {
      option.ref.current.checked = true;
    });
  }, []);

  const [selectedPronoun, setSelectedPronoun] = useState();
  const [selectedVerb, getSelectedVerb] = useState();
  const [showDetails, setShowDetails] = useState();

  function submit() {
    setSelectedPronoun(getRandomPronoun());
    getSelectedVerb(getRandomVerb());
    setShowDetails(false);
  }

  function getRandomPronoun() {
    return ['yo', 'tu', 'usted', 'nosotros', 'ustedes'][getRandom(5)];
  }

  function getRandomVerb() {
    const moods = moodOptions
      .filter((option) => option.ref.current.checked)
      .map((option) => option.label);

    const tenses = tenseOptions
      .filter((option) => option.ref.current.checked)
      .map((option) => option.label);

    const available = verbs.filter(
      (verb) =>
        moods.find((m) => m === verb.mood_english) &&
        tenses.find((t) => t === verb.tense_english)
    );
    return available[getRandom(available.length)];
  }

  function getRandom(max) {
    return Math.floor(Math.random() * max + 0);
  }

  const updateSelection = (selectAll) => {
    moodOptions.forEach((option) => {
      option.ref.current.checked = selectAll;
    });
    tenseOptions.forEach((option) => {
      option.ref.current.checked = selectAll;
    });
  };

  return (
    <div className="conjugation-practice">
      <div className="conjugation-practice-options">
        <label>Moods:</label>
        {moodOptions.map((option) => (
          <Fragment key={option.label}>
            <input type="checkbox" ref={option.ref} />
            {option.label}
          </Fragment>
        ))}
      </div>
      <div className="conjugation-practice-options">
        <label>Tenses:</label>
        {tenseOptions.map((option) => (
          <Fragment key={option.label}>
            <input type="checkbox" ref={option.ref} />
            {option.label}
          </Fragment>
        ))}
      </div>
      <div className="conjugation-practice-options">
        <button className="alt" onClick={() => updateSelection(true)}>all</button>
        <button className="alt" onClick={() => updateSelection(false)}>none</button>
      </div>
      <div className="conjugation-practice-content">
        <div className="conjugation-practice-controls">
          <input type="button" onClick={submit} value="Next Verb" />
          <input
            type="button"
            onClick={(e) => setShowDetails(!showDetails)}
            value="Show Details"
          />
        </div>
        <div className="conjugation-practice-results">
          <div className="conjugation-practice-conjugated">
            {selectedVerb && (
              <Verb
                selectedForm={selectedPronoun}
                selectedVerb={selectedVerb}
              ></Verb>
            )}
          </div>
          <div>
            {showDetails && (
              <Details
                selectedPronoun={selectedPronoun}
                selectedVerb={selectedVerb}
              ></Details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  verbs: state.data.verbs,
});

export default connect(mapStateToProps, { getVerbs })(ConjugationPractice);
