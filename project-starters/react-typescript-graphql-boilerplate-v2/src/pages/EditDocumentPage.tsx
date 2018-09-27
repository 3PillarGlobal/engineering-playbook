import * as React from 'react';
import { withRouter } from 'react-router';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Typography from '@material-ui/core/Typography';
import EditDocument from '../components/EditDocument';

import { Document, DocumentInput } from '../graphql/types';

const EDIT_DOCUMENT_QUERY = gql`
  query DocumentQuery($documentId: ID!) {
    getDocument(id: $documentId) {
      id
      name
      description
      url
    }
  }
`;

const UPDATE_DOCUMENT_MUTATION = gql`
  mutation UpdateDocumentMutation(
    $documentId: ID!
    $documentInput: DocumentInput!
  ) {
    updateDocument(id: $documentId, documentInput: $documentInput) {
      id
      name
      description
      url
    }
  }
`;

interface GetDocumentData {
  getDocument: Document;
}

interface GetDocumentVariables {
  documentId: number;
}

interface UpdateDocumentVariables {
  documentId: number;
  documentInput: DocumentInput;
}

class GetDocumentQuery extends Query<GetDocumentData, GetDocumentVariables> {}

class UpdateDocumentMutation extends Mutation<any, UpdateDocumentVariables> {}

class EditDocumentPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Typography variant="display1">Editing document</Typography>
        <Typography variant="subheading">
          Id: {this.props.match.params.documentId}
        </Typography>

        <GetDocumentQuery
          fetchPolicy="cache-and-network"
          query={EDIT_DOCUMENT_QUERY}
          variables={{ documentId: this.props.match.params.documentId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading document...</p>;
            if (error) return <p>Failed to load document :(</p>;
            const { getDocument } = data!;

            return (
              <div>
                <UpdateDocumentMutation mutation={UPDATE_DOCUMENT_MUTATION}>
                  {(updateDocumentMutation, { loading, error }) => {
                    if (loading) {
                      return <div>updating document...</div>;
                    }
                    if (error) {
                      return <div>failed to update document...</div>;
                    }
                    return (
                      <EditDocument
                        document={getDocument}
                        updateDocument={(documentInput: DocumentInput) => {
                          updateDocumentMutation({
                            variables: {
                              documentId: getDocument.id,
                              documentInput: documentInput
                            }
                          }).then(() => {
                            this.props.history.push('/documents');
                          });
                        }}
                      />
                    );
                  }}
                </UpdateDocumentMutation>
              </div>
            );
          }}
        </GetDocumentQuery>
      </div>
    );
  }
}

export default withRouter(EditDocumentPage);
