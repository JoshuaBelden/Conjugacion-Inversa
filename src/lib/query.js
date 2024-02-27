import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';

const appId = 'conjugacion-inversa-bfymb';
const baseUrl = `https://us-west-2.aws.services.cloud.mongodb.com/api/client/v2.0/app`;
const authEndpoint = `${baseUrl}/${appId}/auth/providers/local-userpass/login`;
const apiEndpoint = `${baseUrl}/${appId}/graphql`;
const user = {
  username: 'joshuabelden@hotmail.com',
  password: 'Pct0kKmWqrk9gXrt',
};

const getAccessToken = async () => {
  try {
    const response = await axios.post(authEndpoint, user);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const getAllVerbs = async () => {
  const accessToken = await getAccessToken();
  const document = gql`
    {
      verbos(limit: 0) {
        _id
        form_1p
        form_1s
        form_2p
        form_2s
        form_3p
        form_3s
        gerund
        gerund_english
        infinitive
        infinitive_english
        mood
        mood_english
        pastparticiple
        pastparticiple_english
        tense
        tense_english
        verb_english
      }
    }
  `;

  const graphQLClient = new GraphQLClient(apiEndpoint, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await graphQLClient.request(document);
    return response.verbos;
  } catch (error) {
    console.error(error);
  }
};
