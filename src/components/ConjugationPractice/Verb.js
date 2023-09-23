import React from 'react';

import { getPronoun } from '../../lib';
import Audio from '../Audio';

const Verb = ({ selectedForm, selectedVerb }) => {
  const verbo = getPronoun(selectedForm, selectedVerb);

  return (
    <h2>
      {verbo}
      <Audio verb={verbo} />
    </h2>
  );
};

export default Verb;
