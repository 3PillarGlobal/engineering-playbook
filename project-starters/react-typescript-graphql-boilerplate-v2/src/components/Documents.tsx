import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

import { Document } from '../graphql/types';

export interface DocumentPageProps extends RouteComponentProps<any> {
  pageNumber: number;
  documents: Document[];
  onLoadMore: any;
}

class Documents extends React.Component<DocumentPageProps> {
  constructor(props: DocumentPageProps) {
    super(props);
  }

  editDocument(documentId: number) {
    console.log(documentId);
    this.props.history.push(`/editDocument/${documentId}`);
  }

  render() {
    return (
      <div>
        <div>Current page: {this.props.pageNumber}</div>
        {this.props.documents.map(document => (
          <div key={document.id}>
            <p>
              {`${document.name}: ${document.description}`}
              <button onClick={() => this.editDocument(document.id)}>
                Edit
              </button>
            </p>
          </div>
        ))}

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.onLoadMore}
            size="small"
          >
            Load more
          </Button>
        </div>
        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            this.props.history.push('/createDocument');
          }}
        >
          Create new document
        </Button>
      </div>
    );
  }
}

export default withRouter(Documents);
