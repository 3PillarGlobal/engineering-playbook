import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_DOCUMENT } from '@queries/document';
import  DocumentView from '@components/samples/DocumentView';

/**
 * Example of using a wrapper of Query component from react-apollo,
 *      separating the logic from the view and graphql services.
 */
export interface DocumentX {
    id: number;
    name: string;
    description: string;
}
interface Data {
    Document?: DocumentX;
}

interface Variables {
    id: number;
}

class DocumentQuery extends Query<Data, Variables> {}

class DocumentQL extends React.Component<{}, {documentId: number}> {
    constructor(props: any) {
        super(props);
        this.state = {
            documentId: 1
        };
    }
    render() {
        return (
            <DocumentQuery query={ GET_DOCUMENT } variables={{id: this.state.documentId}}>
            {({ data: { Document = null } = {}, error, loading }) => (
                <DocumentView
                    document= { Document }
                    error= { error }
                    loading= { loading }
                    handleDocumentIdChange = { this.handleDocumentIdChange }
                />
            )}
        </DocumentQuery>
        );
    }

    handleDocumentIdChange = (event: any) => {
        if (event.target.value <= 3 === event.target.value >= 1) {
            this.setState({
                documentId: event.target.value
            });
        }
    }
}

export default DocumentQL;
