import gql from 'graphql-tag';

export const GET_ALL_DOCUMENTS = gql `
    query getDocuments {
        getDocuments{
            id
            name
            description
          }
    }
`;


