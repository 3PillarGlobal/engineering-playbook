import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import { DocumentInput } from '../graphql/types';

interface CreateDocumentProps {
  createDocument: (input: DocumentInput) => void;
}

interface CreateDocumentState {
  documentInput: DocumentInput;
}

class CreateDocument extends React.Component<
  CreateDocumentProps,
  CreateDocumentState
> {
  constructor(props: CreateDocumentProps) {
    super(props);
    this.state = { documentInput: { name: '' } };
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

        <form onSubmit={this.onSave}>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }

  onSave = async (e: any) => {
    e.preventDefault();
    const { documentInput } = this.state;

    console.log('Creating report with name: ' + documentInput.name);

    this.props.createDocument(documentInput);
  };
}

export default CreateDocument;
