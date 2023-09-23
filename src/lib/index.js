export const getPronoun = (pronoun, verb) => {
  switch (pronoun) {
    case 'yo':
      return verb.form_1s;
    case 'tu':
      return verb.form_2s;
    case 'usted':
      return verb.form_3s;
    case 'nosotros':
      return verb.form_1p;
    case 'ustedes':
      return verb.form_3p;
    default:
      return '';
  }
};

export const getEnPronoun = (esPronoun) => {
  switch (esPronoun) {
    case 'yo':
      return 'I';
    case 'tu':
      return 'You';
    case 'usted':
      return 'He/She/It';
    case 'nosotros':
      return 'We';
    case 'ustedes':
      return 'They';
    default:
      return '';
  }
};

export const getEnPronounGerund = (esPronoun) => {
  switch (esPronoun) {
    case 'yo':
      return 'am';
    case 'tu':
      return 'are';
    case 'usted':
      return 'are';
    case 'nosotros':
      return 'are';
    case 'ustedes':
      return 'are';
    default:
      return '';
  }
};
