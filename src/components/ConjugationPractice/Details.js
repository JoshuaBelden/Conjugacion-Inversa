import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getEnPronoun, getEnPronounGerund } from '../../lib';

const Details = ({ selectedPronoun, selectedVerb }) => {
  return (
    <Fragment>
      <h2>
        {getEnPronoun(selectedPronoun)}{' '}
        {selectedVerb.verb_english.replace(
          'am/are',
          getEnPronounGerund(selectedPronoun)
        )}
      </h2>
      <h3>
        {selectedVerb.infinitive}{' '}
        <em>
          ({selectedVerb.tense} {selectedVerb.mood})
        </em>
      </h3>
      <Link to={`/verb/${selectedVerb.infinitive}`}>conjugations</Link>
    </Fragment>
  );
};

export default Details;
