import React from 'react';

const Conjugation = ({ conjugation }) => (
  <div>
    <label>{conjugation.verb_english}</label>
    <p>yo {conjugation.form_1s ? conjugation.form_1s : '-'}</p>
    <p>tu {conjugation.form_2s ? conjugation.form_2s : '-'}</p>
    <p>ud {conjugation.form_3s ? conjugation.form_3s : '-'}</p>
    <p>nos {conjugation.form_1p ? conjugation.form_1p : '-'}</p>
    <p>uds {conjugation.form_3p ? conjugation.form_3p : '-'}</p>
  </div>
);

export default Conjugation;
