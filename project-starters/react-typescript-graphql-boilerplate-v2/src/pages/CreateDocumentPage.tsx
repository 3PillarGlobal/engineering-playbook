import * as React from 'react';
import { withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Typography from '@material-ui/core/Typography';
import CreateDocument from '../components/CreateDocument';
import { DocumentInput } from '../graphql/types';

const CREATE_DOCUMENT_MUTATION = gql`
  mutation CreateDocumentMutation($documentInput: DocumentInput!) {
    createDocument(documentInput: $documentInput) {
      id
      name
      description
    }
  }
`;

type MutationVariables = {
  documentInput: DocumentInput;
};

class CreateDocumentMutation extends Mutation<any, MutationVariables> {}

class CreateDocumentPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Typography variant="display1">Create new document</Typography>
        <CreateDocumentMutation mutation={CREATE_DOCUMENT_MUTATION}>
          {(createDocumentMutation, { loading, error }) => {
            if (error) {
              return <div>Ups, soemthing went wrong!!!</div>;
            }
            if (loading) {
              return <div>Loading spinner!!!....</div>;
            }
            return (
              <CreateDocument
                createDocument={(documentInput: DocumentInput) => {
                  createDocumentMutation({
                    variables: { documentInput: documentInput }
                  }).then(result => {
                    console.log('result' + result);
                    this.props.history.push('/documents');
                  });
                }}
              />
            );
          }}
        </CreateDocumentMutation>
      </div>
    );
  }
}

export default withRouter(CreateDocumentPage);
