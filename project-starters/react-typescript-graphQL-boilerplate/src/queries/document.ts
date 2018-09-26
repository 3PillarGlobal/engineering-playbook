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

export const GET_DOCUMENT = gql `
    query Document($id: Int) {
        Document(id: $id){
            id
            name
            description
          }
    }
`;


