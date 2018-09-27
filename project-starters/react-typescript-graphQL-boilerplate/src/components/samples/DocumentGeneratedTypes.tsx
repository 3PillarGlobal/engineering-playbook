import * as React from 'react';

import { GET_PAGINATED_DOCUMENTS } from '@queries/document';
import { graphql, ChildProps} from 'react-apollo';
import { DocumentsVariables, Documents } from '../../schemaTypes';

/**
 * Purpose of this example is for using the generated type using apollo-cli for Query and Variables
 * Query -> { Documents }
 * Variables -> { DocumentsVariables }
 */

interface DocumentHopProps {
    pageNumber: number;
    numberOfItems: number;
}

interface GraphqlState {
    numberOfItems: number;
}

class DocumentGeneratedTypes extends React.Component<ChildProps<DocumentHopProps, Documents, DocumentsVariables>, GraphqlState> {
    constructor(props: DocumentHopProps) {
        super(props);
    }
    render() {
        const { data } = this.props;
        if (!data) {
            return null;
        }
        const { loading, documents: d } = data;

        if (loading) {
            return null;
        }

        return (
            data.documents.map(doc => {
                return (<div key={doc.id}>{doc.description}</div>);
            })
        );
    }
}

export default graphql<DocumentHopProps, Documents, DocumentsVariables>(
    GET_PAGINATED_DOCUMENTS,
    { options: ({ numberOfItems = 3, pageNumber = 0}) => ({ variables: { numberOfItems, pageNumber } })
  })(DocumentGeneratedTypes);
