import * as React from 'react';
import { ApolloError } from 'apollo-client';
import { DocumentX } from '@components/samples/DocumentQL';

interface DocumentViewProps {
    error?: ApolloError;
    loading: boolean;
    document: DocumentX;
    handleDocumentIdChange?: (event: any) => void;
}

const DocumentView = ({ document, error, loading,  handleDocumentIdChange}: DocumentViewProps) => {
    if (loading) {
      return <div>LOADING</div>;
    }
    if (error !== undefined) {
      return <div>ERROR</div>;
    }
    return (
        <React.Fragment>
            <label >Enter id between 1 and 3: </label> <input type='text' name='documentId' onChange={handleDocumentIdChange}></input>
            <div>
                Id: {document.id} <br/>
                Name: {document.name} <br/>
                Description: {document.description}
            </div>
        </React.Fragment>
    );
  };

  export default DocumentView;