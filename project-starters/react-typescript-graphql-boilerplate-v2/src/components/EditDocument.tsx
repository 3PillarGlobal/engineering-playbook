import * as React from 'react';

import { Document, DocumentInput } from '../graphql/types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';

export interface EditDocumentProps {
  document: Document;
  updateDocument: (documentInput: DocumentInput) => void;
}

export interface EditDocumentState {
  documentInput: DocumentInput;
}

class EditDocument extends React.Component<
  EditDocumentProps,
  EditDocumentState
> {
  constructor(props: EditDocumentProps) {
    super(props);

    this.state = {
      documentInput: {
        name: props.document.name,
        description: props.document.description,
        url: props.document.description
      }
    };
  }

  handleChange = (changedKey: string) => (event: any) => {
    const newValue = event.target.value;
    console.log('changedKey=' + changedKey + '; newValue=' + newValue);
    this.setState(prevState =>
      Object.assign(
        {},
        {
          documentInput: {
            ...prevState.documentInput,
            [changedKey]: newValue
          }
        }
      )
    );
  };

  render() {
    const { documentInput } = this.state;

    return (
      <div>
        <div>
          <TextField
            label="Name"
            value={documentInput.name}
            onChange={this.handleChange('name')}
            className="sizeL"
          />
        </div>
        <div>
          <TextField
            label="Description"
            value={documentInput.description}
            onChange={this.handleChange('description')}
            className="sizeL"
          />
        </div>
        <div>
          <TextField
            label="Url"
            value={documentInput.url}
            onChange={this.handleChange('url')}
            className="sizeL"
          />
        </div>

        <Button variant="raised" color="primary" onClick={this.updateDocument}>
          Save
        </Button>
      </div>
    );
  }

  updateDocument = async (e: any) => {
    e.preventDefault();
    this.props.updateDocument(this.state.documentInput);
  };
}

// interface CreateDocumentData {
//   addDocument: Document;
// }

// interface CreateDocumentVariables {
//   name: String;
//   description: String;
// }

// const UPDATE_DOCUMENT_MUTATION = gql`
//   mutation CreateDocumentMutation($name: String!, $description: String) {
//     addDocument(name: $name, description: $description) {
//       id
//       name
//       description
//     }
//   }
// `;

// const EditPageWithMutation = graphql<any>(UPDATE_DOCUMENT_MUTATION, {
//   name: 'createDocumentMutation' // name of the injected prop: this.props.createDocumentMutation...
// })(EditDocument);

export default EditDocument;
