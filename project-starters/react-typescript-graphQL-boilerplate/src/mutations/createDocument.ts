import { gql } from 'apollo-boost';

export default gql`
  mutation AddDocument($name: String!, $description: String, $url: String) {
    addDocument(name: $name, description: $description, url: $url) {
        name,
        description,
        url
    }
  }
`;