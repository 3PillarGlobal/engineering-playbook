import gql from 'graphql-tag';

export const GET_ALL_DOCUMENTS = gql `
    query AllDocuments {
        documents {
            id
            name
            description
          }
    }
`;

export const GET_PAGINATED_DOCUMENTS = gql `
    query Documents($pageNumber: Int, $numberOfItems: Int) {
        documents(pageNumber: $pageNumber, numberOfItems: $numberOfItems) {
            id
            name
            description
          }
    }
`;

export const GET_DOCUMENT = gql `
    query Document($id: Int) {
        document(id: $id){
            id
            name
            description
          }
    }
`;


